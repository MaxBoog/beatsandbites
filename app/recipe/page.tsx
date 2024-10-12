"use client";

import { useEffect, useState, useContext } from "react";
import { FormContext } from "../context/FormContext";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { useRouter } from "next/navigation";
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

export default function RecipePage() {
  const { user, getUser } = useKindeBrowserClient();
  const userId = user?.id;
  // console.log(userId);

  const formContext = useContext(FormContext);

  if (!formContext) {
    // Handle the case where context is not available
    return null;
  }

  const { mood, mealType, music, ingredients } = formContext;
  const [recipe, setRecipe] = useState<any>(null);
  const [similarRecipes, setSimilarRecipes] = useState<any[]>([]);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch the recipe data if not already fetched
    const fetchRecipe = async () => {
      const data = {
        mood,
        mealType,
        ingredients,
      };

      const response = await fetch("/api/get-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setRecipe(result.recipe);
        setSimilarRecipes(result.similarRecipes);
      } else {
        router.push("/get-started");
      }
    };

    if (!recipe) {
      fetchRecipe();
    }
  }, [mood, mealType, ingredients, recipe]);

  if (!recipe) {
    return <LoadingSkeleton />;
  }

  // Parse RecipeIngredientQuantities
  let quantitiesArray = [];
  if (recipe.RecipeIngredientQuantities) {
    quantitiesArray = JSON.parse(
      recipe.RecipeIngredientQuantities.replace(/None/g, "null")
    );
  }

  // Parse RecipeIngredientParts
  let ingredientsArray = [];
  if (recipe.RecipeIngredientParts) {
    // Attempt to parse as JSON array
    try {
      ingredientsArray = JSON.parse(
        recipe.RecipeIngredientParts.replace(/'/g, '"')
      );
    } catch (error) {
      // If parsing fails, split by commas
      ingredientsArray = recipe.RecipeIngredientParts.split(" ").map(
        (item: any) => item.trim()
      );
    }
  }

  // Combine quantities and ingredients
  let ingredientsList = ingredientsArray.map(
    (ingredient: string, index: number) => {
      let quantity = quantitiesArray[index];
      if (quantity === null || quantity === undefined) {
        return ingredient;
      } else {
        return `${quantity} ${ingredient}`;
      }
    }
  );

  const handleSaveRecipe = async () => {
    setIsSaving(true);

    if (!user) {
      console.error("User not authenticated");
      // Redirect to login page or show a message
      router.push("/login");
      return;
    }

    // Save the recipe to 'saved_recipes' table
    const { data: saved_recipes, error: insertError } = await supabase
      .from("saved_recipes")
      .insert([
        {
          user_id: userId,
          recipe_id: recipe.RecipeId,
          recipe_data: recipe, // Optional, if you have a 'recipe_data' JSONB column
        },
      ]);

    if (insertError) {
      console.error("Error saving recipe:", insertError);
      toast.error("Failed to save the recipe. Please try again.");
    } else {
      toast.success("Recipe saved to My Bites!");
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <h1 className="text-center text-2xl font-bold">Your Bite is ready!</h1>

      <div className="my-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {recipe.Name} - <Badge>{recipe.RecipeCategory}</Badge>
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
              {recipe.RecipeInstructions}
            </p>
            <p>
              Serves: <span className="font-bold">{recipe.RecipeServings}</span>
            </p>
            <p>
              Calories: <span className="font-bold">{recipe.Calories}</span> per
              serving
            </p>
            <p>
              Prep Time: <span className="font-bold">{recipe.TotalTime}</span>{" "}
              minutes
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="mr-2"
              onClick={handleSaveRecipe}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save to My Bites"}
            </Button>
            <Link href="/dashboard/my-bites">
              <Button>Go to My Bites</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* <h2>Spotify Playlist</h2> */}
      {/* Display Spotify playlist based on music mood */}
      {/* <SpotifyPlayer mood={music} /> */}

      <h2 className="text-xl font-bold my-2">
        Not exactly what you are looking for?
      </h2>
      {similarRecipes.length > 0 ? (
        <ul>
          {similarRecipes.map((simRecipe) => (
            <li
              key={simRecipe.RecipeId}
              className="border p-4 rounded-lg shadow my-4"
            >
              <div className="flex justify-between">
                <h3 className="">{simRecipe.Name}</h3>
                <Button onClick={() => setRecipe(simRecipe)}>
                  Select this recipe
                </Button>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                {simRecipe.Description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No similar recipes found.</p>
      )}
    </div>
  );
}
