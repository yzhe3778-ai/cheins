"use client";

import { useState } from "react";

type VideoItem = {
  title: string;
  embed_url: string;
  thumbnail: string;
};

export default function VideoEmbed({ video }: { video: VideoItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate/40">
      {loaded ? (
        <iframe
          className="h-56 w-full"
          src={video.embed_url}
          title={video.title}
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="relative h-56 w-full"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/40 text-sm font-semibold">
            Click to load video
          </span>
        </button>
      )}
    </div>
  );
}
