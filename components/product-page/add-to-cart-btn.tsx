"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";

import { useAddItem } from "@/store";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useAddItem();

  const handleClick = () => {
    toast.success("Product Added To Your Cart.", {
      icon: <CircleCheck className="text-green-500" />,
    });
    addItem({ ...product });
  };

  return (
    <Button
      variant="secondary"
      className="w-full h-12 rounded-full"
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
}
