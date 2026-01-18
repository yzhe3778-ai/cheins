import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { getAllCultures, getCultureBySlug, getCityBySlug, getPersonBySlug } from "@/lib/content";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCultures().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const topic = getCultureBySlug(params.topic);
  return {
    title: `${topic.topic} Explained | Chinses.ai`,
    description: topic.description,
    alternates: { canonical: `https://chinses.ai/culture/${topic.slug}` }
  };
}

export default function CulturePage({ params }: { params: { topic: string } }) {
  const topic = getCultureBySlug(params.topic);
  const cities = topic.related_cities.map((slug) => getCityBySlug(slug));
  const people = topic.associated_people.map((slug) => getPersonBySlug(slug));
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Culture", href: "/culture" },
    { label: topic.topic, href: `/culture/${topic.slug}` }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">{topic.topic}</h1>
        <p className="text-sm text-mist">{topic.description}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cities Where This Tradition Is Visible</h2>
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
        <h2 className="text-xl font-semibold">People Associated with This Tradition</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {people.map((person) => (
            <Link
              key={person.slug}
              href={`/people/${person.slug}`}
              className="rounded-xl border border-white/10 bg-slate/40 p-4 text-sm"
            >
              <div className="font-semibold">{person.person}</div>
              <p className="mt-2 text-xs text-mist">{person.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
