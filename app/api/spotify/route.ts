// app/api/spotify/route.ts

import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/utils/spotify";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood");
    // const cuisine = searchParams.get("cuisine") || "italian";

    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?${new URLSearchParams({
        q: `${mood}`,
        type: "playlist",
        limit: "1",
      })}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Spotify API Error: ${data.error.message}`);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
