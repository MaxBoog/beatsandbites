"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

export default function IngredientsSelectorForm({ onIngredientsSelect }: any) {
  const ingredients = [
    {
      index: 0,
      title: "Pasta",
      description: "",
    },
    {
      index: 1,
      title: "Rice",
      description: "",
    },
    {
      index: 2,
      title: "Onion",
      description: "",
    },
    {
      index: 3,
      title: "Garlic",
      description: "",
    },
  ];

  const [selectedIngredientIndices, setSelectedIngredientIndices] = useState<
    number[]
  >([]);

  const handleSelectionChange = (indices: number[]) => {
    setSelectedIngredientIndices(indices);
    if (onIngredientsSelect) {
      onIngredientsSelect(indices);
    }
  };

  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <Badge>3</Badge>{" "}
          <strong>Already have some ingredients at hand?</strong>
        </h3>
        <p>
          Pick from a list of common ingredients, so Beats & Bites will create
          you a recipe with ingredients that you already have at home.
        </p>
      </div>
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto px-8">
          <HoverEffect
            items={ingredients}
            onSelectionChange={handleSelectionChange}
            multiple={true}
          />
        </div>
      </div>
    </>
  );
}
