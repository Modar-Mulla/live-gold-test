
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <section className=" py-10">
      <div className="container">
        <Skeleton className="h-20"></Skeleton>
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Skeleton className="h-40"></Skeleton>
          <Skeleton className="h-80"></Skeleton>
        </div>
      </div>
    </section>
  );
}
