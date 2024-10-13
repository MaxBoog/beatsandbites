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
      description:
        "A morning meal typically consisting of light and energizing foods such as eggs, toast, cereal, or fruit, providing fuel for the start of the day.",
    },
    {
      index: 1,
      title: "Lunch",
      description:
        "A midday meal often featuring sandwiches, salads, or soups, designed to keep energy levels steady during the afternoon.",
    },
    {
      index: 2,
      title: "Dinner",
      description:
        "The main evening meal, usually heartier, featuring proteins like chicken, beef, or fish, along with vegetables and grains",
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
          <Badge>2</Badge> <strong>What are you making?</strong>
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
