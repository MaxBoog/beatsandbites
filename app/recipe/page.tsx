"use client";

import React, { useEffect, useState, useContext } from "react";
import { FormContext } from "../context/FormContext";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Link from "next/link";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconHomeShare,
  IconLoader,
  IconRefresh,
} from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";

export default function RecipePage() {
  // fetching user
  const { user } = useKindeBrowserClient();
  const userId = user?.id;
  const router = useRouter();
  const formContext = useContext(FormContext);
  if (!formContext) {
    router.push("/get-started");
    return null; // Prevent further rendering
  }
  const { mood, music, mealType, ingredients, recipe, similarRecipe } =
    formContext;

  // hooks for setting recipes
  const [newRecipe, setNewRecipe] = useState<any>(recipe);
  const [similarRecipes, setSimilarRecipes] = useState<any>(similarRecipe);

  // hooks for loading
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // hooks for Spotify token and player
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlistUri, setPlaylistUri] = useState<string | null>(null);

  // display loading state when no context available and return to /get-started if not available

  // console.log(recipe);

  const player = useSpotifyPlayer(accessToken);

  const fetchRecipe = async () => {
    setIsLoading(true);

    const data = {
      mood,
      mealType,
      ingredients,
    };
    console.log("Data sent to /api/get-recipe:", data);

    try {
      const response = await fetch("/api/get-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Fetched recipe:", result.recipe);
        setNewRecipe(result.recipe);
        setSimilarRecipes(result.similarRecipes);
      } else {
        console.error("Error fetching recipe:", result.error);
        toast.error("Failed to fetch recipe.");
        router.replace("/get-started");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      toast.error("An error occurred while fetching the recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!music) return;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          `/api/spotify/playlist?mood=${encodeURIComponent(music)}`
        );
        const data = await response.json();

        if (response.ok) {
          setPlaylistUri(data.playlistUri);
        } else {
          console.error("Error fetching playlist:", data.error);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [music]);

  const handleSaveRecipe = async () => {
    setIsSaving(true);

    if (!user) {
      console.error("User not authenticated");
      // Redirect to login page or show a message
      router.push("/login");
      return;
    }
    if (!recipe) {
      return;
    }

    try {
      // Check if the recipe is already saved by the user
      const { data: existingRecipes, error: fetchError } = await supabase
        .from("saved_recipes")
        .select("id")
        .eq("user_id", userId)
        .eq("recipe_id", newRecipe.RecipeId);

      if (fetchError) {
        console.error("Error checking existing recipes:", fetchError);
        toast.error("An error occurred. Please try again.");
        setIsSaving(false);
        return;
      }

      if (existingRecipes && existingRecipes.length > 0) {
        // Recipe already saved
        toast.info("You've already saved this recipe to My Bites!");
        setIsSaving(false);
        return;
      }

      // Save the recipe to 'saved_recipes' table
      const { error: insertError } = await supabase
        .from("saved_recipes")
        .insert([
          {
            user_id: userId,
            recipe_id: newRecipe.RecipeId,
            recipe_data: newRecipe, // Optional, if you have a 'recipe_data' JSONB column
            mood: mood,
            music: music,
          },
        ]);

      if (insertError) {
        console.error("Error saving recipe:", insertError);
        toast.error("Failed to save the recipe. Please try again.");
      } else {
        toast.success("Recipe saved to My Bites!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !recipe) {
    return <LoadingSkeleton />;
  }

  let quantitiesArray = [];
  if (newRecipe.RecipeIngredientQuantities) {
    quantitiesArray = JSON.parse(
      newRecipe.RecipeIngredientQuantities.replace(/None/g, "null")
    );
  }

  // Parse RecipeIngredientParts
  let ingredientsArray = [];
  if (newRecipe.RecipeIngredientParts) {
    // Attempt to parse as JSON array
    try {
      ingredientsArray = JSON.parse(
        newRecipe.RecipeIngredientParts.replace(/'/g, '"')
      );
    } catch (error) {
      // If parsing fails, split by commas
      ingredientsArray = newRecipe.RecipeIngredientParts.split(" ").map(
        (item: any) => item.trim()
      );
    }
  }

  // Combine quantities and ingredients
  const ingredientsList = ingredientsArray.map(
    (ingredient: string, index: number) => {
      const quantity = quantitiesArray[index];
      if (quantity === null || quantity === undefined) {
        return ingredient;
      } else {
        return `${quantity} ${ingredient}`;
      }
    }
  );

  return (
    <div className="max-w-7xl mx-auto px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/get-started">Get Started</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Your Bite</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center text-2xl font-bold">Your Bite is ready!</h1>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {newRecipe.Name} - <Badge>{newRecipe.RecipeCategory}</Badge>
            </CardTitle>
            <CardDescription>{recipe.Description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold mt-4">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {ingredientsList.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 className="font-bold mt-4">Instructions:</h3>
            <p className="my-2 text-gray-800 dark:text-gray-400">
              {newRecipe.RecipeInstructions}
            </p>
            <p>
              Serves:{" "}
              <span className="font-bold">{newRecipe.RecipeServings}</span>
            </p>
            <p>
              Calories: <span className="font-bold">{newRecipe.Calories}</span>{" "}
              per serving
            </p>
            <p>
              Prep Time:{" "}
              <span className="font-bold">{newRecipe.TotalTime}</span> minutes
            </p>
            <p>
              Tags: <Badge>{newRecipe.meal_type}</Badge>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="mr-2"
              onClick={handleSaveRecipe}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <IconLoader className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <IconBookmark /> Save to My Bites
                </>
              )}
            </Button>
            <Link href="/dashboard/my-bites">
              <Button variant={"secondary"}>
                <IconHomeShare /> Go to My Bites
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Display Spotify playlist based on music mood */}
      <SpotifyPlayer mood={music} />

      <h2 className="text-xl font-bold my-2">
        Not exactly what you are looking for?
      </h2>
      {similarRecipes.length > 0 ? (
        <ul>
          {similarRecipes.map((simRecipe: any) => (
            <li
              key={simRecipe.RecipeId}
              className="border p-4 rounded-lg shadow my-4"
            >
              <div className="flex justify-between">
                <h3 className="">{simRecipe.Name}</h3>
                <Button onClick={() => setNewRecipe(simRecipe)}>
                  Select this recipe
                </Button>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                {simRecipe.Description}
              </p>
            </li>
          ))}
          <li className="border p-4 rounded-lg shadow my-4">
            <Button onClick={fetchRecipe} disabled={isLoading}>
              <IconRefresh className="mr-2" />
              {isLoading
                ? "Fetching..."
                : "I want something completely different"}
            </Button>
          </li>
        </ul>
      ) : (
        <p>No similar recipes found.</p>
      )}
    </div>
  );
}
