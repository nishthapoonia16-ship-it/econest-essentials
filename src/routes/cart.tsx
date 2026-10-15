import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { money, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — EcoNest Store" },
      { name: "description", content: "Review your EcoNest items, adjust quantities and check out." },
      { property: "og:title", content: "Your Cart — EcoNest Store" },
      { property: "og:description", content: "Review your EcoNest items, adjust quantities and check out." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 8;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center rise">
        <CheckCircle2 className="mx-auto size-14 text-primary" />
        <h1 className="mt-6 font-display font-bold text-4xl">Thank you!</h1>
        <p className="mt-3 text-muted-foreground">
          Order <span className="font-semibold text-foreground">#{order.id}</span> is confirmed — {money(order.total)} paid. It ships carbon-neutral in plastic-free packaging.
        </p>
        <Link to="/shop" className="mt-8 inline-flex bg-accent text-accent-foreground font-display font-semibold px-6 py-3 rounded-lg transition-transform hover:-translate-y-0.5">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-4xl sm:text-5xl rise">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-12 text-center py-16 rounded-2xl ring-1 ring-foreground/10 bg-card">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="mt-6 inline-flex bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-accent transition-colors">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-3">
            {lines.map(({ id, qty, product }) => (
              <div key={id} className="flex items-center gap-4 rounded-2xl bg-card ring-1 ring-foreground/5 p-3 transition-shadow hover:shadow-lift">
                <img src={product.image} alt={product.name} loading="lazy" width={80} height={80} className="size-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wide text-moss font-medium">{product.category}</p>
                  <p className="font-display font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{money(product.price)}</p>
                </div>
                <div className="flex items-center rounded-lg ring-1 ring-foreground/15">
                  <button aria-label="Decrease" onClick={() => setQty(id, qty - 1)} className="p-2 hover:text-accent"><Minus className="size-4" /></button>
                  <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(id, qty + 1)} className="p-2 hover:text-accent"><Plus className="size-4" /></button>
                </div>
                <span className="hidden sm:block w-20 text-right font-display font-semibold">{money(qty * product.price)}</span>
                <button aria-label="Remove" onClick={() => remove(id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-primary text-primary-foreground p-6 sticky top-24">
              <p className="font-display font-semibold text-lg">Order summary</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="opacity-70">Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="opacity-70">Shipping</dt><dd>{shipping === 0 ? "Free" : money(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="opacity-70">Tax (8%)</dt><dd>{money(tax)}</dd></div>
                <div className="flex justify-between border-t border-primary-foreground/20 pt-3 text-base font-display font-bold">
                  <dt>Total</dt><dd>{money(total)}</dd>
                </div>
              </dl>
              {shipping > 0 && <p className="mt-3 text-xs opacity-70">Free shipping on orders over $100.</p>}
              <button
                onClick={() => {
                  setOrder({ id: `EN-${Math.floor(1000 + Math.random() * 9000)}`, total });
                  clear();
                }}
                className="mt-6 w-full bg-accent text-accent-foreground font-display font-semibold py-3 rounded-lg transition-transform hover:-translate-y-0.5"
              >
                Proceed to Checkout →
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
