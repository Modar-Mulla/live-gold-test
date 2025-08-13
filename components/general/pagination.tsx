"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number; 
  limit?: number; 
  className?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  limit,
  className = "",
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const effectiveLimit = useMemo(() => {
    if (typeof limit === "number" && limit > 0) return limit;
    const fromUrl = parseInt(searchParams.get("limit") ?? "", 10);
    return Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : 24;
  }, [limit, searchParams]);

  const makeHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", String((page - 1) * effectiveLimit));
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const pages = useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`mt-8 flex items-center justify-center gap-1 ${className}`}
      aria-label="Pagination"
    >
      {/* Prev */}
      <Link
        aria-label="Previous page"
        href={currentPage > 1 ? makeHref(currentPage - 1) : "#"}
        aria-disabled={currentPage === 1}
        className={buttonClass(currentPage === 1)}
        prefetch={false}
      >
        <ArrowLeft className="size-5"/>
      </Link>

      {/* Numbers */}
      <ul className="flex items-center gap-1">
        {pages.map((item, idx) =>
          item === "…" ? (
            <li
              key={`dots-${idx}`}
              className="px-2 text-sm opacity-70 select-none"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={makeHref(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={numberClass(item === currentPage)}
                prefetch={false}
              >
                {item}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Next */}
      <Link
        aria-label="Next page"
        href={currentPage < totalPages ? makeHref(currentPage + 1) : "#"}
        aria-disabled={currentPage === totalPages}
        className={buttonClass(currentPage === totalPages)}
        prefetch={false}
      >
        <ArrowRight  className="size-5"/>
      </Link>
    </nav>
  );
}

function getPageItems(current: number, total: number): Array<number | "…"> {
  const window = 1;
  if (total <= 7) return range(1, total);

  const pages = new Set<number>();
  [1, 2, total - 1, total].forEach((p) => pages.add(p));
  for (let p = current - window; p <= current + window; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  for (let i = 0; i < sorted.length; i++) {
    out.push(sorted[i]);
    const next = sorted[i + 1];
    if (next && next - sorted[i] > 1) out.push("…");
  }
  return out;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function buttonClass(disabled: boolean) {
  return [
    "px-3 h-9 rounded-full border text-sm flex items-center",
    disabled
      ? "opacity-50 pointer-events-none"
      : "hover:bg-gray-100 dark:hover:bg-gray-800",
  ].join(" ");
}

function numberClass(active: boolean) {
  return [
    "w-9 h-9 rounded-full border text-sm flex items-center justify-center",
    active
      ? "bg-secondary text-secondary-foreground border-transparent"
      : "hover:bg-gray-100 dark:hover:bg-gray-800",
  ].join(" ");
}
