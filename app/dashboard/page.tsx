import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  const supabase = createClient();

  // Fetch the count of saved recipes for the user
  const { data, error, count } = await supabase
    .from("saved_recipes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching saved recipes count:", error);
    throw new Error("Failed to load your saved recipes.");
  }

  return (
    <>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <h2>
            Hi, {user.given_name} {user.family_name}! Welcome to your personal
            dashboard
          </h2>
          <Separator />

          <p className="text-lg">
            You have created <strong>{count}</strong> Bite
            {count !== 1 ? "s" : ""}.
          </p>
          <Link href="/dashboard/my-bites">
            <Button className="mt-4">Go to My Bites</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
