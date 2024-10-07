import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Validate state parameter for CSRF protection
  // Retrieve the state from cookies or session and compare

  if (!code) {
    const errorUrl = request.nextUrl.clone();
    errorUrl.pathname = "/error";
    errorUrl.search = "?error=NoCodeProvided";
    return NextResponse.redirect(errorUrl);
  }

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID!}:${process.env.SPOTIFY_CLIENT_SECRET!}`
  ).toString("base64");

  const spotifyResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    }
  );

  const data = await spotifyResponse.json();

  if (!spotifyResponse.ok) {
    console.error("Error obtaining Spotify access token:", data);
    const errorUrl = request.nextUrl.clone();
    errorUrl.pathname = "/error";
    errorUrl.search = "?error=TokenExchangeFailed";
    return NextResponse.redirect(errorUrl);
  }

  // Serialize cookies
  const accessTokenCookie = serialize(
    "spotify_access_token",
    data.access_token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
      sameSite: "lax",
    }
  );

  const refreshTokenCookie = serialize(
    "spotify_refresh_token",
    data.refresh_token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
    }
  );

  // Clone and modify the URL for redirect
  const url = request.nextUrl.clone();
  url.pathname = "/get-started";

  // Create a new NextResponse
  const response = NextResponse.redirect(url);

  // Set cookies in the response headers
  response.headers.set("Set-Cookie", accessTokenCookie);
  response.headers.append("Set-Cookie", refreshTokenCookie);

  return response;
}
