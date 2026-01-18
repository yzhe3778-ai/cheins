import Link from "next/link";

export type Breadcrumb = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className="text-xs text-mist">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="text-mist hover:text-white">
              {item.label}
            </Link>
            {index < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
