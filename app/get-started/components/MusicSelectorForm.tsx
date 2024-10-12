"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

export default function MusicSelectorForm({ onMusicSelect }: any) {
  const meals = [
    {
      index: 0,
      title: "Sad",
      description: "",
    },
    {
      index: 1,
      title: "Moody",
      description: "",
    },
    {
      index: 2,
      title: "Chill",
      description: "",
    },
    {
      index: 3,
      title: "Happy",
      description: "",
    },
    {
      index: 4,
      title: "Excited",
      description: "",
    },
  ];

  const [selectedMusicIndex, setSelectedMusicIndex] = useState<number | null>(
    null
  );

  const handleSelectionChange = (index: number | null) => {
    setSelectedMusicIndex(index);
    // Notify parent component
    if (onMusicSelect) {
      onMusicSelect(index);
    }
  };

  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <Badge>4</Badge>{" "}
          <strong>
            What kind of music do you want to go along with your recipe?
          </strong>
        </h3>
        <p>
          A playlist will be coupled to your recipe to complete your Bite and
          here you can give a nudge in the direction of what kind of music you
          want to go with your recipe.
        </p>
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
