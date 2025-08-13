import ProductCard from "@/components/general/product-card";
import { getProducts } from "@/lib/data";
import { Product } from "@/types";

export const ProductsGrid = async ({ skip }: { skip: string }) => {
  const products = (await getProducts({ skip })).data.products as Product[];
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
