"use client";

import { useCountry } from "@/hooks/use-country";
import { CountryCard } from "./country-card";
import { CountryCardSkeletonList } from "./country-card-skeleton";
import { useQueryState } from "nuqs";

export function CountryList() {
  const [query] = useQueryState("search", { defaultValue: "" });
  const [sort] = useQueryState("sort", { defaultValue: "" });

  const { data, isPending } = useCountry({ search: query, sort });

  return (
    <div>
      {isPending ? (
        <CountryCardSkeletonList />
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {data?.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
