import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <section className="categories">
      <div className="container">
        <Skeleton className="w-full h-12"></Skeleton>
        <Skeleton className="h-40"></Skeleton>
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton className="h-12 rounded-full" key={index}></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
