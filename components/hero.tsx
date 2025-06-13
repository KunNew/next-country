"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {  Rocket } from "lucide-react";

export function Hero() {
  const { hero, github } = siteConfig;
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 lg:py-20">
      <h1 className="max-w-4xl font-black text-2xl/snug md:text-4xl/snug lg:text-6xl/snug">
        {hero.title}
      </h1>
      <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-sm lg:text-lg">
        {hero.description}
      </p>
      <Button asChild className="mt-4 rounded-md" variant={'default'}>
        <a target="_blank" rel="noreferrer" href={github.url}>
          <Rocket className="mr-2" />
          Source Code
        </a>
      </Button>
    </div>
  );
}
