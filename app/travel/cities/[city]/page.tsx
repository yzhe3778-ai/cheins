import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import FAQ from "@/app/components/faq";
import ImageGallery from "@/app/components/image-gallery";
import MediaCredits from "@/app/components/media-credits";
import SeoMeta from "@/app/components/seo-meta";
import VideoEmbed from "@/app/components/video-embed";
import { getAllCities, getCityBySlug, getFoodBySlug, getCultureBySlug, getPersonBySlug } from "@/lib/content";
import { buildBreadcrumbSchema, buildFaqSchema, buildVideoSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  return {
    title: `${city.city} Travel Guide | Chinses.ai`,
    description: city.summary,
    alternates: { canonical: `https://chinses.ai/travel/cities/${city.slug}` }
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  const foods = city.local_foods.map((slug) => getFoodBySlug(slug));
  const cultures = city.culture_links.map((slug) => getCultureBySlug(slug));
  const people = city.people_links.map((slug) => getPersonBySlug(slug));
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel", href: "/travel" },
    { label: "Cities", href: "/travel/cities" },
    { label: city.city, href: `/travel/cities/${city.slug}` }
  ];

  const jsonLd = [
    buildBreadcrumbSchema(breadcrumbs),
    ...(city.faq.length ? [buildFaqSchema(city.faq)] : []),
    ...buildVideoSchema(city.media.videos)
  ];

  const mediaCredits = [
    city.media.hero,
    ...city.media.gallery,
    ...city.media.videos.map((video) => ({
      alt: video.title,
      author: video.author,
      license: video.license,
      source_url: video.source_url
    }))
  ];

  return (
    <div className="space-y-10">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src={city.media.hero.src}
            alt={city.media.hero.alt}
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">{city.city}</h1>
          <p className="text-sm text-mist">{city.summary}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate/40 p-6">
          <h2 className="text-xl font-semibold">Why Visit</h2>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            {city.why_visit.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate/40 p-6">
          <h2 className="text-xl font-semibold">Things to Do</h2>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            {city.things_to_do.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Top Attractions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {city.attractions.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-slate/40 p-4 text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Local Food</h2>
          <div className="space-y-2">
            {foods.map((food) => (
              <Link
                key={food.slug}
                href={`/food/${food.slug}`}
                className="block rounded-lg border border-white/10 bg-slate/40 p-4 text-sm"
              >
                <div className="font-semibold">{food.food}</div>
                <div className="text-xs text-mist">{food.description}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Culture & Traditions</h2>
          <div className="space-y-2">
            {cultures.map((culture) => (
              <Link
                key={culture.slug}
                href={`/culture/${culture.slug}`}
                className="block rounded-lg border border-white/10 bg-slate/40 p-4 text-sm"
              >
                <div className="font-semibold">{culture.topic}</div>
                <div className="text-xs text-mist">{culture.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Famous People</h2>
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

      <ImageGallery title="City Highlights" images={city.media.gallery} />

      {city.media.videos.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Watch {city.city}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {city.media.videos.map((video) => (
              <VideoEmbed key={video.embed_url} video={video} />
            ))}
          </div>
        </section>
      ) : null}

      <FAQ items={city.faq} />
      <MediaCredits items={mediaCredits} />
    </div>
  );
}
