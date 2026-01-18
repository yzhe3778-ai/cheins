type MediaImage = {
  src: string;
  alt: string;
  author: string;
  license: string;
  source_url: string;
};

export default function ImageGallery({
  title,
  images
}: {
  title: string;
  images: MediaImage[];
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((image) => (
          <figure
            key={image.src}
            className="overflow-hidden rounded-xl border border-white/10 bg-slate/40"
          >
            <img src={image.src} alt={image.alt} className="h-48 w-full object-cover" />
            <figcaption className="px-4 py-3 text-xs text-mist">
              {image.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
