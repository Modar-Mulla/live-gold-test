import { CustomBreadcrumb } from "@/components/general/custom-breadcrumb";
import ProductCard from "@/components/general/product-card";
import { getProductsByQuery } from "@/lib/data";
import { Product } from "@/types";
import { Metadata } from "next";
import { BsEmojiDizzy } from "react-icons/bs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.alien-ecommerce.com";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}): Promise<Metadata> {
  const query = (await searchParams).query;
  const baseTitle = "Alien E-commerce";
  const title = query
    ? `Search: “${query}” | ${baseTitle}`
    : `Search | ${baseTitle}`;
  const description = query
    ? `Browse search results for “${query}” on ${baseTitle}. Discover deals on fashion, electronics, home essentials, beauty, and more.`
    : `Search products on ${baseTitle}. Find deals on fashion, electronics, home essentials, beauty, and more.`;

  const canonical = query
    ? `${SITE_URL}/search?query=${encodeURIComponent(query)}`
    : `${SITE_URL}/search`;

  const robots: Metadata["robots"] = {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: false,
      follow: true,
    },
  };

  return {
    title,
    description,
    robots,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: baseTitle,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const products: Product[] = (await getProductsByQuery(query)).data.products;

  return (
    <section className="products">
      <div className="container">
        <CustomBreadcrumb />
        <h1 className="bg-gray-100 capitalize my-5 text-4xl center gap-2 rounded-2xl min-h-[30vh]">
          <span>Search results for</span>
          <span className="text-secondary">{query}</span>
        </h1>
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {products.length == 0 ? (
              <div className="space-y-5 text-2xl text-secondary col-span-full flex flex-col justify-center items-center">
                <BsEmojiDizzy className="size-20" />
                <p>No Products.</p>
              </div>
            ) : (
              products.map((product) => (
                <div className="group" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
