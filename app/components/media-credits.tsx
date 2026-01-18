type MediaCredit = {
  alt: string;
  author: string;
  license: string;
  source_url: string;
};

export default function MediaCredits({ items }: { items: MediaCredit[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <details className="rounded-lg border border-white/10 bg-slate/40 p-4">
      <summary className="cursor-pointer font-semibold">Media Credits</summary>
      <ul className="mt-3 space-y-2 text-xs text-mist">
        {items.map((item) => (
          <li key={`${item.alt}-${item.source_url}`}>
            <span className="text-white">{item.alt}</span> — {item.author},{" "}
            {item.license} —{" "}
            <a href={item.source_url} target="_blank" rel="noreferrer">
              Source
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
