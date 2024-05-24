export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

import { updateSession, decrypt } from "../../../../lib";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await updateSession(request);

    const session = request.cookies.get("session")?.value;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decryptedSession = await decrypt(session);

    if (!decryptedSession) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { token } = decryptedSession;

    const url = request.nextUrl.searchParams.get("page")
      ? `${
          process.env.API_URL
        }/api/v1/inbound-case/?bot=${request.nextUrl.searchParams.get(
          "bot"
        )}&local_updated__date__gte=${request.nextUrl.searchParams.get(
          "fromDate"
        )}&local_updated__date__lte=${request.nextUrl.searchParams.get(
          "toDate"
        )}&page=${request.nextUrl.searchParams.get("page")}`
      : `${
          process.env.API_URL
        }/api/v1/inbound-case/?bot=${request.nextUrl.searchParams.get(
          "bot"
        )}&local_updated__date__gte=${request.nextUrl.searchParams.get(
          "fromDate"
        )}&local_updated__date__lte=${request.nextUrl.searchParams.get(
          "toDate"
        )}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return new NextResponse(`Error: ${JSON.stringify(data)}`, {
        status: 400,
      });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);

    if (error.message === "Could not get session") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("An unxpected error occurred, please try again", {
      status: 500,
    });
  }
}
