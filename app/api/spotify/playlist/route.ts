import { getAccessToken } from "@/app/utils/spotify";
import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood");
    // const cuisine = searchParams.get("cuisine") || "italian";

    const accessToken = await getAccessToken();

    // const authorizationHeader = request.headers.get("Authorization");
    // console.log("Authorization header:", authorizationHeader);
    // if (!authorizationHeader) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // if (!accessToken) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // console.log(mood);

    // const spotifyApi = new SpotifyWebApi();
    // spotifyApi.setAccessToken(accessToken);

    // const data = await spotifyApi.clientCredentialsGrant();
    // spotifyApi.setAccessToken(data.body["access_token"]);

    // const searchData = await spotifyApi.searchPlaylists(mood);

    // Safely assign items, defaulting to an empty array if undefined
    // const items = searchData.body.playlists?.items ?? [];

    // if (items.length > 0) {
    //   const playlist = items[0];
    //   return NextResponse.json({ playlistUri: playlist.uri });
    // } else {
    //   return NextResponse.json(
    //     { error: "No playlists found" },
    //     { status: 404 }
    //   );
    // }

    const response = await fetch(
      `https://api.spotify.com/v1/search?${new URLSearchParams({
        // q: `${mood} ${cuisine}`,
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
