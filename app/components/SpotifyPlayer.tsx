"use client";

import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SpotifyPlayerProps {
  mood: number | null | undefined;
}

interface PlaylistItem {
  name: string;
  images: { url: string }[];
  description: string;
  id: string;
}

export default function SpotifyPlayer({ mood }: SpotifyPlayerProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [track, setTrack] = useState<any>(null);
  const [playlist, setPlaylist] = useState<PlaylistItem | null>(null);

  // console.log(mood);
  const router = useRouter();
  let counter_mood: string;
  switch (mood) {
    case 0:
      counter_mood = "calm";
      break;
    case 1:
      counter_mood = "happy";
      break;
    case 2:
      counter_mood = "energetic";
      break;
    case 3:
      counter_mood = "uplifting";
      break;
    case 4:
      counter_mood = "soothing";
      break;
    case 5:
      counter_mood = "relaxing";
      break;
    case 6:
      counter_mood = "ambient";
      break;
    case 7:
      counter_mood = "laid-back";
      break;
    case 8:
      counter_mood = "calming";
      break;
    case 9:
      counter_mood = "top-2000";
      break;
    default:
      counter_mood = "top-2000"; // or handle accordingly
      break;
  }

  // console.log(counter_mood);

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     try {
  //       const response = await fetch("/api/spotify/token");
  //       const data = await response.json();

  //       if (response.ok) {
  //         setAccessToken(data.accessToken);
  //         console.log("Access token received:", data.accessToken);
  //       } else {
  //         // Redirect to Spotify login
  //         window.location.href = "/api/spotify/login";
  //       }
  //     } catch (error) {
  //       console.error("Error fetching access token:", error);
  //       window.location.href = "/api/spotify/login";
  //     }
  //   };

  //   fetchAccessToken();
  // }, []);

  // useEffect(() => {
  //   const fetchPlaylist = async () => {
  //     if (!accessToken) return;

  //     try {
  //       const response = await fetch(
  //         `/api/spotify/playlist?mood=${encodeURIComponent(counter_mood)}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           credentials: "include",
  //         }
  //       );

  //       const data = await response.json();
  //       if (response.ok) {
  //         setPlaylist(data.playlist);
  //       } else {
  //         console.error("Error fetching playlist:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchPlaylist();
  // }, [accessToken, counter_mood]);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await fetch(
          `/api/spotify?mood=${encodeURIComponent(counter_mood)}`
        );
        const data = await res.json();

        if (data.error) {
          console.error(data.error);
          return;
        }

        const playlistItem = data.playlists.items[0];

        setPlaylist({
          name: playlistItem.name,
          images: playlistItem.images,
          description: playlistItem.description,
          id: playlistItem.id,
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }

    fetchPlaylist();
  }, []);
  if (!playlist) {
    return <p>Loading playlist...</p>;
  }

  // const player = useSpotifyPlayer(accessToken);

  // useEffect(() => {
  //   if (!player) return;

  //   player.addListener("ready", ({ device_id }: { device_id: string }) => {
  //     console.log("Player is ready on device:", device_id);
  //     setDeviceId(device_id);
  //   });

  //   player.addListener("player_state_changed", (state: any) => {
  //     if (!state) return;
  //     setIsPaused(state.paused);
  //     setTrack(state.track_window.current_track);
  //   });
  // }, [player]);

  // const handlePlay = async () => {
  //   if (!deviceId || !accessToken) return;

  //   await fetch(
  //     `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         uris: ["spotify:track:1cTZMwcBJT0Ka3UJPXOeeN"], // Replace with the track you want to play
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  // };

  // return (
  //   <div>
  //     {track && (
  //       <div>
  //         <h3>{track.name}</h3>
  //         <p>{track.artists.map((artist: any) => artist.name).join(", ")}</p>
  //         <img src={track.album.images[0].url} alt={track.name} width={200} />
  //       </div>
  //     )}
  //     <button onClick={handlePlay}>Play</button>
  //     <button onClick={() => player?.togglePlay()}>
  //       {isPaused ? "Resume" : "Pause"}
  //     </button>
  //   </div>
  // );

  return (
    <div>
      {/* <h3>{playlist.name}</h3> */}
      {/* Embed Spotify player or display playlist tracks */}
      <div className="rounded-full">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
          width="100%"
          height="84"
          frameBorder="0"
          allow="encrypted-media"
          style={{
            borderRadius: "20px",
            borderColor: "black",
            borderWidth: "2px",
            backgroundColor: "black",
          }}
        ></iframe>
      </div>
      {/* <div>
        <h2>{playlist.name}</h2>
        <img src={playlist.images[0].url} alt={playlist.name} width={300} />
        <p>{playlist.description}</p>
      </div> */}
    </div>
  );
}
