import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // console.log(user);
  return (
    <nav className="max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 py-7  bg-white dark:bg-background">
      <div className="md:col-span-6">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold">
            {/* <Image
              width={40}
              height={40}
              alt=""
              src="/BeatsandBites.png"
              className="inline"
            /> */}
            Beats &amp; Bites
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-2 ms-auto md:col-span-6">
        {user ? (
          <UserNav user={user} />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary">
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}
        <ModeToggle />
        <div className="md:hidden"></div>
      </div>
    </nav>
  );
}
