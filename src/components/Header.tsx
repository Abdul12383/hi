import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/products';

interface HeaderProps {
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTracking,
  onOpenAdmin,
  onSearchChange,
  searchQuery
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-xs py-2 px-4 text-center text-white flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-medium text-sky-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
          Nationwide Cash on Delivery
        </span>
        <span className="text-sky-300/60 hidden sm:inline">·</span>
        <span className="hidden sm:inline text-sky-100">Dispatches from Karachi in 24h</span>
        <span className="text-sky-300/60 hidden md:inline">·</span>
        <span className="hidden md:inline text-sky-100 font-semibold">
          Free Delivery on orders above Rs. {BUSINESS_INFO.freeShippingThreshold.toLocaleString()}
        </span>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 hover:text-sky-600 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
              AM
            </span>
            <span className="tracking-wider uppercase font-extrabold text-lg sm:text-xl text-slate-900">
              {BUSINESS_INFO.name}
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#products" className="hover:text-sky-600 transition-colors">
            Products
          </a>
          <a href="#categories" className="hover:text-sky-600 transition-colors">
            Categories
          </a>
          <a href="#about" className="hover:text-sky-600 transition-colors">
            About Us
          </a>
          <a href="#reviews-spotlight" className="hover:text-sky-600 transition-colors">
            Customer Reviews
          </a>
          <a href="#contact" className="hover:text-sky-600 transition-colors">
            Contact Us
          </a>
          <button
            onClick={onOpenTracking}
            className="text-slate-600 hover:text-sky-600 font-semibold transition-colors cursor-pointer text-sm"
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: Primary controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Panel Launch Button */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-sky-800 bg-sky-100/80 border border-sky-300 hover:bg-sky-200 transition-colors rounded-lg cursor-pointer shadow-sm shrink-0"
            title="Open Store Admin Portal"
          >
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </button>
          {/* Search bar toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-sky-50 border border-sky-200 rounded-lg px-2.5 py-1">
                <Search className="w-4 h-4 text-sky-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Search accessories..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none px-2 w-32 sm:w-44"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-slate-400 hover:text-slate-700 text-xs p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                title="Search Products"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
              'Hi A.M Accessories! I would like to inquire about your mobile accessories.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            title="Chat with us on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-all shadow-md shadow-sky-500/20 cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-white text-sky-700 text-xs font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-sky-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="pb-3 border-b border-sky-100">
            <input
              type="text"
              placeholder="Search ear buds, chargers, cables..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-sky-50/70 border border-sky-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-sky-600"
            >
              All Products
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-sky-600"
            >
              Categories
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-sky-600"
            >
              About A.M Accessories
            </a>
            <a
              href="#reviews-spotlight"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-sky-600"
            >
              Customer Reviews & Ratings
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-sky-600"
            >
              Contact & Inquiry Form
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="text-left py-1.5 text-sky-600 font-bold"
            >
              Track Your Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left py-1.5 text-slate-800 font-extrabold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Admin Portal Access</span>
            </button>
          </div>
          <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              {BUSINESS_INFO.phone}
            </span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-bold"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
