import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeletonSingle() {
  return (
    <div className="grid grid-rows-1 grid-flow-col w-full h-full">
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
