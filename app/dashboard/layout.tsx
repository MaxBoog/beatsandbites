import { Separator } from "@/components/ui/separator";
import { SidebarDemo } from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="max-w-7xl px-4 md:px-8 flex my-4 mx-auto">
        <SidebarDemo />
        {children}
      </section>
      <Separator />
      <Footer />
    </>
  );
}
