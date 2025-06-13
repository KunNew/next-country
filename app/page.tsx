import { Hero } from "@/components/hero";
import { CountryList } from "@/components/country/country-lists";
import { SearchQuery } from "@/components/search-query";
import { Suspense } from "react";
import { SortCountry } from "@/components/sort-query";
import { ResetButton } from "@/components/reset-button";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="w-full sm:flex-1">
            <SearchQuery />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto mt-2 sm:mt-0">
            <ResetButton />
            <SortCountry />
          </div>
        </div>
        <CountryList />
      </Suspense>
    </div>
  );
}
