import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "NoAccessToken" }, { status: 401 });
  }

  return NextResponse.json({ accessToken });
}
