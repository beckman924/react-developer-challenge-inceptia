import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { SignJWT, jwtVerify, decodeJwt } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET!);
const apiUrl = process.env.API_URL;
const apiEmail = process.env.API_EMAIL;
const apiPassword = process.env.API_PASSWORD;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(): Promise<void> {
  if (!apiUrl || !apiEmail || !apiPassword) {
    throw new Error("API URL, email, and password are required");
  }

  try {
    const formdata = new FormData();
    formdata.append("email", apiEmail);
    formdata.append("password", apiPassword);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    const response = await fetch(`${apiUrl}/api/v1/login/`, requestOptions);

    const data = await response.json();
    const token = data.token;
    const decoded = decodeJwt(token);
    const expires: Date | undefined = decoded.exp
      ? new Date(decoded.exp * 1000)
      : undefined;

    const session = await encrypt({
      token,
      expires: decoded.exp,
    });

    if (expires && session) {
      cookies().set("session", session, { expires, httpOnly: true });
    }
  } catch (error) {
    console.error(`Error in login: ${error}`);
    throw error;
  }
}

export async function getSession() {
  try {
    const session = cookies().get("session")?.value;
    if (!session) {
      throw new Error("No session found");
    }
    return await decrypt(session);
  } catch (error) {
    console.error(`Error in getSession: ${error}`);
    throw new Error("Could not get session");
  }
}

export async function getClients() {
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
      `Response is not an array of clients: ${JSON.stringify(data)}`
    );
  }

  return data;
}

export async function updateSession(request: NextRequest): Promise<void> {
  try {
    const session = request.cookies.get("session")?.value;
    if (!session) {
      return await login();
    }

    const parsed = await decrypt(session);

    if (parsed.expires <= Date.now() / 1000) {
      return await login();
    }

    // Refresh the session token before it expires
    if (parsed.expires - Math.floor(Date.now() / 1000) < 3600) {
      return await login();
    }
  } catch (error) {
    console.error(`Error in updateSession: ${error}`);
    await login();
  }
}
