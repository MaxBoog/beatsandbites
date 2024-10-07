"use client";

import { useState, useEffect } from "react";
import { MoodSelectorForm } from "./MoodSelectorForm";
import MealSelectorForm from "./MealSelectorForm";
import IngredientsSelectorForm from "./IngredientsSelectorForm";
import ConnectSpotifyButton from "../../components/ConnectSpotifyButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GetStartedForm() {
  const [mood, setMood] = useState<number | null>(null);
  const [mealType, setMealType] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<number[]>([]);
  const [hasSpotifyAccessToken, setHasSpotifyAccessToken] = useState(false);

  // Check Spotify access token on mount
  useEffect(() => {
    const checkAccessToken = async () => {
      const response = await fetch("/api/spotify/token");
      setHasSpotifyAccessToken(response.ok);
    };
    checkAccessToken();
  }, []);

  const handleCreateBite = async () => {
    // Perform database operations here
    // Prepare the data
    const data = {
      mood,
      mealType,
      ingredients,
    };

    // Send data to an API route
    const response = await fetch("/api/create-bite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // Handle the result (e.g., navigate to a new page, display the recipe)
    // For example, navigate to /get-started/create-bite with the result
  };

  const isReadyToCreateBite =
    mood !== null && mealType !== null && hasSpotifyAccessToken;

  return (
    <>
      <MoodSelectorForm onMoodSelect={setMood} />
      <MealSelectorForm onMealSelect={setMealType} />
      <IngredientsSelectorForm onIngredientsSelect={setIngredients} />
      <ConnectSpotifyButton
        onSpotifyConnect={() => setHasSpotifyAccessToken(true)}
      />
      <div className="col-span-8">
        <p className="block">
          {isReadyToCreateBite
            ? "Ready to create your Bite?"
            : "Please fill out all the required steps before creating your Bite"}
        </p>
      </div>
      <div className="col-span-8">
        <Button
          className={cn(
            !isReadyToCreateBite
              ? " hover:cursor-not-allowed"
              : " hover:cursor-pointer",
            ""
          )}
          onClick={handleCreateBite}
          disabled={!isReadyToCreateBite}
        >
          Create my Bite!
        </Button>
      </div>
    </>
  );
}
