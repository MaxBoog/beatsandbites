// import { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "@/lib/supabaseClient";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { mood, mealType, ingredients, music } = req.body;

//   // Validate the inputs
//   if (mood === null || mealType === null || music === null) {
//     return res.status(400).json({ error: "Invalid input" });
//   }

//   type moodFilterTypes = {};
//   // Map mood and mealType indices to actual values if needed
//   // For example, you can define arrays mapping indices to strings
//   const moodFilters: moodFilterTypes = {
//     0: {
//       // Lazy
//       maxPrepTime: 15,
//       maxIngredients: 4,
//     },
//     // ... rest of the moods
//   };

//   const mealTypes = {
//     0: "Breakfast",
//     1: "Lunch",
//     2: "Dinner",
//   };

//   const filters = moodFilters[mood];

//   let query = supabase.from("recipes").select("*");

//   if (filters.maxPrepTime) {
//     query = query.lte("totalPrepTime", filters.maxPrepTime);
//   }

//   if (filters.maxIngredients) {
//     query = query.lte("ingredientCount", filters.maxIngredients);
//   }

//   // Filter by meal type
//   query = query.eq("mealType", mealTypes[mealType]);

//   // Filter by ingredients if provided
//   if (ingredients && ingredients.length > 0) {
//     // Assuming you have a way to match recipes containing certain ingredients
//     // For example, you might have a table linking recipes and ingredients
//     // Implement the necessary logic to filter recipes by ingredients
//   }

//   const { data: recipes, error } = await query;

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   // Return the recipes to the client
//   return res.status(200).json({ recipes });
// }

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("/api/get-recipe/route.ts: Something went wrong...");
  }

  const supabase = createClient();

  const { data: User, error } = await supabase
    .from("Recipes")
    .select()
    .eq("kinde_id", user.id);

  // Handle possible error from Supabase
  if (error) {
    console.error("Error fetching user:", error);
    throw new Error(`Database error while fetching user: ${error.message}`);
  }
  //   console.log(User);

  if (!User || User.length === 0) {
    const { data, error: insertError } = await supabase
      .from("User")
      .insert([
        {
          kinde_id: user.id,
          first_name: user.given_name ?? "",
          last_name: user.family_name ?? "",
          email: user.email ?? "",
        },
      ])
      .select();
    if (insertError) {
      console.error("Error fetching user:", insertError);
      throw new Error("Database error while fetching user.");
    }
  }
  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : // TODO
        "https://beatsandbites.vercel.app/"
  );
}
