"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CountryCardSkeleton() {
  return (
    <div className="rounded-lg border border-border/65 bg-card">
      {/* Image skeleton */}
      <Skeleton className="aspect-auto h-28 w-full rounded-t-[inherit] md:h-48" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4 mb-2" />

        {/* Subtitle skeleton */}
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function CountryCardSkeletonList() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <CountryCardSkeleton key={index} />
        ))}
    </div>
  );
}
