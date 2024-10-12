"use client";

import React, { createContext, useState, ReactNode } from "react";

interface FormData {
  mood: number | null;
  mealType: number | null;
  music: number | null;
  ingredients: number[];
}

interface FormContextType extends FormData {
  setMood: (mood: number | null) => void;
  setMealType: (mealType: number | null) => void;
  setMusic: (music: number | null) => void;
  setIngredients: (ingredients: number[]) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function FormProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<number | null>(null);
  const [mealType, setMealType] = useState<number | null>(null);
  const [music, setMusic] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<number[]>([]);

  return (
    <FormContext.Provider
      value={{
        mood,
        mealType,
        music,
        ingredients,
        setMood,
        setMealType,
        setMusic,
        setIngredients,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
