import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-r-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>My Bites</h2>
        <Separator />
      </div>
    </div>
  );
}
