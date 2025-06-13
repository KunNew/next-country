import { useQuery } from "@tanstack/react-query";

export function useCountryDetail(name: string) {
  return useQuery({
    queryKey: ["country", name],
    queryFn: async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
      );
      
      if (!res.ok) {
        throw new Error("Country not found");
      }
      
      const data = await res.json();
      return data[0];
    },
  });
} 