"use client";
import Link from "next/link";

export function CountryCard({ country }: { country: any }) {
  return (
    <Link
      href={`/country/${country.name}`}
      className="rounded-lg border border-border/65 bg-card"
    >
      <img
        src={country.image}
        alt={country.name}
        draggable={false}
        className="aspect-auto h-28 w-full rounded-t-[inherit] border border-border/65 md:h-48  object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-sm/relaxed">{country.name}</h2>
        <p className="line-clamp-1 font-medium text-muted-foreground text-xs/5">
          {country.capital}
        </p>
      </div>
    </Link>
  );
}
