import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import FAQ from "@/app/components/faq";
import SeoMeta from "@/app/components/seo-meta";
import { getAllFoods, getFoodBySlug, getCityBySlug } from "@/lib/content";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllFoods().map((food) => ({ food: food.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { food: string };
}): Promise<Metadata> {
  const food = getFoodBySlug(params.food);
  return {
    title: `${food.food} Explained | Chinses.ai`,
    description: food.description,
    alternates: { canonical: `https://chinses.ai/food/${food.slug}` }
  };
}

export default function FoodPage({ params }: { params: { food: string } }) {
  const food = getFoodBySlug(params.food);
  const cities = food.popular_cities.map((slug) => getCityBySlug(slug));
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Food", href: "/food" },
    { label: food.food, href: `/food/${food.slug}` }
  ];
  const jsonLd = [
    buildBreadcrumbSchema(breadcrumbs),
    ...(food.faq.length ? [buildFaqSchema(food.faq)] : [])
  ];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">{food.food}</h1>
        <p className="text-sm text-mist">{food.description}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Where This Food Is Popular</h2>
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
      <FAQ items={food.faq} />
    </div>
  );
}
