import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getAllFoods } from "@/lib/content";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chinese Food Explained | Chinses.ai",
    description:
      "Explore Chinese foods, their origins, and where each dish is popular across China.",
    alternates: { canonical: "https://chinses.ai/food" }
  };
}

export default function FoodHubPage() {
  const foods = getAllFoods();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Food", href: "/food" }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Chinese Food Explained</h1>
        <p className="text-sm text-mist">
          Each food page explains where a dish comes from, what it tastes like, and
          which Chinese cities celebrate it the most.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {foods.map((food) => (
          <Link
            key={food.slug}
            href={`/food/${food.slug}`}
            className="rounded-xl border border-white/10 bg-slate/40 p-5 text-sm"
          >
            <div className="font-semibold">{food.food}</div>
            <p className="mt-2 text-xs text-mist">{food.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
