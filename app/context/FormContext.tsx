"use client";

import React, { createContext, useState, ReactNode } from "react";

interface Recipe {
  AggregatedRating: number;
  Calories: number;
  CookTime: number;
  Description: string;
  Keywords: string;
  Name: string;
  PrepTime: number;
  RecipeCategory: string;
  RecipeId: number;
  RecipeIngredientParts: string; // Assuming these are parsed into a string array
  RecipeIngredientQuantities: string; // To handle None values in the list
  RecipeInstructions: string;
  RecipeServings: number;
  ReviewCount: number;
  TotalTime: number;
  meal_type: string;
  recommended_indices: number[];
  row_index: number;
}
interface FormData {
  mood: number | null;
  mealType: number | null;
  music: number | null;
  ingredients: number[];
  recipe: Recipe | null;
  similarRecipe: Recipe | null;
}

interface FormContextType extends FormData {
  setMood: (mood: number | null) => void;
  setMealType: (mealType: number | null) => void;
  setMusic: (music: number | null) => void;
  setIngredients: (ingredients: number[]) => void;
  setRecipe: (recipe: Recipe | null) => void;
  setSimilarRecipes: (similarRecipe: Recipe | null) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function FormProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<number | null>(null);
  const [mealType, setMealType] = useState<number | null>(null);
  const [music, setMusic] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<number[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [similarRecipe, setSimilarRecipes] = useState<Recipe | null>(null);

  return (
    <FormContext.Provider
      value={{
        mood,
        mealType,
        music,
        ingredients,
        recipe,
        similarRecipe,
        setMood,
        setMealType,
        setMusic,
        setIngredients,
        setSimilarRecipes,
        setRecipe,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
