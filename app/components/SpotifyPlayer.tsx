"use client";

import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    // Fetch the access token from cookies or API
    const fetchAccessToken = async () => {
      const response = await fetch("/api/spotify/token"); // Implement this endpoint to retrieve the token
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
      } else {
        // Redirect to Spotify login if no token
        window.location.href = "/api/spotify/login";
      }
    };

    fetchAccessToken();
  }, []);

  const player = useSpotifyPlayer(accessToken);

  useEffect(() => {
    if (!player) return;

    player.addListener("ready", ({ device_id }: { device_id: string }) => {
      console.log("Player is ready on device:", device_id);
      setDeviceId(device_id);
    });

    player.addListener("player_state_changed", (state: any) => {
      if (!state) return;
      setIsPaused(state.paused);
      setTrack(state.track_window.current_track);
    });
  }, [player]);

  const handlePlay = async () => {
    if (!deviceId || !accessToken) return;

    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: ["spotify:track:1cTZMwcBJT0Ka3UJPXOeeN"], // Replace with the track you want to play
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <div>
      {track && (
        <div>
          <h3>{track.name}</h3>
          <p>{track.artists.map((artist: any) => artist.name).join(", ")}</p>
          <img src={track.album.images[0].url} alt={track.name} width={200} />
        </div>
      )}
      <button onClick={handlePlay}>Play</button>
      <button onClick={() => player?.togglePlay()}>
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
