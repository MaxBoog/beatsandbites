// app/page.tsx

"use client";

import { useEffect, useState } from "react";

interface PlaylistItem {
  name: string;
  images: { url: string }[];
  description: string;
}

export default function Home() {
  const [playlist, setPlaylist] = useState<PlaylistItem | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await fetch("/api/spotify?mood=relaxed&cuisine=italian");
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
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }

    fetchPlaylist();
  }, []);

  return (
    <main className="w-full h-full">
      <h1>Beats and Bites</h1>
      {playlist ? (
        <div>
          <h2>{playlist.name}</h2>
          <img src={playlist.images[0].url} alt={playlist.name} width={300} />
          <p>{playlist.description}</p>
        </div>
      ) : (
        <p>Loading playlist...</p>
      )}
    </main>
  );
}
