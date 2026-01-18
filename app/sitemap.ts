import type { MetadataRoute } from "next";
import { getAllCities, getAllFoods, getAllCultures, getAllPeople } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getAllCities().map((city) => ({
    url: `https://chinses.ai/travel/cities/${city.slug}`,
    lastModified: new Date()
  }));
  const foods = getAllFoods().map((food) => ({
    url: `https://chinses.ai/food/${food.slug}`,
    lastModified: new Date()
  }));
  const cultures = getAllCultures().map((culture) => ({
    url: `https://chinses.ai/culture/${culture.slug}`,
    lastModified: new Date()
  }));
  const people = getAllPeople().map((person) => ({
    url: `https://chinses.ai/people/${person.slug}`,
    lastModified: new Date()
  }));

  return [
    { url: "https://chinses.ai", lastModified: new Date() },
    { url: "https://chinses.ai/travel", lastModified: new Date() },
    { url: "https://chinses.ai/travel/cities", lastModified: new Date() },
    { url: "https://chinses.ai/food", lastModified: new Date() },
    { url: "https://chinses.ai/culture", lastModified: new Date() },
    { url: "https://chinses.ai/people", lastModified: new Date() },
    ...cities,
    ...foods,
    ...cultures,
    ...people
  ];
}
