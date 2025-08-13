import type { Metadata } from "next";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Home | Alien E-commerce",
  description:
    "Shop the best deals on fashion, electronics, home essentials, beauty products, and more at [Your Store Name]. Enjoy secure online shopping, fast delivery, and unbeatable prices — all in one place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
