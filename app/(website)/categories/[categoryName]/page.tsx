import { CustomBreadcrumb } from "@/components/general/custom-breadcrumb";
import ProductCard from "@/components/general/product-card";
import { SITE_URL } from "@/lib/constants";
import { getCategories, getProductsByCategory } from "@/lib/data";
import { buildCategoryMeta } from "@/lib/seo/category";
import { Category, Product } from "@/types";
import { Metadata } from "next";
import { BsEmojiDizzy } from "react-icons/bs";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = (await getCategories()).data as Category[];

  return categories.map((c) => ({ categoryName: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}): Promise<Metadata> {
  const slug = (await params).categoryName;
  const { title, description, canonical } = buildCategoryMeta({
    siteUrl: SITE_URL,
    categorySlug: slug,
    categoryTitle: slug,
  });
  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Alien E-commerce",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const categoryName = (await params).categoryName;
  const products: Product[] = (await getProductsByCategory(categoryName)).data
    .products;

  return (
    <div className="container">
      <CustomBreadcrumb />
      <h1 className="bg-gray-100 capitalize my-5 text-2xl md:text-4xl center rounded-2xl min-h-[30vh]">
        {categoryName}
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
  );
}
