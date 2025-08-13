import { Headphones, Laptop2, LucideSmartphone, Tablet } from "lucide-react";
import Link from "next/link";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import { Button } from "../ui/button";

export default function CategoriesMenu() {
  const LINKS = [
    {
      label: "laptops",
      href: "/categories/laptops",
      icon: <Laptop2 className="text-secondary" />,
    },
    {
      label: "Smartphones",
      href: "/categories/smartphones",
      icon: <LucideSmartphone className="text-secondary" />,
    },
    {
      label: "Mobile Accessories",
      href: "/categories/mobile-accessories",
      icon: <Headphones className="text-secondary" />,
    },
    {
      label: "Tablets",
      href: "/categories/tablets",
      icon: <Tablet className="text-secondary" />,
    },
  ];

  return (
    <aside className="categories md:sticky md:top-0 flex flex-col justify-between p-5 col-span-full border border-gray-200 rounded-lg">
      <ul>
        <li className="w-full border-b border-gray-200">
          <h1 className="flex items-center gap-1 font-bold text-lg py-5">
            <AiOutlineUnorderedList className="text-secondary size-5" />{" "}
            Categories
          </h1>
        </li>
        {LINKS.map((link, index) => (
          <li
            key={index}
            className="text-primary hover:text-secondary border-b border-gray-300 transition-colors duration-[0.4s]"
          >
            <Link
              href={link.href}
              className=" py-5 w-full flex items-center justify-between relative group"
            >
              <span className="flex items-center gap-1">
                {link.icon} {link.label}
              </span>{" "}
              <RiArrowRightSLine className="group-hover:translate-x-1 transition-transform duration-[0.4s]" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/products"}>
        <Button
          variant={"secondary"}
          className="all-products-btn mt-5 large-button h-12 rounded-full w-full hover:-translate-y-1 duration-[0.4s]"
        >
          All products
        </Button>
      </Link>
    </aside>
  );
}
