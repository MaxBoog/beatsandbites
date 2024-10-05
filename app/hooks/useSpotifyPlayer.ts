"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

export function useSpotifyPlayer(token: string | null) {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const scriptTag = document.getElementById("spotify-player");

    if (!scriptTag) {
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.src = "https://sdk.scdn.co/spotify-player.js";
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Next.js App Player",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      // Error handling
      player.addListener(
        "initialization_error",
        ({ message }: { message: string }) => {
          console.error(message);
        }
      );
      player.addListener(
        "authentication_error",
        ({ message }: { message: string }) => {
          console.error(message);
        }
      );
      player.addListener(
        "account_error",
        ({ message }: { message: string }) => {
          console.error(message);
        }
      );
      player.addListener(
        "playback_error",
        ({ message }: { message: string }) => {
          console.error(message);
        }
      );

      // Playback status updates
      player.addListener("player_state_changed", (state: any) => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Ready with Device ID", device_id);
        // Optionally, you can store the device_id for later use
      });

      // Not Ready
      player.addListener(
        "not_ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Device ID has gone offline", device_id);
        }
      );

      player.connect();
    };
  }, [token]);

  return player;
}
