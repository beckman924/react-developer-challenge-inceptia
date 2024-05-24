import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET!);

interface JwtPayload {
  token: string;
  expires: number;
  [key: string]: any;
}

interface DecodedJwtPayload {
  exp: number;
  [key: string]: any;
}

async function encrypt(payload: JwtPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as JwtPayload;
}

async function login(): Promise<void> {
  const response = await fetch(`${process.env.API_URL}/api/v1/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: process.env.API_USER,
      password: process.env.API_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  const token: string = data.token;
  const decoded: DecodedJwtPayload = decodeJwt(token) as DecodedJwtPayload;
  const expires: Date = new Date(decoded.exp * 1000);

  const session: string = await encrypt({
    token,
    expires: decoded.exp,
  });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function getSession(): Promise<JwtPayload | null> {
  try {
    const session = cookies().get("session")?.value;
    if (!session) {
      throw new Error("No session found");
    }
    return await decrypt(session);
  } catch (error) {
    console.error("Error in getSession:", error);
    throw new Error("Could not get session");
  }
}

export async function updateSession(request: NextRequest): Promise<void> {
  try {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      await login();
      return;
    }

    const parsed = await decrypt(session);

    if (parsed.expires <= Date.now() / 1000) {
      await login();
      return;
    }

    // Refresh the session token before it expires
    if (parsed.expires - Math.floor(Date.now() / 1000) < 3600) {
      await login();
      return;
    }
  } catch (error) {
    console.error("Error in updateSession:", error);
    await login();
  }
}

async function getClients(): Promise<any[]> {
  const session = await getSession();
  if (!session) {
    throw new Error("No session available");
  }

  const { token } = session;

  const response = await fetch(`${process.env.API_URL}/api/v1/clients/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(
      "Response is not an array of clients: " + JSON.stringify(data)
    );
  }

  return data;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await updateSession(request);
    const clients = await getClients();

    if (!clients) {
      return new NextResponse("No clients found", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify(clients), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error in GET:", error);

    if (error.message.includes("No session available")) {
      return new NextResponse(error.message, {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (error.message.includes("Failed to fetch clients")) {
      return new NextResponse(error.message, {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse("An unxpected error occurred, please try again", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
