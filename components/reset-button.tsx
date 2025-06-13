"use client";

import { Button } from "./ui/button";
import { useQueryState } from "nuqs";

export function ResetButton() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });

  const handleReset = () => {
    setSearch("");
    setSort("");
  };

  return <Button onClick={handleReset} variant="outline" size="sm">Reset</Button>;
}