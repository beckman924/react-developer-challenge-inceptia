import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function login() {
  const data = await fetch(`${process.env.API_URL}/api/v1/login/`, {
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

  const res = await data.json();
  const token = res.token;
  const decoded = decodeJwt(token);
  const expires = decoded.exp;

  const session = await encrypt({
    token,
    expires,
  });

  cookies().set("session", session, { expires, httpOnly: true });
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return login();
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  // Refresh the session so it doesn't expire
  const session = request.cookies.get("session")?.value;
  if (!session) return login();

  const parsed = await decrypt(session);

  if (parsed.expires <= Date.now() / 1000) {
    return login();
  }
}

async function getClients() {
  const session = await getSession();
  if (!session) null;

  const { token } = session;

  const data = await fetch(`${process.env.API_URL}/api/v1/clients/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  return await data.json();
}

export async function GET() {
  await login();
  const clients = await getClients();

  if (!clients) {
    return Response.json([]);
  }

  return Response.json(clients);
}
