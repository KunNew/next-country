import { useQuery } from "@tanstack/react-query";

export function useCountry({ search, sort }: { search: string; sort: string }) {
  return useQuery<any[]>({
    queryKey: ["countries", search, sort],
    queryFn: async () => {
      const url = search
        ? `https://restcountries.com/v3.1/name/${search}?fields=name,flags,capital,population`
        : `https://restcountries.com/v3.1/all?fields=name,flags,capital,population`;

      const res = await fetch(url);

      // Handle 404 when country not found with ternary
      const data = res.status === 404 ? [] : await res.json();

      // Clone the data array before sorting to avoid mutation issues
      const sortedData = [...data];
      
      // Only sort if sort parameter is provided with a valid value
      if (sort === "asc" || sort === "desc") {
        sortedData.sort((a: any, b: any) => 
          sort === "asc" 
            ? a.population - b.population 
            : b.population - a.population
        );
      }

      return sortedData;
    },
    select: (data) =>
      data.map((country: any) => ({
        name: country.name.common,
        nameNative: country.name.nativeName,
        image: country.flags.png,
        flag: country.flags.png,
        capital: country.capital,
        population: country.population,
      })),
  });
}
