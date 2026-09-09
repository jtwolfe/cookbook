# Cookbook hypergraph schema

Seed graph: `src/data/atlas.json`, produced by `scripts/build-atlas.mjs`.

```ts
type NodeKind = "recipe" | "ingredient" | "cuisine" | "technique" | "flavor";
type HyperedgeKind = "recipe" | "pairing" | "substitution" | "taxonomy" | "cuisine";

interface AtlasNode {
  id: string;          // r-spaghetti-carbonara | i-guanciale | c-italian | t-braise | f-umami
  kind: NodeKind;
  name: string;
  x: number;           // atlas coordinate (culinary geography)
  y: number;
  // recipe
  cuisineId?: string;
  course?: "starter" | "main" | "side" | "staple" | "dessert" | "drink" | "condiment";
  minutes?: number;
  difficulty?: 1 | 2 | 3;
  diet?: Array<"vegetarian" | "vegan" | "pescatarian" | "gluten-free">;
  origin?: string;
  blurb?: string;
  flavorIds?: string[];
  techniqueIds?: string[];
  // ingredient
  ingredientClass?: string;
  ubiquity?: "staple" | "common" | "specific";
  parentId?: string;   // taxonomy parent, e.g. guanciale → pork
  // cuisine
  color?: string;
  region?: string;
  degree?: number;     // incident recipes or ingredients
}

interface Hyperedge {
  id: string;
  kind: HyperedgeKind;
  label?: string;
  nodeIds: string[];   // 2+ vertices
  weight?: number;
}
```

## Mapping to existing corpora

| Field | FoodOn | USDA FDC | Wikidata | Recipe1M | FlavorDB |
|---|---|---|---|---|---|
| ingredient.id | foodon_id | fdcId | Q-id | parsed item | food id |
| recipe.id | — | — | Q-id of dish | cluster of rows | — |
| recipe hyperedge | — | weighed ingredients | — | ingredient lines | pairing evidence |
| nutrition | — | nutrients | — | — | — |
| flavor | — | — | — | — | compounds |

Add those as optional properties. Do not flatten the hypergraph into a recipe table.

## Catalog source

Compact pipe-delimited records in `scripts/food/recipes-*.mjs`:

```
name|cuisine|course|minutes|difficulty|diet|ingredients|techniques|flavors|origin|blurb
```

Diet flags: `v` vegetarian, `vg` vegan, `p` pescatarian, `gf` gluten-free.
