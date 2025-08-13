"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductImagesCarousel({
  images,
  index,
}: {
  images: string[];
  index: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(Number(index));

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    api.scrollTo(Number(index));
  }, [api, index]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="main-image relative z-0 col-span-7">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              alt=""
              src={images[Number(index)]}
              width={720}
              height={720}
              className="relative z-10 hover:scale-[1.1] transition-transform duration-[0.4s] cursor-pointer"
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-0 rounded-none shadow-none [&_svg]:bg-secondary [&_svg]:text-secondary-foreground [&_svg]:rounded-full [&_svg]:size-10 [&_svg]:p-2">
        <DialogHeader>
          <DialogTitle hidden></DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <div>
          <Carousel setApi={setApi}>
            <CarouselContent className="max-h-full">
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image src={img} alt="" width={720} height={720} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={"secondary"} className="left-0" />
            <CarouselNext variant={"secondary"} className="right-0" />
          </Carousel>
          <div className={"center"}>
            {images.map((img, index) => (
              <div
                className={`border border-transparent rounded-2xl ${
                  Number(index + 1) == current &&
                  "border !border-secondary transition-all duration-[0.4s] rounded-2xl"
                }`}
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                }}
              >
                <Image
                  src={img}
                  alt=""
                  width={720}
                  height={720}
                  className="size-20"
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
