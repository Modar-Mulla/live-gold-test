import type { Product } from "@/types";

export function categoryJsonLd(params: {
  siteUrl: string;
  categorySlug: string;
  categoryTitle: string;
  products: Product[];
}) {
  const { siteUrl, categorySlug, categoryTitle, products } = params;
  const categoryUrl = `${siteUrl}/categories/${encodeURIComponent(categorySlug)}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${siteUrl}/categories` },
      { "@type": "ListItem", position: 3, name: categoryTitle, item: categoryUrl },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryTitle} | Alien E-commerce`,
    url: categoryUrl,
    isPartOf: { "@type": "WebSite", name: "Alien E-commerce", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 24).map((p, idx: number) => {
        const title = p.title;
        const image = p.thumbnail;
        const brand = p.brand ? { "@type": "Brand", name: p.brand } : undefined;
        const url = `${siteUrl}/products/${p.id}`;

        return {
          "@type": "ListItem",
          position: idx + 1,
          url,
          item: {
            "@type": "Product",
            name: title,
            image: image ? [image] : undefined,
            brand,
            sku: p.sku || undefined,
          },
        };
      }),
    },
  };

  return [breadcrumb, itemList];
}

export function buildCategoryMeta({
  siteUrl,
  categorySlug,
  categoryTitle,
}: {
  siteUrl: string;
  categorySlug: string;
  categoryTitle: string;
}) {
  const canonical = `${siteUrl}/categories/${encodeURIComponent(categorySlug)}`;
  const title = `${categoryTitle} | Alien E-commerce`;
  const description = `Shop ${categoryTitle} at Alien E-commerce — curated picks with fast delivery and secure checkout.`;
  return { title, description, canonical };
}
