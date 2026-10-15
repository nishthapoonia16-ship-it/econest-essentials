import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="group bg-card ring-1 ring-foreground/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-moss uppercase tracking-wide">{product.category}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-foreground/60">
            <Star className="size-3.5 fill-accent text-accent" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-1 font-display font-medium text-lg">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display font-semibold">${product.price}</span>
          <button
            onClick={() => {
              add(product.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className="text-sm font-semibold rounded-lg px-3 py-1.5 bg-primary text-primary-foreground transition-colors hover:bg-accent"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
