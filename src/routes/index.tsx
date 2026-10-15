import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoNest Store — Sustainable Home Goods" },
      { name: "description", content: "Thoughtfully made ceramics, linen, glass and wood for a slower, greener home." },
      { property: "og:title", content: "EcoNest Store — Sustainable Home Goods" },
      { property: "og:description", content: "Thoughtfully made ceramics, linen, glass and wood for a slower, greener home." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <>
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-accent font-display font-semibold text-xs uppercase tracking-[0.2em] rise">EcoNest Store · Sustainable home goods</p>
            <h1 className="mt-4 font-display font-bold leading-[0.92] text-5xl sm:text-6xl lg:text-7xl max-w-[20ch] text-balance rise rise-1">
              Small rituals, rooted in the living home.
            </h1>
            <p className="mt-6 text-primary-foreground/70 max-w-[46ch] text-pretty rise rise-2">
              Thoughtfully made from reclaimed fibre and slow-grown clay. Built for everyday, designed to last for years.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 rise rise-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to="/shop"
                  search={{ category: c }}
                  className="px-3 py-1.5 rounded-full border border-primary-foreground/25 text-xs font-medium transition-colors hover:bg-primary-foreground hover:text-primary"
                >
                  {c}
                </Link>
              ))}
            </div>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-accent text-accent-foreground font-display font-semibold px-6 py-3.5 rounded-lg rounded-br-2xl transition-transform hover:-translate-y-0.5 rise rise-3"
            >
              Shop now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="lg:col-span-5 rise rise-2">
            <img src={hero} alt="Handmade ceramic bowls and linen on oak" width={1024} height={1280} className="w-full aspect-[4/5] object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display font-semibold text-3xl text-balance">Featured pieces</h2>
          <Link to="/shop" className="text-sm font-medium text-primary underline underline-offset-4 decoration-accent">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
