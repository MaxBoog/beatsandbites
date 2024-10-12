import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

interface Recipe {
  RecipeId: number;
  Name: string;
  CookTime: number;
  PrepTime: number;
  TotalTime: number;
  Description: string;
  RecipeCategory: string;
  KeyWords: string;
  RecipeIngredientQuantities: string;
  RecipeIngredientParts: string;
  AggregatedRating: number;
  ReviewCount: number;
  Calories: number;
  RecipeServings: number;
  RecipeInstructions: string;
  recommended_indices: number[]; // Ensure this is an array of numbers
  row_index: number;
}

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { mood, mealType, ingredients } = body;

  if (mood === null || mealType === null) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Map mood indices to filter criteria
  const moodFilters: { [key: number]: any } = {
    0: { maxPrepTime: 15, maxIngredients: 4 }, // Lazy
    1: { minPrepTime: 15, maxPrepTime: 30 }, // Moderate
    2: { minPrepTime: 30, maxPrepTime: 60 }, // Adventurous
    3: { minPrepTime: 60, maxPrepTime: 120 }, // Chef-like
  };

  const filters = moodFilters[mood];

  // Map mealType indices to meal types
  // const mealTypes: { [key: number]: string } = {
  //   0: "Breakfast",
  //   1: "Lunch",
  //   2: "Dinner",
  // };

  // const mealTypeValue = mealTypes[mealType];

  // Build the query to fetch recipes matching the criteria
  let query = supabase.from("Recipes").select("*");

  // Apply mood filters
  if (filters.minPrepTime) {
    query = query.gte("TotalTime", filters.minPrepTime);
  }
  if (filters.maxPrepTime) {
    query = query.lte("TotalTime", filters.maxPrepTime);
  }
  // if (filters.maxIngredients) {
  //   query = query.lte("ingredientCount", filters.maxIngredients);
  // }

  // Apply meal type filter
  // query = query.eq("RecipeCategory", mealTypeValue);

  // Apply ingredient filters if any
  // if (ingredients && ingredients.length > 0) {
  //   // Assuming you have a `recipe_ingredients` table that links recipes and ingredients
  //   const { data: recipeIds, error: ingredientsError } = await supabase
  //     .from("Recipes")
  //     .select("RecipeIng")
  //     .in("IngredientId", ingredients);

  //   if (ingredientsError) {
  //     console.error("Error fetching recipe ingredients:", ingredientsError);
  //     return NextResponse.json(
  //       { error: ingredientsError.message },
  //       { status: 500 }
  //     );
  //   }

  // const recipeIdList = recipeIds?.map((item) => item.RecipeId);

  // if (recipeIdList && recipeIdList.length > 0) {
  //   query = query.in("RecipeId", recipeIdList);
  // } else {
  //   return NextResponse.json(
  //     { error: "No recipes found with the selected ingredients." },
  //     { status: 404 }
  //   );
  // }
  // }

  // console.log(query);
  // Execute the query
  const { data: recipes, error } = await query;

  if (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // console.log(recipes);

  if (!recipes || recipes.length === 0) {
    return NextResponse.json(
      { error: "No recipes found matching the criteria." },
      { status: 404 }
    );
  }

  // Select a random recipe from the matching recipes
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const selectedRecipe = recipes[randomIndex];

  // Fetch similar recipes based on recommended_indices
  let similarRecipes = [];
  if (
    selectedRecipe.recommended_indices &&
    selectedRecipe.recommended_indices.length > 0
  ) {
    // Parse recommended_indices if it's a string
    if (typeof selectedRecipe.recommended_indices === "string") {
      selectedRecipe.recommended_indices = JSON.parse(
        selectedRecipe.recommended_indices
      );
    }

    const { data: similarData, error: similarError } = await supabase
      .from("Recipes")
      .select("*")
      .in("row_index", selectedRecipe.recommended_indices);

    if (similarError) {
      console.error("Error fetching similar recipes:", similarError);
    } else {
      similarRecipes = similarData || [];
    }
  }

  // Return the selected recipe and similar recipes
  return NextResponse.json({
    recipe: selectedRecipe,
    similarRecipes,
  });
}

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse } from "next/server";
// import { unstable_noStore as noStore } from "next/cache";
// import { createClient } from "@/app/utils/supabase/server";

// export async function GET() {
//   noStore();
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || user === null || !user.id) {
//     throw new Error("/api/get-recipe/route.ts: Something went wrong...");
//   }

//   const supabase = createClient();

//   const { data: User, error } = await supabase
//     .from("User")
//     .select()
//     .eq("kinde_id", user.id);

//   // Handle possible error from Supabase
//   if (error) {
//     console.error("Error fetching user:", error);
//     throw new Error(`Database error while fetching user: ${error.message}`);
//   }
//   //   console.log(User);

//   if (!User || User.length === 0) {
//     const { data, error: insertError } = await supabase
//       .from("User")
//       .insert([
//         {
//           kinde_id: user.id,
//           first_name: user.given_name ?? "",
//           last_name: user.family_name ?? "",
//           email: user.email ?? "",
//         },
//       ])
//       .select();
//     if (insertError) {
//       console.error("Error fetching user:", insertError);
//       throw new Error("Database error while fetching user.");
//     }
//   }
//   return NextResponse.redirect(
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000/"
//       : // TODO
//         "https://beatsandbites.vercel.app/"
//   );
// }
