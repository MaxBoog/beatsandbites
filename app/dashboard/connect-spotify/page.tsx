"use client";
import ConnectSpotifyButton from "@/app/components/ConnectSpotifyButton";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function Page() {
  const [hasSpotifyAccessToken, setHasSpotifyAccessToken] = useState(false);
  // Check Spotify access token on mount
  useEffect(() => {
    const checkAccessToken = async () => {
      const response = await fetch("/api/spotify/token");
      setHasSpotifyAccessToken(response.ok);
    };
    checkAccessToken();
  }, []);
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Connect to Spotify</h2>
        <Separator />
        <ConnectSpotifyButton
          onSpotifyConnect={() => setHasSpotifyAccessToken(true)}
        />
      </div>
    </div>
  );
}
