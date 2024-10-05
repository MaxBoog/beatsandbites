import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import SpotifyPlayback from "../components/SpotifyPlayback";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>
          Hi, {user.given_name} {user.family_name}! Welcome to your personal
          dashboard
        </h2>
        <Separator />
        {/* Put stats of
          - number of playlist
          - number of recipes (bites)
        */}
      </div>
    </div>
  );
}
