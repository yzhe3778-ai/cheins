import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getAllCities } from "@/lib/content";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Top China Cities Explained | Chinses.ai",
    description:
      "Explore the top China cities with structured explanations, attractions, food, culture, and people.",
    alternates: { canonical: "https://chinses.ai/travel/cities" }
  };
}

export default function CitiesHubPage() {
  const cities = getAllCities();
  const topCities = cities.slice(0, 20);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel", href: "/travel" },
    { label: "Cities", href: "/travel/cities" }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">China Cities Explained</h1>
        <p className="text-sm text-mist">
          Start with the most influential Chinese cities. Each city page connects travel
          highlights with food, culture, and people for a structured understanding.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {topCities.map((city) => (
          <Link
            key={city.slug}
            href={`/travel/cities/${city.slug}`}
            className="rounded-xl border border-white/10 bg-slate/40 p-5 hover:border-white/30"
          >
            <h2 className="text-lg font-semibold">{city.city}</h2>
            <p className="mt-2 text-xs text-mist">{city.summary}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
