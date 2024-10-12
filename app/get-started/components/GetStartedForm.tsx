"use client";

import { useState, useEffect } from "react";
import { MoodSelectorForm } from "./MoodSelectorForm";
import MealSelectorForm from "./MealSelectorForm";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { useRouter } from "next/navigation";
import IngredientsSelectorForm from "./IngredientsSelectorForm";
import ConnectSpotifyButton from "../../components/ConnectSpotifyButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MusicSelectorForm from "./MusicSelectorForm";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GetStartedForm() {
  const router = useRouter();
  const formContext = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!formContext) {
    // Handle the case where context is not available
    return null;
  }

  const {
    mood,
    mealType,
    music,
    ingredients,
    setMood,
    setMealType,
    setMusic,
    setIngredients,
  } = formContext;

  const handleCreateBite = async () => {
    // Perform database operations here
    // Prepare the data
    setIsLoading(true);
    toast("Creating your Bite...", {
      description: "We are fetching a delicious recipe for you!",
    });
    const data = {
      mood,
      mealType,
      ingredients,
      music,
    };

    // Send data to an API route
    try {
      const response = await fetch("/api/get-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the recipe data or handle it as needed
        router.push("/recipe");
      } else {
        console.error("Error:", result.error);
        // Display error message to the user
        alert(result.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle the error appropriately
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const isReadyToCreateBite =
    mood !== null && mealType !== null && music !== null;

  return (
    <>
      <MoodSelectorForm onMoodSelect={setMood} />
      <MealSelectorForm onMealSelect={setMealType} />
      {/* <IngredientsSelectorForm onIngredientsSelect={setIngredients} /> */}
      <MusicSelectorForm onMusicSelect={setMusic} />

      <div className="col-span-8">
        <p className="block">
          {isReadyToCreateBite
            ? "Ready to create your Bite?"
            : "Please fill out all the required steps before creating your Bite"}
        </p>
      </div>
      <div className="col-span-8">
        <Button
          className={cn(
            !isReadyToCreateBite || isLoading
              ? "cursor-not-allowed opacity-50"
              : "",
            ""
          )}
          onClick={handleCreateBite}
          disabled={!isReadyToCreateBite || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create my Bite!"
          )}
        </Button>
      </div>
    </>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { MoodSelectorForm } from "./MoodSelectorForm";
// import MealSelectorForm from "./MealSelectorForm";
// import IngredientsSelectorForm from "./IngredientsSelectorForm";
// import { Button } from "@/components/ui/button";
// import MusicSelectorForm from "./MusicSelectorForm";

// export default function GetStartedForm() {
//   const [mood, setMood] = useState<number | null>(null);
//   const [mealType, setMealType] = useState<number | null>(null);
//   const [music, setMusic] = useState<number | null>(null);
//   const [ingredients, setIngredients] = useState<number[]>([]);
//   const [hasSpotifyAccessToken, setHasSpotifyAccessToken] = useState(false);

//   // Check Spotify access token on mount
//   useEffect(() => {
//     const checkAccessToken = async () => {
//       const response = await fetch("/api/spotify/token");
//       setHasSpotifyAccessToken(response.ok);
//     };
//     checkAccessToken();
//   }, []);

//   const handleCreateBite = async () => {
//     // Perform database operations here
//     // Prepare the data
//     const data = {
//       mood,
//       mealType,
//       ingredients,
//       music
//     };

//     // Send data to an API route
//     const response = await fetch("/api/create-bite", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     // Handle the result (e.g., navigate to a new page, display the recipe)
//     // For example, navigate to /get-started/create-bite with the result
//   };

//   const isReadyToCreateBite =
//     mood !== null && mealType !== null && hasSpotifyAccessToken;

//   return (
//     <>
//       <MoodSelectorForm onMoodSelect={setMood} />
//       <MealSelectorForm onMealSelect={setMealType} />
//       <IngredientsSelectorForm onIngredientsSelect={setIngredients} />
//       <MusicSelectorForm onMusicSelect={setMusic} />

//       <Button
//         className="mt-4"
//         onClick={handleCreateBite}
//         disabled={!isReadyToCreateBite}
//       >
//         Ready to create your Bite?
//       </Button>
//     </>
//   );
// }
