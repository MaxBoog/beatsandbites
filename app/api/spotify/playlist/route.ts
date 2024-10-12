import { NextResponse } from "next/server";
// import SpotifyWebApi from "spotify-web-api-node";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get("mood");
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // if (!token) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // if (!mood) {
  //   return NextResponse.json({ error: "Mood is required" }, { status: 400 });
  // }

  // // const spotifyApi = new SpotifyWebApi();
  // spotifyApi.setAccessToken(token);

  // try {
  //   // Search for playlists matching the mood
  //   const data = await spotifyApi.searchPlaylists(mood);
  //   if (data.body.playlists?.items?.length > 0) {
  //     const playlist = data.body.playlists.items[0];
  //     return NextResponse.json({ playlist });
  //   } else {
  //     return NextResponse.json(
  //       { error: "No playlists found" },
  //       { status: 404 }
  //     );
  //   }
  // } catch (error) {
  //   console.error("Spotify API Error:", error);
  //   return NextResponse.json(
  //     { error: "Failed to fetch playlist" },
  //     { status: 500 }
  //   );
  // }
}
