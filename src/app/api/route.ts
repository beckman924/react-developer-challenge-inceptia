export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

import { updateSession, getClients } from "../../../lib";

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
    console.error(`Error in GET: ${error}`);

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
