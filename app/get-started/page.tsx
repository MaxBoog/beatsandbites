import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { MoodSelectorForm } from "./components/MoodSelectorForm";
import MealSelectorForm from "./components/MealSelectorForm";
import IngredientsSelectorForm from "./components/IngredientsSelectorForm";
import ConnectSpotifyButton from "../components/ConnectSpotifyButton";
import GetStartedForm from "./components/GetStartedForm";

export default async function Page() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <section className="max-w-7xl px-4 md:px-8 mx-auto pb-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <h1>How it works!</h1>
          <p>
            Beats & Bites is your go to helper when you are clueless on what to
            cook tonight. Based on your preferences Beats & Bites will create a
            "Bite" for you which is a term coined to represent a created recipe
            with a matching playlist that you can listen to while cooking and
            dining.
          </p>
        </div>

        <div className="col-span-8">
          <Separator orientation="horizontal" />
        </div>

        {/* <Link href={"/get-started/create-bite"}>
          <Button className="mt-4">Ready to create your Bite?</Button>
        </Link> */}
        <GetStartedForm />
      </div>
    </section>
  );
}
