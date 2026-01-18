import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chinses.ai | China Explained for the World",
    description:
      "A China explanation platform for non-Chinese audiences across travel, food, culture, and people.",
    alternates: { canonical: "https://chinses.ai" }
  };
}

const hubs = [
  {
    title: "Travel",
    href: "/travel",
    description: "Start with China travel explanations, city overviews, and itineraries."
  },
  {
    title: "Food",
    href: "/food",
    description: "Discover Chinese food explanations, origins, and regional favorites."
  },
  {
    title: "Culture",
    href: "/culture",
    description: "Understand festivals, traditions, and cultural practices."
  },
  {
    title: "People",
    href: "/people",
    description: "Learn about influential figures and cultural icons."
  }
];

export default function HomePage() {
  const breadcrumbs = [{ label: "Home", href: "/" }];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-10">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold">China, Explained for Everyone</h1>
        <p className="max-w-2xl text-sm text-mist">
          Chinses.ai is a China explanation platform for non-Chinese readers. Explore
          cities, food, culture, and people with structured pages designed for
          quick understanding and deep exploration.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {hubs.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="rounded-xl border border-white/10 bg-slate/40 p-6 hover:border-white/30"
          >
            <h2 className="text-xl font-semibold">{hub.title}</h2>
            <p className="mt-2 text-sm text-mist">{hub.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
