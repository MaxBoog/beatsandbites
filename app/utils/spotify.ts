// app/utils/spotify.ts

import querystring from "querystring";
import { Buffer } from "buffer";

export async function getAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Spotify Token Error: ${data.error_description || data.error}`
    );
  }

  return data.access_token;
}
