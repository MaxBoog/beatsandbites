import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const scope =
    "user-read-email user-read-private streaming user-modify-playback-state user-read-playback-state";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    state: "some-random-state", // Consider generating a random state for CSRF protection
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}
