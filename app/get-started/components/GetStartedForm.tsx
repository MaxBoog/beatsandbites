"use client";

import { useState, useEffect } from "react";
import { MoodSelectorForm } from "./MoodSelectorForm";
import MealSelectorForm from "./MealSelectorForm";
import IngredientsSelectorForm from "./IngredientsSelectorForm";
import ConnectSpotifyButton from "../../components/ConnectSpotifyButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MusicSelectorForm from "./MusicSelectorForm";

export default function GetStartedForm() {
  const [mood, setMood] = useState<number | null>(null);
  const [mealType, setMealType] = useState<number | null>(null);
  const [music, setMusic] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<number[]>([]);

  const handleCreateBite = async () => {
    // Perform database operations here
    // Prepare the data
    const data = {
      mood,
      mealType,
      ingredients,
    };

    // Send data to an API route
    const response = await fetch("/api/bites/create-bite", {
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
    mood !== null && mealType !== null && music !== null;

  return (
    <>
      <MoodSelectorForm onMoodSelect={setMood} />
      <MealSelectorForm onMealSelect={setMealType} />
      <IngredientsSelectorForm onIngredientsSelect={setIngredients} />
      <MusicSelectorForm onMusicSelect={setMusic} />

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
