"use client";

import { useState, useEffect } from "react";

interface PlaybackControlsProps {
  player: any;
  playlistUri: string;
}

export default function PlaybackControls({
  player,
  playlistUri,
}: PlaybackControlsProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  useEffect(() => {
    if (!player) return;

    player.addListener("player_state_changed", (state: any) => {
      if (!state) return;

      setIsPaused(state.paused);
      setCurrentTrack(state.track_window.current_track);
    });
  }, [player]);

  const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      player._options.getOAuthToken((token: string) => {
        if (token) {
          resolve(token);
        } else {
          reject("Failed to retrieve access token");
        }
      });
    });
  };

  const handlePlay = async () => {
    try {
      const deviceId = player._options.id;
      const token = await getAccessToken();

      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            context_uri: playlistUri,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error in handlePlay:", error);
    }
  };

  const handleTogglePlay = () => {
    player.togglePlay();
  };

  return (
    <div>
      {currentTrack && (
        <div>
          <img
            src={currentTrack.album.images[0].url}
            alt={currentTrack.name}
            width={50}
          />
          <div>
            <div>{currentTrack.name}</div>
            <div>{currentTrack.artists[0].name}</div>
          </div>
        </div>
      )}
      <button onClick={handlePlay}>Play Playlist</button>
      <button onClick={handleTogglePlay}>{isPaused ? "Play" : "Pause"}</button>
    </div>
  );
}
