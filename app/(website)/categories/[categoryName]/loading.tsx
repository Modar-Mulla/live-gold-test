import ProductCardSkeleton from "@/components/general/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="products">
      <div className="container">
        <Skeleton className="w-full h-40"></Skeleton>
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {Array.from({ length: 6 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
