"use client";

import SpotifyPlayer from "../../components/SpotifyPlayer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconPlugConnected } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [hasSpotifyAccessToken, setHasSpotifyAccessToken] = useState(false);

  useEffect(() => {
    const checkAccessToken = async () => {
      const response = await fetch("/api/spotify/token");
      if (response.ok) {
        setHasSpotifyAccessToken(true);
      } else {
        setHasSpotifyAccessToken(false);
      }
    };
    checkAccessToken();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Connect to Spotify</h2>
        <Separator />
        {hasSpotifyAccessToken ? (
          <SpotifyPlayer />
        ) : (
          <Link href={"/api/spotify/login"} className="">
            <Button className="rounded-full bg-4">
              <IconPlugConnected /> Connect with Spotify
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
