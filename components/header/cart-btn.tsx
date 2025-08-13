"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCartStore, useRemoveItem } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BsBag } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
export default function CartBtn() {
  const items = useCartStore((state) => state.items);
  const removeItem = useRemoveItem();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex bg-transparent hover:bg-transparent hover:opacity-80 duration-[0.4s]">
          <span className="items-count center size-6 bg-secondary text-secondary-foreground rounded-full">
            {items.length || 0}
          </span>
          <BsBag className="text-secondary-foreground size-5 md:size-10" />
          <p className="hidden md:block">Your Cart</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold border-b pb-5">
            Your Cart
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {items.length === 0 ? (
          <div className="min-h-[50vh] flex gap-10 justify-center items-center flex-col">
            <p className="text-lg text-gray-400">No items found</p>
            <Link href={"/products"}>
              <Button size={"lg"} className="h-14 bg-secondary rounded-full">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      width={1080}
                      height={1080}
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="w-full h-full object-cover size-12"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-sm font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
