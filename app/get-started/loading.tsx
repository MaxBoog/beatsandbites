import { LoadingSkeletonSingle } from "../components/LoadingSkeletonSingle";

export default function LoadingFile() {
  return (
    <section className="w-full h-64 px-4 md:px-8">
      <LoadingSkeletonSingle />
    </section>
  );
}
