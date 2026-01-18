import fs from "fs";
import path from "path";
import type { City, Culture, Food, Person } from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readJson<T>(relativePath: string): T {
  const fullPath = path.join(contentRoot, relativePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

function listJsonFiles(relativeDir: string) {
  const fullPath = path.join(contentRoot, relativeDir);
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".json"));
}

export function getAllCities(): City[] {
  return listJsonFiles("cities").map((file) =>
    readJson<City>(path.join("cities", file))
  );
}

export function getCityBySlug(slug: string): City {
  return readJson<City>(path.join("cities", `${slug}.json`));
}

export function getAllFoods(): Food[] {
  return listJsonFiles("foods").map((file) =>
    readJson<Food>(path.join("foods", file))
  );
}

export function getFoodBySlug(slug: string): Food {
  return readJson<Food>(path.join("foods", `${slug}.json`));
}

export function getAllCultures(): Culture[] {
  return listJsonFiles("cultures").map((file) =>
    readJson<Culture>(path.join("cultures", file))
  );
}

export function getCultureBySlug(slug: string): Culture {
  return readJson<Culture>(path.join("cultures", `${slug}.json`));
}

export function getAllPeople(): Person[] {
  return listJsonFiles("people").map((file) =>
    readJson<Person>(path.join("people", file))
  );
}

export function getPersonBySlug(slug: string): Person {
  return readJson<Person>(path.join("people", `${slug}.json`));
}

export function toSlugList(items: { slug: string }[]) {
  return items.map((item) => item.slug);
}
