/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ReviewsSpotlightSection } from './components/ReviewsSpotlightSection';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { BUSINESS_INFO } from './data/products';
import { Product, ProductCategory, OrderDetails } from './types';
import { MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

function MainShop() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const cleanSearch = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !cleanSearch ||
        p.name.toLowerCase().includes(cleanSearch) ||
        p.tagline.toLowerCase().includes(cleanSearch) ||
        p.description.toLowerCase().includes(cleanSearch) ||
        p.category.toLowerCase().includes(cleanSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleOrderCompleted = (order: OrderDetails) => {
    console.log('Order successfully placed:', order.orderId);
  };

  const handleScrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero onExploreProducts={handleScrollToProducts} />

        {/* Product Catalog Section */}
        <section id="products" className="py-14 sm:py-20 bg-sky-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Category Filter Controls */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />

            {/* Active search filter banner */}
            {searchQuery && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-sky-100 text-xs text-slate-700 shadow-sm">
                <span>
                  Showing results for: <strong className="text-sky-600">"{searchQuery}"</strong> ({filteredProducts.length} items found)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sky-600 hover:underline font-semibold cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-sky-100 shadow-sm p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mx-auto text-sky-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No accessories matched</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Try clearing your search query or choosing another category like Chargers, Cables, or Audio Devices.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-sky-600 text-white font-bold rounded-lg text-xs hover:bg-sky-500 transition-colors shadow-sm cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Customer Reviews Spotlight Section */}
        <ReviewsSpotlightSection
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section with Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Product Detail & Review Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Admin Panel Portal Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
          'Salam A.M Accessories! I want to inquire about a product or place an order.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-neutral-950" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300 text-neutral-950">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <ReviewsProvider>
        <CartProvider>
          <MainShop />
        </CartProvider>
      </ReviewsProvider>
    </ProductProvider>
  );
}
