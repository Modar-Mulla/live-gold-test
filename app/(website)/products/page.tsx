import { CustomBreadcrumb } from "@/components/general/custom-breadcrumb";
import Pagination from "@/components/general/pagination";
import { Metadata } from "next";
import { parsePaging } from "@/lib/paging";
import { buildProductsMeta } from "@/lib/seo/products";
import { ProductsGrid } from "@/components/products/products-grid";
import { getProducts } from "@/lib/data";



type SearchParams = { page?: string; limit?: string; skip?: string };

export async function generateStaticParams() {
  const { data } = await getProducts({ limit: "0" });
  const total: number = data?.total;
  const totalPages = Math.max(1, Math.ceil(total / 30));

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { limit, page, skip } = await searchParams;
  const { currentPage } = parsePaging({ page, limit, skip });
  return buildProductsMeta(currentPage);
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page: string; skip: string }>;
}) {
  const page = ((await searchParams)?.page as string) || "1";
  const skip = ((await searchParams)?.skip as string) || "0";
  return (
    <section className="products">
      <div className="container">
        <CustomBreadcrumb />
        <h1 className="bg-gray-100 my-5 text-4xl center rounded-2xl min-h-[30vh]">
          Products
        </h1>
        <div className="py-10">
          <ProductsGrid skip={skip} />
          <Pagination currentPage={parseInt(page)} totalPages={7} limit={30} />
        </div>
      </div>
    </section>
  );
}
