import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <div className="container">
        <Skeleton className="w-full h-40"></Skeleton>
      </div>
    </section>
  );
}
