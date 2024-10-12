import { Music4Icon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto flex items-start justify-between px-4 md:px-8 py-7  bg-white dark:bg-background ">
      <div className="col">
        <Music4Icon className="mx-auto" width={40} height={40} />
        Beats <span className="text-indigo-600">&amp;</span> Bites
      </div>
      <div className="col">
        <ul>
          <li className="text-gray-800 dark:text-gray-200 hover:text-gray-600">
            <Link href="/">Home</Link>
          </li>
          <li className="text-gray-800 dark:text-gray-200 hover:text-gray-600">
            <Link href="/">Get Started</Link>
          </li>
          <li className="text-gray-800 dark:text-gray-200 hover:text-gray-600">
            <Link href="/">Dashboard</Link>
          </li>
          <li className="text-gray-800 dark:text-gray-200 hover:text-gray-600">
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
