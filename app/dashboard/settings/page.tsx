import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Settings</h2>
        <Separator />

        <form>
          <CardHeader>
            <CardTitle>Settings</CardTitle>

            <CardDescription>
              Here you will find settings regarding your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>First Name</Label>
              <input className="rounded-lg" name="firstName" type="text" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Last Name</Label>
              <input className="rounded-lg" name="lastName" type="text" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <input
                className="rounded-lg"
                name="email"
                type="email"
                disabled
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update settings</Button>
          </CardFooter>
        </form>
      </div>
    </div>
  );
}
