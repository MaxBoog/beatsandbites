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

export default function SavedRecipes({ user }: any) {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = user.id;
  console.log(user);

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

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2 className="text-2xl font-bold mb-4">My Bites</h2>
        <Separator />

        {savedRecipes.length === 0 ? (
          <p className="mt-4">You have no saved recipes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {savedRecipes.map((item) => {
              const recipe = item.recipe_data;
              return (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{recipe.Name}</CardTitle>
                    <CardDescription>{recipe.Description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Serves: {recipe.RecipeServings}</p>
                    <p>Calories: {recipe.Calories} per serving</p>
                    <p>Prep Time: {recipe.TotalTime} minutes</p>
                    {/* Add more recipe details as needed */}
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={() => handleDeleteRecipe(item.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
