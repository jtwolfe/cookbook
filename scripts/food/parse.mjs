const DIET_MAP = {
  v: "vegetarian",
  vg: "vegan",
  p: "pescatarian",
  gf: "gluten-free",
};

export function slug(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function titleCase(slugOrName) {
  return String(slugOrName)
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function parseRaw(raw, source) {
  const recipes = [];
  const seen = new Set();
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split("|");
    if (parts.length < 11) {
      console.warn(`skip malformed (${source}): ${trimmed.slice(0, 80)}`);
      continue;
    }
    const [
      name,
      cuisine,
      course,
      minutes,
      difficulty,
      dietRaw,
      ings,
      techs,
      flavors,
      origin,
      blurb,
    ] = parts;
    if (!name || blurb === "skip" || /already listed/i.test(name) || / is listed$/i.test(name)) {
      continue;
    }
    const id = `r-${slug(name)}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const diet = dietRaw
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => DIET_MAP[d] ?? d)
      .filter(Boolean);
    recipes.push({
      id,
      name: name.trim(),
      cuisineId: cuisine.trim(),
      course: course.trim(),
      minutes: Number(minutes) || 30,
      difficulty: Number(difficulty) || 2,
      diet,
      ingredients: ings.split(",").map((s) => slug(s)).filter(Boolean),
      techniques: techs.split(",").map((s) => slug(s)).filter(Boolean),
      flavors: flavors.split(",").map((s) => slug(s)).filter(Boolean),
      origin: origin.trim(),
      blurb: blurb.trim(),
    });
  }
  return recipes;
}
