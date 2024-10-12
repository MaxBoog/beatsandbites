import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Nav";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import { FormProvider } from "./context/FormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beats & Bites",
  description:
    "An innovative web application that pairs the joy of cooking with the rhythm of music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-white text-black dark:bg-neutral-900 dark:text-white`}
      >
        <FormProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </FormProvider>
      </body>
    </html>
  );
}
