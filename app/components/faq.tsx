type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ({ items }: { items: FAQItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-lg border border-white/10 bg-slate/40 p-4"
          >
            <summary className="cursor-pointer font-medium">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-mist">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
