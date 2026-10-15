import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type SearchParams = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — EcoNest Store" },
      { name: "description", content: "Browse sustainable ceramics, textiles, kitchen, bath and glass goods." },
      { property: "og:title", content: "Shop — EcoNest Store" },
      { property: "og:description", content: "Browse sustainable ceramics, textiles, kitchen, bath and glass goods." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category = "All" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let r = PRODUCTS.filter(
      (p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(q.trim().toLowerCase()),
    );
    if (sort === "asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "desc") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [category, q, sort]);

  const setCat = (c: string) => navigate({ search: c === "All" ? {} : { category: c } });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-4xl sm:text-5xl rise">The collection</h1>
      <p className="mt-2 text-muted-foreground rise rise-1">{list.length} pieces, made to last.</p>

      <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between rise rise-2">
        <div className="relative md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg bg-card ring-1 ring-foreground/10 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg bg-card ring-1 ring-foreground/10 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="featured">Sort: Featured</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === c ? "bg-primary text-primary-foreground" : "ring-1 ring-foreground/15 hover:bg-primary/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No products match your search.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
