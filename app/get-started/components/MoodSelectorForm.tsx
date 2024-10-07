"use client";

import { useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Badge } from "@/components/ui/badge";

export function MoodSelectorForm({ onMoodSelect }: any) {
  const moods = [
    {
      index: 0,
      title: "Lazy",
      description:
        "Quick and easy meals that do not contain to many ingredients and do not take much time to make. Perfect for your lazy Sunday.",
    },
    {
      index: 1,
      title: "Moderate",
      description: "Fun and simple meals for an afternoon or weekly evening. ",
    },
    {
      index: 2,
      title: "Adventurous",
      description:
        "Recipes that take some more effort but are rewarding if you want to impress the in-laws cominig over.",
    },
    {
      index: 3,
      title: "Chef-like",
      description:
        "Fancy and detailed recipes for when you want to put together something remarkable. These will test your chef skills.",
    },
  ];

  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(
    null
  );

  const handleSelectionChange = (index: number | null) => {
    setSelectedMoodIndex(index);
    if (onMoodSelect) {
      onMoodSelect(index);
    }
  };

  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <strong>Decide your mood</strong>
        </h3>
        <p>
          How are you feeling today? Tired from a long day of work? Or feeling
          like a chef during the weekend? Whatever it is, Beats & Bites has you
          covered.
        </p>
      </div>
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto px-8">
          <HoverEffect
            items={moods}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </div>
    </>
  );
}
