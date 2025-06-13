"use client";

import { useCountry } from "@/hooks/use-country";
import { CountryCard } from "./country-card";
import { CountryCardSkeletonList } from "./country-card-skeleton";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

export function CountryList() {
  const [query] = useQueryState("search", { defaultValue: "" });
  const [sort] = useQueryState("sort", { defaultValue: "" });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isPending,isFetched, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCountry({ search: query, sort });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      {isPending ? (
        <CountryCardSkeletonList />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {data?.pages.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
          </div>
          <div
            ref={loadMoreRef}
            className="h-16 w-full flex justify-center items-center my-4"
          >
            {isFetchingNextPage && (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Loading more countries...
                </div>
              </div>
            )}
            {!hasNextPage && data && data.pages && data.pages.length > 0 && (
              <div className="text-sm text-muted-foreground">
                No more countries to load
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
