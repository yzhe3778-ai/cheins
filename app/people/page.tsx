import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getAllPeople } from "@/lib/content";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chinese People Explained | Chinses.ai",
    description:
      "Meet Chinese historical figures and modern icons with cultural context and city connections.",
    alternates: { canonical: "https://chinses.ai/people" }
  };
}

export default function PeopleHubPage() {
  const people = getAllPeople();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "People", href: "/people" }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Chinese People & Icons</h1>
        <p className="text-sm text-mist">
          Discover the people who shaped Chinese history, philosophy, and modern culture.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {people.map((person) => (
          <Link
            key={person.slug}
            href={`/people/${person.slug}`}
            className="rounded-xl border border-white/10 bg-slate/40 p-5 text-sm"
          >
            <div className="font-semibold">{person.person}</div>
            <p className="mt-2 text-xs text-mist">{person.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
