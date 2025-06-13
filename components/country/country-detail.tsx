"use client";

import { CountryDetailSkeleton } from "./country-detail-skeleton";
import { GlobeIcon, MapPin, Users } from "lucide-react";
import { useCountryDetail } from "@/hooks/use-country-detail";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export function CountryDetail({ name }: { name: string }) {
  const { data, isPending, isError } = useCountryDetail(name);

  if (isPending) {
    return <CountryDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4">Error loading country</h1>
        <p className="mb-6">There was a problem loading the country data.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="sticky top-8">
          <Zoom>
            <img
              src={data.flags.svg || data.flags.png}
              alt={`Flag of ${data.name.common}`}
              className="w-full rounded-lg border border-border/65 shadow-sm"
            />
          </Zoom>

          <div className="mt-6 space-y-4">
            <h1 className="text-3xl font-bold">{data.name.common}</h1>
            <p className="text-muted-foreground">{data.name.official}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard
                icon={<MapPin className="h-5 w-5 text-primary" />}
                title="Capital"
                value={data.capital ? data.capital[0] : "N/A"}
              />

              <InfoCard
                icon={<Users className="h-5 w-5 text-primary" />}
                title="Population"
                value={data.population.toLocaleString()}
              />

              <InfoCard
                icon={<GlobeIcon className="h-5 w-5 text-primary" />}
                title="Region"
                value={data.region}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="space-y-4">
            <DetailRow label="Subregion" value={data.subregion || "N/A"} />
            <DetailRow
              label="Area"
              value={`${data.area?.toLocaleString() || "N/A"} km²`}
            />
            <DetailRow
              label="Languages"
              value={
                data.languages
                  ? Object.values(data.languages).join(", ")
                  : "N/A"
              }
            />
            <DetailRow
              label="Currencies"
              value={
                data.currencies
                  ? Object.values(data.currencies)
                      .map((c: any) => `${c.name} (${c.symbol})`)
                      .join(", ")
                  : "N/A"
              }
            />
            <DetailRow
              label="Timezones"
              value={data.timezones ? data.timezones.join(", ") : "N/A"}
            />
            <DetailRow
              label="Borders"
              value={data.borders ? data.borders.join(", ") : "None"}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col p-4 border border-border/65 rounded-lg bg-card">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/40">
      <span className="w-32 font-medium text-muted-foreground mb-1 sm:mb-0">
        {label}
      </span>
      <span className="flex-1">{value}</span>
    </div>
  );
}
