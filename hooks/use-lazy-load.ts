"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type QueryValue = string | number | boolean | undefined | null;
type Query = Record<string, QueryValue>;

type UseLazyLoadOptions<TResponse, TItem> = {
  endpoint: string;
  limit?: number;
  initialQuery?: Query;
  getItems: (response: TResponse) => TItem[];
  getTotal?: (response: TResponse) => number | undefined;
};

type UseLazyLoadReturn<TItem> = {
  items: TItem[];
  isLoading: boolean;
  isFetchingPage: boolean;
  error: string | null;
  hasMore: boolean;
  reset: () => void;
  reload: () => void;
  loadMore: () => void;
  loadMoreRef: (node: Element | null) => void;
  setQuery: (q: Query) => void;
  mergeQuery: (q: Query) => void;
};


export function useLazyLoad<TResponse, TItem>(
  options: UseLazyLoadOptions<TResponse, TItem>
): UseLazyLoadReturn<TItem> {
  const {
    endpoint,
    limit = 30,
    initialQuery,
    getItems,
    getTotal,
  } = options;

  const [items, setItems] = useState<TItem[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingPage, setIsFetchingPage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [query, setQueryState] = useState<Query>(initialQuery ?? {});
  const [reloadFlag, setReloadFlag] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<Element | null>(null);
  const abortRef = useRef<AbortController | null>(null);


  const buildUrl = useCallback(
    (customSkip: number) => {
      const url = new URL(endpoint);
      // limit/skip
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("skip", String(customSkip));

      // extra query
      Object.entries(query ?? {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          url.searchParams.set(k, String(v));
        }
      });
      return url.toString();
    },
    [endpoint, limit, query]
  );

  const doFetch = useCallback(
    async (nextSkip: number, isFirstPage: boolean) => {

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      isFirstPage ? setIsLoading(true) : setIsFetchingPage(true);

      try {
        const url = buildUrl(nextSkip);
        const res =
          await defaultFetcher<TResponse>(url, controller.signal);

        const pageItems = getItems(res) ?? [];
        setItems((prev) => (isFirstPage ? pageItems : [...prev, ...pageItems]));
        setSkip(nextSkip + pageItems.length);

        if (getTotal) {
          const t = getTotal(res);
          if (typeof t === "number") setTotal(t);
        }
      } catch (e) {
        if ((e as { name: string })?.name !== "AbortError") {
          setError((e as { message: string })?.message || "Failed to load data");
        }
      } finally {
        isFirstPage ? setIsLoading(false) : setIsFetchingPage(false);
      }
    },
    [buildUrl, getItems, getTotal]
  );


  useEffect(() => {
    setSkip(0);
    setItems([]);
    setTotal(undefined);
    doFetch(0, true);

  }, [endpoint, limit, JSON.stringify(query), reloadFlag]);


  const hasMore = useMemo(() => {

    if (typeof total === "number") {
      return items.length < total;
    }
    // If total unknown, assume more if last page size == limit
    return items.length === 0 || items.length % limit === 0;
  }, [items.length, limit, total]);


  const reload = useCallback(() => setReloadFlag((n) => n + 1), []);
  const reset = useCallback(() => {
    setItems([]);
    setSkip(0);
    setTotal(undefined);
    setError(null);
    setReloadFlag((n) => n + 1);
  }, []);
  const loadMore = useCallback(() => {
    if (!isLoading && !isFetchingPage && hasMore) {
      doFetch(skip, false);
    }
  }, [doFetch, hasMore, isFetchingPage, isLoading, skip]);


  const loadMoreRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      sentinelRef.current = node;

      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { rootMargin: "600px 0px 0px 0px", threshold: 0.01 }
      );
      observerRef.current.observe(node);
    },
    [loadMore]
  );


  const setQuery = useCallback((q: Query) => setQueryState(q), []);
  const mergeQuery = useCallback(
    (q: Query) => setQueryState((prev) => ({ ...prev, ...q })),
    []
  );

  return {
    items,
    isLoading,
    isFetchingPage,
    error,
    hasMore,
    reset,
    reload,
    loadMore,
    loadMoreRef,
    setQuery,
    mergeQuery,
  };
}

async function defaultFetcher<T>(url: string, signal?: AbortSignal): Promise<T> {
  const r = await fetch(url, { signal, cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
