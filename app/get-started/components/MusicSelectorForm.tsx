"use client";

import { useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Badge } from "@/components/ui/badge";

export default function MusicSelectorForm({ onMusicSelect }: any) {
  const musicMoods = [
    {
      index: 0,
      title: "Relaxed",
      description: "",
    },
    {
      index: 1,
      title: "Happy",
      description: "",
    },
    {
      index: 2,
      title: "Excited",
      description: "",
    },
    {
      index: 3,
      title: "Sad",
      description: "",
    },
    {
      index: 4,
      title: "Nervous",
      description: "",
    },
    {
      index: 5,
      title: "Tired",
      description: "",
    },
    {
      index: 6,
      title: "Bored",
      description: "",
    },
    {
      index: 7,
      title: "Lazy",
      description: "",
    },
    {
      index: 8,
      title: "Stressed",
      description: "",
    },
    {
      index: 9,
      title: "Not sure",
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

    // Save the mood string
    const selectedMood = musicMoods.find((m) => m.index === index)?.description;
    if (selectedMood) {
      localStorage.setItem("musicMood", JSON.stringify(selectedMood));
    }
  };

  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <Badge>3</Badge> <strong>How are you feeling</strong>
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
            items={musicMoods}
            onSelectionChange={handleSelectionChange}
            multiple={false}
          />
        </div>
      </div>
    </>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { HoverEffect } from "@/components/ui/card-hover-effect";
// import { supabase } from "@/lib/supabaseClient";
// import { Badge } from "@/components/ui/badge";

// export default function MusicSelectorForm({ onMusicSelect }: any) {
//   const meals = [
//     {
//       index: 0,
//       title: "Sad",
//       description: "",
//     },
//     {
//       index: 1,
//       title: "Moody",
//       description: "",
//     },
//     {
//       index: 2,
//       title: "Chill",
//       description: "",
//     },
//     {
//       index: 3,
//       title: "Happy",
//       description: "",
//     },
//     {
//       index: 4,
//       title: "Excited",
//       description: "",
//     },
//   ];

//   const [selectedMusicIndex, setSelectedMusicIndex] = useState<number | null>(
//     null
//   );

//   const handleSelectionChange = (index: number | null) => {
//     setSelectedMusicIndex(index);
//     // Notify parent component
//     if (onMusicSelect) {
//       onMusicSelect(index);
//     }
//   };

//   return (
//     <>
//       <div className="col-span-8">
//         <h3 className="mb-4">
//           <Badge>4</Badge>{" "}
//           <strong>
//             What kind of music do you want to go along with your recipe?
//           </strong>
//         </h3>
//         <p>
//           A playlist will be coupled to your recipe to complete your Bite and
//           here you can give a nudge in the direction of what kind of music you
//           want to go with your recipe.
//         </p>
//       </div>

//       <div className="col-span-12">
//         <div className="max-w-7xl mx-auto px-8">
//           <HoverEffect
//             items={meals}
//             onSelectionChange={handleSelectionChange}
//             multiple={false}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
