# Cookbook

A **hypergraph map of food**: 500 canonical recipes, their ingredients, cuisines, techniques, and flavor pairings, laid out as a navigable atlas.

A recipe is not a row in a table. It is a **hyperedge** — many foods bound together at once. This repository is a seed of that idea, and a proposal for how an exhaustive culinary database should be structured.

Live atlas: the Cookbook app (pan, zoom, click a dish to light its constellation).

Repository: [github.com/jtwolfe/cookbook](https://github.com/jtwolfe/cookbook)

## What’s here

| | |
|---|---|
| Recipes | 500 dishes across 39 cuisines |
| Foods | ~520 ingredient vertices |
| Hyperedges | recipes, flavor pairings, substitutions, taxonomy, cuisine membership |
| Layout | culinary-geography (related kitchens sit near each other) |

Regenerate the graph:

```
node scripts/build-atlas.mjs
```

## Data model

See [SCHEMA.md](SCHEMA.md). Short version:

- **Vertices** — `recipe`, `ingredient`, `cuisine`, `technique`, `flavor`
- **Hyperedges** — `recipe` (the dish), `pairing`, `substitution`, `taxonomy` (is-a), `cuisine` (membership)

Ingredients carry a class (protein, spice, allium…) and a ubiquity (`staple` / `common` / `specific`). Staples such as salt are first-class in the inspector and omitted from the map, so the atlas doesn’t collapse into a hairball.

## How this extends toward an exhaustive DB

Current large sources are complementary, not interchangeable:

- **schema.org/Recipe** — web envelope (title, ingredients, steps, time)
- **Recipe1M+ / RecipeNLG** — noisy million-scale observations of dishes
- **FoodOn** — ontology of food products
- **USDA FoodData Central** — nutrients, FDC IDs
- **FooDB / FlavorDB** — molecules under taste
- **Wikidata** — stable Q-ids for dishes and ingredients

The extension path is to **keep the hypergraph** and hang those identifiers on nodes and edges (`foodOn`, `fdcId`, `wikidata`, Recipe1M row ids as observations of the same dish). Variants (carbonara with pancetta vs guanciale) are parallel hyperedges that share most vertices — not a boolean column.

## Navigation

- Drag to pan, scroll or pinch to zoom
- Click a recipe to see its ingredient hyperedge and kindred dishes
- Click an ingredient to see every recipe that uses it
- Search (`/`) or press **Hungry** for a random main

## License

Catalog blurbs are short original descriptions of well-known dishes. No scraped full recipes or paywalled text.
