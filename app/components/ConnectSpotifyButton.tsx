"use client";

import { useState, useEffect } from "react";
import SpotifyPlayer from "./SpotifyPlayer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconPlugConnected } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface ConnectSpotifyButtonProps {
  onSpotifyConnect?: () => void;
}

export default function ConnectSpotifyButton({
  onSpotifyConnect,
}: ConnectSpotifyButtonProps) {
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
    <>
      <div className="col-span-12 sm:col-span-8">
        <h3 className="mb-4">
          <strong>Connect your Spotify account with Beats & Bites</strong>
        </h3>
        <p>
          Beats & Bites will create a playlist for you that goes along with your
          recipe, a combination we call &quot;Bites&quot;, and for that it needs
          authorization to link with your Spotify account. The integration makes
          it possible to play music from within the application.
        </p>
      </div>
      <div className="col-span-12">
        {hasSpotifyAccessToken ? (
          <Button disabled={true} className="rounded-full bg-4">
            <IconPlugConnected /> Your Spotify is connected!
          </Button>
        ) : (
          <Link href={"/api/spotify/login"} className="">
            <Button className="rounded-full bg-4">
              <IconPlugConnected /> Connect with Spotify
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
