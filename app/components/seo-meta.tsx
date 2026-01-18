import React from "react";

export type JsonLd = Record<string, unknown>;

export default function SeoMeta({ jsonLd }: { jsonLd: JsonLd[] }) {
  if (jsonLd.length === 0) {
    return null;
  }

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
