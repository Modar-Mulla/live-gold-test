import type { Metadata } from "next";
import type { Product } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL

export function buildProductMeta(product: Product): Metadata {
  const title = `${product.title} | Alien E-commerce`;
  const description =
    product.description?.slice(0, 160) ||
    `Buy ${product.title} at Alien E-commerce.`;

  const url = `${SITE_URL}/products/${encodeURIComponent(String(product.id))}`;
  const images = (product.images ?? []).slice(0, 4);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Alien E-commerce",
      title,
      description,
      images: images.map((src) => ({ url: src })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function productJsonLd(product: Product) {
  const url = `${SITE_URL}/products/${encodeURIComponent(String(product.id))}`;
  const images = (product.images ?? []).slice(0, 8);

  let aggregateRating = undefined;
  const reviews = (product).reviews as Array<{ rating: number }> | undefined;
  if (Array.isArray(reviews) && reviews.length > 0) {
    const sum = reviews.reduce((acc, r) => acc + (r?.rating || 0), 0);
    const avg = Number((sum / reviews.length).toFixed(2));
    aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(avg),
      reviewCount: String(reviews.length),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images,
    sku: (product).sku || undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category,
    url,
    aggregateRating,
  };
}
