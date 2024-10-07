"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

export default function MealSelectorForm({ onMealSelect }: any) {
  const meals = [
    {
      index: 0,
      title: "Breakfast",
      description: "",
    },
    {
      index: 1,
      title: "Lunch",
      description: "",
    },
    {
      index: 2,
      title: "Dinner",
      description: "",
    },
  ];

  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(
    null
  );

  const handleSelectionChange = (index: number | null) => {
    setSelectedMealIndex(index);
    // Notify parent component
    if (onMealSelect) {
      onMealSelect(index);
    }
  };

  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <strong>What are you making?</strong>
        </h3>
        <p>Are you making breakfast, lunch or dinner?</p>
      </div>

      <div className="col-span-12">
        <div className="max-w-7xl mx-auto px-8">
          <HoverEffect
            items={meals}
            onSelectionChange={handleSelectionChange}
            multiple={false}
          />
        </div>
      </div>
    </>
  );
}
