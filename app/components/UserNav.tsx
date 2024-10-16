import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

type Props = {
  user: any;
};

export default function UserNav({ user }: Props) {
  const { family_name, given_name, picture, email } = user;
  console.log(picture);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:rounded-full"
        >
          <Avatar className="h-10 w-10 hover:rounded-full">
            {picture ? (
              <AvatarImage
                className="w-10 h-10 rounded-full hover:rounded-full"
                src={picture}
                alt="User icon"
                width={50}
                height={50}
              />
            ) : (
              <AvatarImage
                className="w-10 h-10 rounded-full hover:rounded-full"
                src={`https://avatar.vercel.sh/${email}`}
              />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 ">
            <p className="text-gray-500">Hi,</p>

            <p className="text-gray-500">
              {given_name} {family_name}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={"/get-started"}>
              Get Started
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="cursor-pointer" href={"/dashboard"}>
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutLink>
              Logout <LogOut className="inline" />
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
