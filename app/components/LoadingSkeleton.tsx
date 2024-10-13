import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 max-w-7xl mx-auto px-8">
      <Skeleton className="h-[1000px] w-full row-span-3" />
      <Skeleton className="h-[350px] w-full col-span-2" />
      <Skeleton className="h-[634px] w-full row-span-2 col-span-2" />
    </div>
  );
}
