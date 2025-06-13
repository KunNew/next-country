"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {  Rocket } from "lucide-react";
import { SparklesText } from "./ui/sparkles-text";
import { RainbowButton } from "./ui/rainbow-button";

export function Hero() {
  const { hero, github } = siteConfig;
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 lg:py-20">
      <SparklesText className="max-w-4xl font-black text-2xl/snug md:text-4xl/snug lg:text-6xl/snug">
        {hero.title}
      </SparklesText>
      <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-sm lg:text-lg">
        {hero.description}
      </p>
      <RainbowButton asChild className="mt-4 rounded-full" variant="default">
        <a target="_blank" rel="noreferrer" href={github.url}>
          <Rocket className="mr-2" />
          Source Code
        </a>
      </RainbowButton>
    </div>
  );
}
