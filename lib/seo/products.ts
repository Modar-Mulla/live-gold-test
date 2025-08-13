import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export function buildProductsMeta(pageNum: number): Metadata {
  const baseTitle = "Alien E-commerce";
  const title =
    pageNum > 1 ? `Products (Page ${pageNum}) | ${baseTitle}` : `Products | ${baseTitle}`;

  const description =
    pageNum > 1
      ? `Browse our product catalog — page ${pageNum}. Fashion, electronics, home, beauty and more with secure checkout and fast delivery.`
      : `Browse our product catalog. Fashion, electronics, home, beauty and more with secure checkout and fast delivery.`;

  const canonical = `${SITE_URL}/products${pageNum > 1 ? `?page=${pageNum}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,

      },
    },
    openGraph: { type: "website", url: canonical, siteName: baseTitle, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
