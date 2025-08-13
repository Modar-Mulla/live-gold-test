import { CustomBreadcrumb } from "@/components/general/custom-breadcrumb";
import { getCategories } from "@/lib/data";
import { buildCategoriesIndexMeta } from "@/lib/seo/categories";
import { Category } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { BsEmojiDizzy } from "react-icons/bs";

export const metadata: Metadata = buildCategoriesIndexMeta();

export default async function page() {
  const categories = (await getCategories()).data as Category[];

  return (
    <section className="categories">
      <div className="container">
        <CustomBreadcrumb />
        <h1 className="bg-gray-100 capitalize my-5 text-2xl md:text-4xl center rounded-2xl min-h-[30vh]">
          Categories
        </h1>
        <div className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
            {categories.length == 0 ? (
              <div className="space-y-5 text-2xl text-secondary col-span-full flex flex-col justify-center items-center">
                <BsEmojiDizzy className="size-20" />
                <p>No Categories.</p>
              </div>
            ) : (
              categories.map((c) => (
                <Link
                  className="center w-full py-10 rounded-full bg-secondary text-secondary-foreground"
                  key={c.name}
                  href={`/categories/${c.name}`}
                >
                  {c.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
