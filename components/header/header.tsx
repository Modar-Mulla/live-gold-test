"use client";
import {
  BsTelephone,
  BsEnvelope,
  BsInstagram,
  BsLinkedin,
  BsHeadphones,
  BsTablet,
} from "react-icons/bs";
import {
  RiAliensLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { Separator } from "../ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Laptop, User2 } from "lucide-react";

import Searchbar from "./searchbar";
import CartBtn from "./cart-btn";
import { Button } from "../ui/button";
import { getAuth } from "@/lib/get-auth";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchAuth = async () => {
      const res = await getAuth();
      if (res.success) {
        setIsAuth(true);
        setLoading(false);
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };
    fetchAuth();
  }, []);
  return (
    <>
      <div className="bg-background-dark/90 text-foreground-dark">
        <div className="container h-10 hidden md:flex justify-between items-center">
          <div className="left-side py-2 flex justify-center items-stretch h-full gap-5">
            <p className="phone-contact center gap-2 text-sm">
              <a href="tel:+963952479306" className="center gap-1">
                <BsTelephone />
                Support: +963952479306
              </a>
            </p>
            <Separator orientation="vertical" className="" />
            <p className="email-contact center text-sm">
              <a
                href="mailto:moddar8moulla@gmail.com"
                className="flex items-center gap-1"
              >
                <BsEnvelope />
                Email us: moddar8moulla@gmail.com{" "}
              </a>
            </p>
          </div>
          <div className="right-side center">
            <ul className="social-links flex items-center justify-center gap-2">
              <li>
                <a href="https://www.instagram.com/modah_dev/">
                  <BsInstagram />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/moddar-moulla-b38194214/">
                  <BsLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="navbar bg-background-dark">
        <div className="container pb-5 md:pb-0">
          <div className="nav-header min-h-[15vh] flex items-center justify-between gap-5">
            <div className="logo w-1/2 md:w-1/3 flex items-center">
              <Link href={"/"} className="flex items-center">
                <RiAliensLine className="text-6xl text-secondary" />{" "}
                <span className="text-xl md:text-2xl font-bold text-foreground-dark">
                  Alien
                </span>
              </Link>
            </div>
            <div className="hidden md:block w-full md:w-2/3">
              <Searchbar />
            </div>
            {loading ? (
              <div className="center w-1/2 md:w-1/3">
                <Skeleton className="w-40 h-10" />
              </div>
            ) : (
              <div className="cart-navBtn-wrapper w-1/2 md:w-1/3 flex items-center justify-end">
                {isAuth && (
                  <Link
                    href={"/profile"}
                    className="center size-10 bg-secondary text-secondary-foreground rounded-full"
                  >
                    <User2 />
                  </Link>
                )}
                {!isAuth && (
                  <Link href={"/login"}>
                    <Button
                      size={"sm"}
                      className="rounded-full"
                      variant={"secondary"}
                    >
                      Login
                    </Button>
                  </Link>
                )}

                <CartBtn />
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger className="center text-secondary-foreground cursor-pointer md:hidden bg-secondary p-0 rounded-full size-10 hover:opacity-80 hover:bg-secondary duration-[0.4s] transition-opacity">
                    <GiHamburgerMenu />
                  </SheetTrigger>
                  <SheetContent className="bg-background-dark border-0">
                    <SheetHeader>
                      <SheetTitle hidden></SheetTitle>
                      <SheetDescription hidden></SheetDescription>
                    </SheetHeader>
                    <div>
                      <ul className="relative p-5 flex flex-col md:flex-row items-start justify-center gap-5">
                        <li
                          onClick={() => setOpen(false)}
                          className="m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s]"
                        >
                          <Link href="/">Home</Link>
                        </li>
                        <li
                          onClick={() => setOpen(false)}
                          className="m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s]"
                        >
                          <Link href="/products">Products</Link>
                        </li>
                        <li
                          onClick={() => setOpen(false)}
                          className="catgs-drop-btn w-full m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s] group"
                        >
                          <div className="flex flex-col group">
                            <Link
                              href={"/categories"}
                              className="flex items-center"
                            >
                              Categories{" "}
                              <RiArrowDownSLine className=" transition-transform duration-[0.4s]" />
                            </Link>
                            <div className="catgs-menu py-5 w-full">
                              <div className="">
                                <div className="col">
                                  <ul
                                    onClick={() => setOpen(false)}
                                    className="by-catgs !text-foreground-dark"
                                  >
                                    <li>
                                      <Link
                                        href="/categories/laptops"
                                        className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                                      >
                                        <div className="catg-name text-sm flex items-center gap-2">
                                          <Laptop className="size-5" />{" "}
                                          <span className="">Laptops</span>
                                        </div>
                                        <RiArrowRightSLine />
                                      </Link>
                                    </li>

                                    <li>
                                      <Link
                                        href="/categories/smartphones"
                                        className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                                      >
                                        <div className="catg-name text-sm flex items-center gap-2">
                                          <RiSmartphoneLine className="size-5" />{" "}
                                          <span className="">Smartphones</span>
                                        </div>
                                        <RiArrowRightSLine />
                                      </Link>
                                    </li>

                                    <li>
                                      <Link
                                        href="/categories/mobile-accessories"
                                        className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                                      >
                                        <div className="catg-name text-sm flex items-center gap-2">
                                          <BsHeadphones className="size-5" />{" "}
                                          <span className="">
                                            Mobile Accessories
                                          </span>
                                        </div>
                                        <RiArrowRightSLine />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        href="/categories/tablets"
                                        className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                                      >
                                        <div className="catg-name text-sm flex items-center gap-2">
                                          <BsTablet className="size-5" />{" "}
                                          <span className="">Tablets</span>
                                        </div>
                                        <RiArrowRightSLine />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>

          <div className="search-bar md:hidden">
            <Searchbar />
          </div>
        </div>
        <div className="nav-links w-full bg-background-dark absolute md:relative z-10 -top-full md:top-0 py-10 md:py-0 duration-[0.5s]">
          <ul className="relative py-5 flex flex-col md:flex-row items-start justify-center">
            <li className="m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s]">
              <Link href="/">Home</Link>
            </li>
            <li className="m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s]">
              <Link href="/products">Products</Link>
            </li>
            <li className="catgs-drop-btn m-0 md:mx-4 cursor-pointer text-foreground-dark hover:text-secondary transition duration-[0.4s] group">
              <Link href="/categories" className="flex items-center group">
                Categories{" "}
                <RiArrowDownSLine className="group-hover:-rotate-180 transition-transform duration-[0.4s]" />
              </Link>
              <div className="catgs-menu w-fit py-10 absolute !z-[60] bg-background-dark visible scale-[0] left-1/2 -translate-x-1/2 group-hover:scale-100 top-[80%] opacity-0 group-hover:opacity-100 transition-all duration-[0.5s]">
                <div className="w-[400px] px-4">
                  <div className="col">
                    <ul className="by-catgs !text-foreground-dark">
                      <li>
                        <Link
                          href="/categories/laptops"
                          className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                        >
                          <div className="catg-name text-sm flex items-center gap-2">
                            <Laptop className="size-5" />{" "}
                            <span className="">Laptops</span>
                          </div>
                          <RiArrowRightSLine />
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/categories/smartphones"
                          className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                        >
                          <div className="catg-name text-sm flex items-center gap-2">
                            <RiSmartphoneLine className="size-5" />{" "}
                            <span className="">Smartphones</span>
                          </div>
                          <RiArrowRightSLine />
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/categories/mobile-accessories"
                          className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                        >
                          <div className="catg-name text-sm flex items-center gap-2">
                            <BsHeadphones className="size-5" />{" "}
                            <span className="">Mobile Accessories</span>
                          </div>
                          <RiArrowRightSLine />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/categories/tablets"
                          className="flex justify-between items-center py-4 border-b hover:text-secondary transition-colors duration-[0.4s]"
                        >
                          <div className="catg-name text-sm flex items-center gap-2">
                            <BsTablet className="size-5" />{" "}
                            <span className="">Tablets</span>
                          </div>
                          <RiArrowRightSLine />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
