import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/breadcrumbs";
import SeoMeta from "@/app/components/seo-meta";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "China Travel Explained | Chinses.ai",
    description:
      "A travel hub for China explanation content, with city overviews and travel structure.",
    alternates: { canonical: "https://chinses.ai/travel" }
  };
}

export default function TravelPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Travel", href: "/travel" }
  ];
  const jsonLd = [buildBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="space-y-8">
      <SeoMeta jsonLd={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Travel China with Context</h1>
        <p className="text-sm text-mist">
          This hub introduces China travel through clear explanations. Use the cities
          directory to explore why each destination matters, what to see, and the cultural
          context behind each stop.
        </p>
        <Link
          href="/travel/cities"
          className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm"
        >
          Browse Top Cities
        </Link>
      </section>
    </div>
  );
}
