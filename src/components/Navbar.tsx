import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const linkBase = "px-3 py-2 rounded-lg transition-colors hover:bg-primary-foreground/10";
const active = { className: "bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground" };

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-40">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent" />
          EcoNest
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <Link to="/" className={linkBase} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/shop" className={linkBase} activeProps={active}>Shop</Link>
          <Link to="/cart" className={linkBase} activeProps={active}>
            Cart
            <span className="ml-1.5 inline-grid place-items-center min-w-5 h-5 px-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              {count}
            </span>
          </Link>
        </div>
      </nav>
      <div className="h-1 bg-accent" />
    </header>
  );
}
