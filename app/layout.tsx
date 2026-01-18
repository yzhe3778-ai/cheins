import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chinses.ai | China Explanation Platform",
  description:
    "Chinses.ai is a China explanation platform for non-Chinese audiences across travel, food, culture, and people.",
  metadataBase: new URL("https://chinses.ai")
};

const navItems = [
  { href: "/travel", label: "Travel" },
  { href: "/food", label: "Food" },
  { href: "/culture", label: "Culture" },
  { href: "/people", label: "People" }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10 bg-slate/40">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-semibold tracking-wide">
              Chinses.ai
            </Link>
            <nav className="flex gap-6 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-white/10 py-8 text-center text-xs text-mist">
          <div className="mx-auto w-full max-w-6xl px-6">
            Built for long-term topical authority on China explanations.
          </div>
        </footer>
      </body>
    </html>
  );
}
