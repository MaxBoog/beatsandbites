import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(request: NextRequest) {
  // Retrieve the refresh token from cookies
  const refreshToken = request.cookies.get("spotify_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect("/api/spotify/login");
  }

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID!}:${process.env.SPOTIFY_CLIENT_SECRET!}`
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error refreshing Spotify access token:", data);
    return NextResponse.redirect("/api/spotify/login");
  }

  // Update the access token cookie
  const accessTokenCookie = serialize(
    "spotify_access_token",
    data.access_token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
    }
  );

  return NextResponse.json({ success: true }).headers.append(
    "Set-Cookie",
    accessTokenCookie
  );
}
