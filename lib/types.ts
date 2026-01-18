export type MediaItem = {
  src: string;
  alt: string;
  license: string;
  author: string;
  source_url: string;
};

export type VideoItem = {
  title: string;
  embed_url: string;
  thumbnail: string;
  license: string;
  author: string;
  source_url: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type City = {
  city: string;
  slug: string;
  summary: string;
  why_visit: string[];
  things_to_do: string[];
  attractions: string[];
  local_foods: string[];
  culture_links: string[];
  people_links: string[];
  faq: FAQItem[];
  media: {
    hero: MediaItem;
    gallery: MediaItem[];
    videos: VideoItem[];
  };
};

export type Food = {
  food: string;
  slug: string;
  description: string;
  popular_cities: string[];
  faq: FAQItem[];
};

export type Culture = {
  topic: string;
  slug: string;
  description: string;
  related_cities: string[];
  associated_people: string[];
};

export type Person = {
  person: string;
  slug: string;
  description: string;
  associated_cities: string[];
  culture_links: string[];
};
