import { useInfiniteQuery } from "@tanstack/react-query";
import { delay } from "@/utils/delay";

interface Country {
  name: {
    common: string;
    nativeName?: any;
  };
  flags: {
    png: string;
  };
  capital?: string[];
  population: number;
}

interface CountryResult {
  name: string;
  nameNative?: any;
  image: string;
  flag: string;
  capital?: string[];
  population: number;
}

interface PageData {
  data: Country[];
  nextPage: number | undefined;
  totalItems: number;
}



export function useCountry({ search, sort }: { search: string; sort: string }) {
  return useInfiniteQuery<PageData, Error, { pages: CountryResult[], pageParams: unknown[], totalItems: number }>({
    queryKey: ["countries", search, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const url = search
        ? `https://restcountries.com/v3.1/name/${search}?fields=name,flags,capital,population`
        : `https://restcountries.com/v3.1/all?fields=name,flags,capital,population`;

      const res = await fetch(url);

      // Handle 404 when country not found with ternary
      const data = res.status === 404 ? [] : await res.json();

      // Clone the data array before sorting to avoid mutation issues
      const sortedData = [...data] as Country[];
      
      // Only sort if sort parameter is provided with a valid value
      if (sort === "asc" || sort === "desc") {
        sortedData.sort((a: Country, b: Country) => 
          sort === "asc" 
            ? a.population - b.population 
            : b.population - a.population
        );
      }

   
      const PAGE_SIZE = 100;
      const start = (pageParam as number) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const paginatedData = sortedData.slice(start, end);

      // delay to better see loading (1-2 seconds)
      await delay(1500);

      return {
        data: paginatedData,
        nextPage: end < sortedData.length ? (pageParam as number) + 1 : undefined,
        totalItems: sortedData.length
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => {
      const mappedCountries = data.pages.flatMap(page => 
        page.data.map((country: Country) => ({
          name: country.name.common,
          nameNative: country.name.nativeName,
          image: country.flags.png,
          flag: country.flags.png,
          capital: country.capital,
          population: country.population,
        }))
      );
      
      return {
        pages: mappedCountries,
        pageParams: data.pageParams,
        totalItems: data.pages[0]?.totalItems ?? 0
      };
    },
  });
}
