import { SidebarDemo } from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl px-4 md:px-8 flex my-4">
      <SidebarDemo />
      {children}
    </section>
  );
}
