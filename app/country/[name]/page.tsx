import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CountryDetail } from "@/components/country/country-detail";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic";

async function getCountry(name: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(
      name
    )}?fullText=true`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Country not found");
  }

  const data = await res.json();
  return data[0];
}

// Generate metadata for the page based on the country name
export async function generateMetadata(
  { params }: { params: Promise<{ name: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const name = decodeURIComponent(resolvedParams.name);

  try {
    // Fetch country data for metadata
    const country = await getCountry(name);
    return {
      title: `${country.name.common} | Country Details`,
      description: `Learn about ${country.name.common}, capital: ${
        country.capital?.[0] || "N/A"
      }, population: ${country.population.toLocaleString()}`,
      openGraph: {
        title: `${country.name.common} | Country Details`,
        description: `Learn about ${country.name.common}, capital: ${
          country.capital?.[0] || "N/A"
        }, population: ${country.population.toLocaleString()}`,
        images: [{ url: country.flags.png }],
      },
    };
  } catch (error) {
    return {
      title: "Country Not Found",
      description: "The requested country information could not be found.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = await params;
  const name = decodeURIComponent(resolvedParams.name);
  const queryClient = new QueryClient();

  // Prefetch the query on the server
  await queryClient.prefetchQuery({
    queryKey: ["country", name],
    queryFn: () => getCountry(name),
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Countries
          </Link>
        </Button>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CountryDetail name={name} />
      </HydrationBoundary>
    </div>
  );
}
