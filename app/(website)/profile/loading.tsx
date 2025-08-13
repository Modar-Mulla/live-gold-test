import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <Skeleton className="max-w-4xl h-80 mx-auto"></Skeleton>
    </div>
  );
}
