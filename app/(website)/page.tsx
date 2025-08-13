import ProductCardSkeleton from "@/components/general/product-card-skeleton";

import { Suspense } from "react";
import CategoriesMenu from "@/components/home/categories-menu";
import { ProductsGrid } from "@/components/products/products-grid";
import Pagination from "@/components/general/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string; skip: string }>;
}) {
  const page = ((await searchParams)?.page as string) || "1";
  const skip = ((await searchParams)?.skip as string) || "0";
  return (
    <section className="py-10">
      <div className="container grid grid-cols-12 gap-5">
        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <CategoriesMenu />
        </div>
        <Suspense
          fallback={
            <div className="col-span-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            </div>
          }
        >
          <div className="col-span-full md:col-span-8 lg:col-span-9">
            <ProductsGrid skip={skip} />
            <Pagination
              currentPage={parseInt(page)}
              totalPages={7}
              limit={30}
            />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
