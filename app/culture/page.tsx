import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getAllCultures } from "@/lib/content";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chinese Culture Explained | Chinses.ai",
    description:
      "Learn Chinese culture topics, festivals, and traditions with clear explanations and linked cities.",
    alternates: { canonical: "https://chinses.ai/culture" }
  };
}

export default function CultureHubPage() {
  const cultures = getAllCultures();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Culture", href: "/culture" }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Chinese Culture Topics</h1>
        <p className="text-sm text-mist">
          Explore China’s festivals, traditions, and cultural practices with direct links
          to the cities and people most closely associated with each topic.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {cultures.map((culture) => (
          <Link
            key={culture.slug}
            href={`/culture/${culture.slug}`}
            className="rounded-xl border border-white/10 bg-slate/40 p-5 text-sm"
          >
            <div className="font-semibold">{culture.topic}</div>
            <p className="mt-2 text-xs text-mist">{culture.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
