"use client";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

// helpers
function trackProductClick(product: Product) {
  const clickHistory: Product[] =
    JSON.parse(localStorage.getItem("clicks") as string) || [];

  const updatedHistory = [...clickHistory, product].slice(-20);

  localStorage.setItem("clicks", JSON.stringify(updatedHistory));
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={() => trackProductClick(product)}
      className="group"
    >
      <Card className="h-full py-0 border-0 shadow-[0_2px_6px_0_rgba(37,39,41,0.04)] group-hover:shadow-[0_13px_14px_0_rgba(37,39,41,0.04)] group-hover:scale-[1.05] group-hover:-translate-y-2 rounded-2xl transition-all duration-[0.4s]">
        <CardContent className="border-0 p-0 m-0 shadow-none bg-gray-100 rounded-tl-2xl rounded-tr-2xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt=""
            width={720}
            height={720}
            className="group-hover:scale-[1.05] duration-[0.4s] transition-transform"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-start gap-5 pb-5">
          <span className="category text-secondary capitalize">
            {product.category.replace("-", " ")}
          </span>
          <div>
            <h3 className="product-title font-bold">{product.title}</h3>
            <div className="price flex items-center gap-1">
              <span className="text-gray-800">
                $
                {product.discountPercentage
                  ? (
                      product.price *
                      (product.discountPercentage / 100)
                    ).toFixed(2)
                  : product.price.toFixed(2)}
              </span>
              {product.discountPercentage && (
                <span className="line-through text-gray-500">
                  ${product.price}
                </span>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
