import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const roboto = Roboto({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
