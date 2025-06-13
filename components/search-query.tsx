"use client";

import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "react-use";
import { useEffect, useState, useRef } from "react";

export function SearchQuery() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  
  const [val, setVal] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const [, cancel] = useDebounce(
    () => {
      setSearch(val);
    },
    500,
    [val]
  );

  // Sync input with URL search param
  useEffect(() => {
    setVal(search);
    
    // Reset input value if search cleared
    if (search === "" && inputRef.current && inputRef.current.value !== "") {
      inputRef.current.value = "";
    }
  }, [search]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search countries..."
        value={val}
        className="pl-8 bg-card w-full"
        onChange={(e) => setVal(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
