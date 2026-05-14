/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, StarOff, Package, LayoutDashboard, Settings, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

// --- Types ---
interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  featured: boolean;
  inventory: number;
}

// --- Mock Data ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Verve Silk Serum",
    price: "$64.00",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    featured: true,
    inventory: 42,
  },
  {
    id: "2",
    title: "Shadow Bass Headphones",
    price: "$299.00",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
    featured: false,
    inventory: 15,
  },
  {
    id: "3",
    title: "Ethos Roast Coffee",
    price: "$28.00",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop",
    featured: true,
    inventory: 89,
  },
  {
    id: "4",
    title: "Artifact Ceramic Vase",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=600&auto=format&fit=crop",
    featured: false,
    inventory: 5,
  },
  {
    id: "5",
    title: "Nomad Wool Blanket",
    price: "$145.00",
    image: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?q=80&w=600&auto=format&fit=crop",
    featured: false,
    inventory: 24,
  },
  {
    id: "6",
    title: "Luma Desktop Lamp",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=600&auto=format&fit=crop",
    featured: false,
    inventory: 12,
  }
];

// --- Components ---

interface ProductCardProps {
  product: Product;
  onToggle: (id: string) => void;
  key?: React.Key;
}

function ProductCard({ product, onToggle }: ProductCardProps) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group relative cursor-default"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(product.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${
            product.featured 
              ? "bg-yellow-400 text-white scale-110" 
              : "bg-white/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-yellow-500"
          }`}
        >
          <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-gray-600">{product.price}</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${product.inventory < 10 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
            <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">{product.inventory}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const featured = products.filter(p => p.featured);
  const others = products.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#f1f1f1] font-sans selection:bg-black selection:text-white pb-12">
      {/* Shopify-like App Bar */}
      <nav className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Featured Pro</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <LayoutDashboard className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          <button className="text-sm font-medium text-black flex items-center gap-1">
            Open Store <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-8">
        {/* Web Component Representation: ui-title-bar */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">Select and curate products for your storefront hero section.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Import Products
            </button>
            <button className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>

        {/* Web Component Representation: ui-layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main List Section */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Featured Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Featured Showcase</h2>
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">
                  {featured.length} Products
                </span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {featured.length > 0 ? (
                    featured.map(product => (
                      <ProductCard key={product.id} product={product} onToggle={toggleFeatured} />
                    ))
                  ) : (
                    <div className="col-span-full py-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-white/50">
                      <StarOff className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No products featured yet.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* All Products Section */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 px-1">Other Inventory</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {others.map(product => (
                    <ProductCard key={product.id} product={product} onToggle={toggleFeatured} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            {/* Web Component Representation: ui-card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Curation Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Feature Slots</span>
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{featured.length} / 8</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(featured.length / 8) * 100}%` }}
                    className="bg-black h-full"
                  />
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-gray-500">Average Price</span>
                  <span className="font-bold text-gray-900">$74.25</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl text-white">
              <h3 className="font-bold mb-2">Pro Tip</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Featured products with high inventory levels perform 40% better in storefront banners. Consider featuring your bestsellers.
              </p>
              <button className="mt-4 w-full bg-white text-black text-xs font-bold py-2 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                View Insights
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
