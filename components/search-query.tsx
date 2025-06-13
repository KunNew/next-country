"use client";

import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { debounce } from "@/utils/debounce";
import { SearchIcon } from "lucide-react";

export function SearchQuery() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const debouncedSetSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search countries..."
        defaultValue={search}
        className="pl-8 bg-card w-full"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
