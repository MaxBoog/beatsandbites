import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("/api/auth/creation/route.ts: Something went wrong...");
  }

  const supabase = createClient();

  const { data: User, error } = await supabase
    .from("User")
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
        "https://snappi-ten.vercel.app/"
  );
}
