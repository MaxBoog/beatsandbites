import SavedRecipes from "@/app/components/SavedRecipes";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("/api/auth/creation/route.ts: Something went wrong...");
  }
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>My Bites</h2>
        <Separator />
        <SavedRecipes user={user} />
      </div>
    </div>
  );
}
