import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

const BASE_TITLE = "Alien E-commerce";

export function buildCategoriesIndexMeta(): Metadata {
  const title = `Categories | ${BASE_TITLE}`;
  const description =
    "Browse all product categories at Alien E-commerce to quickly jump into the collections you care about.";

  const canonical = `${SITE_URL}/categories`;

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
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: BASE_TITLE,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type CatLike = { name: string } | string;

export function categoriesIndexJsonLd(categories: CatLike[]) {
  const list = categories.map((c) =>
    typeof c === "string" ? { name: c } : { name: c.name }
  );

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/categories` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Categories | Alien E-commerce",
      url: `${SITE_URL}/categories`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: list.length,
        itemListElement: list.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}/categories/${encodeURIComponent(c.name)}`,
        })),
      },
    },
  ];
}
