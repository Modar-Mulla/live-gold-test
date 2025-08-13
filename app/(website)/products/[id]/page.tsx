import { CustomBreadcrumb } from "@/components/general/custom-breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductById, getProducts } from "@/lib/data";
import { Product } from "@/types";
import { BsArrowReturnLeft } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import Review from "@/components/general/review";
import ProductImagesCarousel from "@/components/product-page/product-images-carousel";
import AddToCartButton from "@/components/product-page/add-to-cart-btn";
import { Metadata } from "next";
import { buildProductMeta } from "@/lib/seo/product";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await getProducts({ limit: "0" });
  
  if (!res.success)
    throw new Error(`Failed to fetch product IDs: ${res.success}`);
  const data = await res.data;

  const products: Array<{ id: string | number }> = data?.products ?? [];
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const product = (await getProductById(id)).data as Product;
  return buildProductMeta(product);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = (await getProductById(id)).data as Product;

  return (
    <section className="product-page py-10">
      <div className="container">
        <CustomBreadcrumb />
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="images-col col-span-2 grid grid-cols-8">
            <div className="images-col col-span-1">
              {product.images.map((img, index) => (
                <ProductImagesCarousel
                  key={index}
                  index={index.toString()}
                  images={product.images}
                />
              ))}
            </div>
            <ProductImagesCarousel index="0" images={product.images} />
          </div>
          <div className="info-col col-span-1 p-5 border-2 border-gray-100 rounded-2xl">
            <div className="basc-info space-y-2 pb-10 border-b">
              <h2 className="text-2xl">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex flex-col">
                {product.discountPercentage && (
                  <span className="line-through text-gray-600">
                    ${product.price}
                  </span>
                )}
                <span className="text-xl font-bold">
                  $
                  {product.discountPercentage
                    ? (
                        product.price *
                        (product.discountPercentage / 100)
                      ).toFixed(2)
                    : product.price.toFixed(2)}{" "}
                  <span className="text-sm text-secondary font-medium">{`%${product.discountPercentage}`}</span>
                </span>
              </div>
            </div>
            <div className="advanced-info py-5 border-b space-y-5">
              <h3 className="font-semibold text-xl">Product information</h3>
              <div className="space-y-2">
                <div className="row flex justify-between items-center">
                  <span className="font-semibold">Brand:</span>
                  <span className="text-gray-600">{product.brand}</span>
                </div>
                <div className="row flex justify-between items-center">
                  <span className="font-semibold">Category:</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
                <div className="row flex justify-between items-center">
                  <span className="font-semibold">Weight:</span>
                  <span className="text-gray-600">{product.weight}</span>
                </div>
                <div className="row flex justify-between items-center">
                  <span className="font-semibold">Dimensions:</span>
                  <span className="text-gray-600 text-end">
                    {product.dimensions.width} x {product.dimensions.height} x
                    {product.dimensions.depth}
                  </span>
                </div>
              </div>
            </div>
            <div className="quantity-info flex flex-col items-center gap-5 py-5">
              <div className="w-full space-y-2">
                <Label>Qunatity</Label>
                <Input
                  type="number"
                  min={1}
                  className="rounded-full h-12 input-shadow border-gray-300 transition-all duration-[0.4s]"
                />
              </div>

              <AddToCartButton product={product} />
            </div>
            <div className="return-info space-y-4 py-5">
              <div className="flex items-center gap-2">
                <BsArrowReturnLeft className="text-secondary size-5" />{" "}
                <span> {product.returnPolicy}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdLocalShipping className="text-secondary size-5" />{" "}
                <span> {product.shippingInformation}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews space-y-5">
          <h2 className="text-2xl">Reviews</h2>
          {product.reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
