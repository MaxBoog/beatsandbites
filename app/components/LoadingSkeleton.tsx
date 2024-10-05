import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 w-full">
      <Skeleton className="h-[1000px] w-full row-span-3" />
      <Skeleton className="h-[350px] w-full col-span-2" />
      <Skeleton className="h-[634px] w-full row-span-2 col-span-2" />
    </div>
  );
}
