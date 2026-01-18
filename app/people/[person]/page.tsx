import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { getAllPeople, getPersonBySlug, getCityBySlug, getCultureBySlug } from "@/lib/content";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllPeople().map((person) => ({ person: person.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { person: string };
}): Promise<Metadata> {
  const person = getPersonBySlug(params.person);
  return {
    title: `${person.person} Explained | Chinses.ai`,
    description: person.description,
    alternates: { canonical: `https://chinses.ai/people/${person.slug}` }
  };
}

export default function PersonPage({ params }: { params: { person: string } }) {
  const person = getPersonBySlug(params.person);
  const cities = person.associated_cities.map((slug) => getCityBySlug(slug));
  const cultures = person.culture_links.map((slug) => getCultureBySlug(slug));
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "People", href: "/people" },
    { label: person.person, href: `/people/${person.slug}` }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">{person.person}</h1>
        <p className="text-sm text-mist">{person.description}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Associated Cities</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/travel/cities/${city.slug}`}
              className="rounded-xl border border-white/10 bg-slate/40 p-4 text-sm"
            >
              <div className="font-semibold">{city.city}</div>
              <p className="mt-2 text-xs text-mist">{city.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cultural Significance</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {cultures.map((culture) => (
            <Link
              key={culture.slug}
              href={`/culture/${culture.slug}`}
              className="rounded-xl border border-white/10 bg-slate/40 p-4 text-sm"
            >
              <div className="font-semibold">{culture.topic}</div>
              <p className="mt-2 text-xs text-mist">{culture.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
