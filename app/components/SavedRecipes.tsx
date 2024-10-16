"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { supabase } from "@/lib/supabaseClient";
import { unstable_noStore as noStore } from "next/cache";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import SpotifyPlayer from "./SpotifyPlayer";

interface Item {
  mood: number; // or use a more strict type, e.g., 0 | 1 | 2 | 3
  music: number; // or use a more strict type, e.g., 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

export default function SavedRecipes({ user }: any) {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userId = user.id;
  // console.log(user);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setLoading(true);

      // Fetch saved recipes for the user
      const { data: saved_recipes, error } = await supabase
        .from("saved_recipes")
        .select()
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching saved recipes:", error);
        toast.error("Failed to load your saved recipes.");
      } else {
        setSavedRecipes(saved_recipes || []);
      }

      setLoading(false);
    };

    fetchSavedRecipes();
  }, [supabase, router]);

  const handleDeleteRecipe = async (savedRecipeId: string) => {
    const { data, error } = await supabase
      .from("saved_recipes")
      .delete()
      .eq("id", savedRecipeId);

    if (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete the recipe. Please try again.");
    } else {
      // Remove the recipe from the state
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== savedRecipeId)
      );
      toast.success("Recipe deleted.");
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  const moodMap = {
    0: "Lazy",
    1: "Moderate",
    2: "Adventurous",
    3: "Chef-Like",
  };

  const musicMap = {
    0: "Calm",
    1: "Happy",
    2: "Energetic",
    3: "Uplifting",
    4: "Soothing",
    5: "Relaxing",
    6: "Ambient",
    7: "Laid-Back",
    8: "Calming",
    9: "Top-2000",
  };

  const toggleMealType = (mealType: string) => {
    setSelectedMealTypes((prevSelected) => {
      if (prevSelected.includes(mealType)) {
        // Remove the meal type from the selection
        return prevSelected.filter((type) => type !== mealType);
      } else {
        // Add the meal type to the selection
        return [...prevSelected, mealType];
      }
    });
  };

  console.log(selectedMealTypes);

  const filteredRecipes = savedRecipes.filter((item) => {
    if (selectedMealTypes.length === 0) return true; // If no meal types are selected, show all recipes
    const recipe = item.recipe_data;
    return selectedMealTypes.includes(recipe.meal_type);
  });

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2 className="text-2xl font-bold mb-4">My Bites</h2>
        <Separator />
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Filter your Bites
        </p>
        <div className="flex space-x-2 mb-4">
          {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
            <Button
              key={mealType}
              variant={
                selectedMealTypes.includes(mealType) ? "default" : "outline"
              }
              onClick={() => toggleMealType(mealType)}
            >
              {mealType}
            </Button>
          ))}
        </div>

        {filteredRecipes.length === 0 ? (
          <p className="mt-4">
            You have no saved Bites. Go create some Bites first.
          </p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
            {filteredRecipes.map((item) => {
              const recipe = item.recipe_data;
              // Map mood and music numeric values to labels
              const moodLabel =
                moodMap[item.mood as keyof typeof moodMap] || "Unknown Mood";
              const musicLabel =
                musicMap[item.music as keyof typeof musicMap] ||
                "Unknown Music";
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
                  ingredientsArray = recipe.RecipeIngredientParts.split(
                    " "
                  ).map((item: any) => item.trim());
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
                <>
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>
                        {recipe.Name} - <Badge>{recipe.meal_type}</Badge>
                      </CardTitle>
                      <CardDescription>{recipe.Description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Serves: {recipe.RecipeServings}</p>
                      <p>Calories: {recipe.Calories} per serving</p>
                      <p>Prep Time: {recipe.TotalTime} minutes</p>
                      {/* Add more recipe details as needed */}
                      <Dialog>
                        <Button className="mt-2 mr-2">
                          <DialogTrigger>Open Bite</DialogTrigger>
                        </Button>
                        <DialogContent className="max-w-5xl p-8">
                          <DialogHeader>
                            <DialogTitle>
                              {recipe.Name} -{" "}
                              <Badge>{recipe.RecipeCategory}</Badge>
                            </DialogTitle>
                            <DialogDescription>
                              {recipe.Description}
                            </DialogDescription>

                            <DialogDescription>
                              For this Bite you selected{" "}
                              <strong>{moodLabel}</strong> mood and{" "}
                              <strong>{musicLabel}</strong> music.
                            </DialogDescription>
                            <Separator />
                          </DialogHeader>
                          <div className="flex items-center">
                            <div className="grid gap-2">
                              <h3 className="font-bold mt-4">Ingredients:</h3>
                              <ul className="list-disc list-inside">
                                {ingredientsList.map(
                                  (item: any, index: number) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                              <h3 className="font-bold mt-4">Instructions:</h3>
                              <p className="my-2 text-gray-800 dark:text-gray-400">
                                {recipe.RecipeInstructions}
                              </p>
                              <p>
                                Serves:{" "}
                                <span className="font-bold">
                                  {recipe.RecipeServings}
                                </span>
                              </p>
                              <p>
                                Calories:{" "}
                                <span className="font-bold">
                                  {recipe.Calories}
                                </span>{" "}
                                per serving
                              </p>
                              <p>
                                Prep Time:{" "}
                                <span className="font-bold">
                                  {recipe.TotalTime}
                                </span>{" "}
                                minutes
                              </p>
                              <p>
                                Tags: <Badge>{recipe.meal_type}</Badge>
                              </p>
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <SpotifyPlayer mood={recipe.music} />
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant={"destructive"}>Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            Are you sure you want to delete this Bite?
                          </DialogHeader>
                          <Separator />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant={"secondary"}>
                                Close
                              </Button>
                            </DialogClose>
                            <Button
                              variant={"destructive"}
                              onClick={() => handleDeleteRecipe(item.id)}
                            >
                              Yes delete my Bite
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
