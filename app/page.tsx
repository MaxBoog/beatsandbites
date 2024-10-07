import Image from "next/image";
import FeaturesSectionDemo from "../components/blocks/features-section-demo-3";
import { Music, Music4Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Page() {
  return (
    <main className="w-full h-screen mx-auto">
      <div className="relative z-20 py-10 lg:pt-40 max-w-7xl mx-auto flex justify-center items-center">
        <div className="px-8">
          {/* <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
              Welcome to
            </h4> */}
          <Music4Icon className="mx-auto" width={100} height={100} />

          <h1 className="text-7xl text-center">Beats &amp; Bites</h1>
          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            an innovative web application that pairs the joy of cooking with the
            rhythm of music.
          </p>
          <Link href={"/get-started"}>
            <Button className="text-center mx-auto flex" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <FeaturesSectionDemo />
    </main>

    // {/* TO DO
    //     Add some page sections from tailwind ui: https://tailwindui.com/components
    // */}
  );
}
