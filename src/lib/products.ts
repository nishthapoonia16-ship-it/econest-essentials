import mug from "@/assets/p-mug.jpg";
import throwImg from "@/assets/p-throw.jpg";
import carafe from "@/assets/p-carafe.jpg";
import cutlery from "@/assets/p-cutlery.jpg";
import board from "@/assets/p-board.jpg";
import soap from "@/assets/p-soap.jpg";
import vase from "@/assets/p-vase.jpg";
import towels from "@/assets/p-towels.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  featured?: boolean;
};

export const CATEGORIES = ["Ceramics", "Textiles", "Kitchen", "Bath", "Glass"] as const;

export const PRODUCTS: Product[] = [
  { id: "mug", name: "Speckled Stoneware Mug", price: 34, category: "Ceramics", rating: 4.8, image: mug, featured: true },
  { id: "throw", name: "Oat Linen Throw", price: 89, category: "Textiles", rating: 4.9, image: throwImg, featured: true },
  { id: "carafe", name: "Amber Glass Carafe", price: 52, category: "Glass", rating: 4.7, image: carafe, featured: true },
  { id: "cutlery", name: "Bamboo Travel Cutlery", price: 22, category: "Kitchen", rating: 4.6, image: cutlery },
  { id: "board", name: "Reclaimed Walnut Board", price: 64, category: "Kitchen", rating: 4.9, image: board },
  { id: "soap", name: "Olive Soap & Sisal Brush", price: 28, category: "Bath", rating: 4.5, image: soap },
  { id: "vase", name: "Terracotta Bud Vase", price: 46, category: "Ceramics", rating: 4.7, image: vase },
  { id: "towels", name: "Organic Waffle Towel Set", price: 72, category: "Textiles", rating: 4.8, image: towels },
];
