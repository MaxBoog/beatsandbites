// "use client";

// import { useState, useEffect } from "react";
// import { MoodSelectorForm } from "./MoodSelectorForm";
// import MealSelectorForm from "./MealSelectorForm";
// import { useContext } from "react";
// import { FormContext } from "../../context/FormContext";
// import { useRouter } from "next/navigation";
// import IngredientsSelectorForm from "./IngredientsSelectorForm";
// import ConnectSpotifyButton from "../../components/ConnectSpotifyButton";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import MusicSelectorForm from "./MusicSelectorForm";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// export default function GetStartedForm() {
//   const router = useRouter();
//   const formContext = useContext(FormContext);
//   const [isLoading, setIsLoading] = useState(false);

//   if (!formContext) {
//     // Handle the case where context is not available
//     return null;
//   }

//   const {
//     mood,
//     mealType,
//     music,
//     ingredients,
//     setMood,
//     setMealType,
//     setMusic,
//     setIngredients,
//   } = formContext;

//   const handleCreateBite = async () => {
//     // Perform database operations here
//     // Prepare the data
//     setIsLoading(true);
//     toast.info("Creating your Bite...", {
//       description: "We are fetching a delicious recipe for you!",
//     });
//     const data = {
//       mood,
//       mealType,
//       ingredients,
//       music,
//     };

//     router.push("/recipe");
//     setIsLoading(false); // Stop loading
//   };

//   const isReadyToCreateBite =
//     mood !== null && mealType !== null && music !== null;

//   return (
//     <>
//       <ConnectSpotifyButton />
//       <MoodSelectorForm onMoodSelect={setMood} />
//       <MealSelectorForm onMealSelect={setMealType} />
//       {/* <IngredientsSelectorForm onIngredientsSelect={setIngredients} /> */}
//       <MusicSelectorForm onMusicSelect={setMusic} />

//       <div className="col-span-8">
//         <p className="block">
//           {isReadyToCreateBite
//             ? "Ready to create your Bite?"
//             : "Please fill out all the required steps before creating your Bite"}
//         </p>
//       </div>
//       <div className="col-span-8">
//         <Button
//           className={cn(
//             !isReadyToCreateBite || isLoading
//               ? "cursor-not-allowed opacity-50"
//               : "",
//             ""
//           )}
//           onClick={handleCreateBite}
//           disabled={!isReadyToCreateBite || isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             "Create my Bite!"
//           )}
//         </Button>
//       </div>
//     </>
//   );
// }

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
    recipe,
    setMood,
    setMealType,
    setMusic,
    setIngredients,
    setRecipe,
    setSimilarRecipes,
  } = formContext;

  const handleCreateBite = async () => {
    // Perform database operations here
    // Prepare the data
    setIsLoading(true);
    toast.info("Creating your Bite...", {
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
      console.log("getstaredform: ", result);
      if (response.ok) {
        // Store the recipe data or handle it as needed
        setRecipe(result.recipe);
        setSimilarRecipes(result.similarRecipes);
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
      <ConnectSpotifyButton />
      <MoodSelectorForm onMoodSelect={setMood} />
      <MealSelectorForm onMealSelect={setMealType} />
      {/* <IngredientsSelectorForm onIngredientsSelect={setIngredients} /> */}
      <MusicSelectorForm onMusicSelect={setMusic} />

      <div className="col-span-12 sm:col-span-8">
        <p className="block">
          {isReadyToCreateBite
            ? "Ready to create your Bite?"
            : "Please fill out all the required steps before creating your Bite"}
        </p>
      </div>
      <div className="col-span-12 sm:col-span-8">
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
