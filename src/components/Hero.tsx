import React from 'react';
import { ArrowRight, Truck, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-sky-50/10 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-sky-100">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-400/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-cyan-400/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 border border-sky-200 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              Karachi, Sindh · Nationwide Delivery Across Pakistan
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Quality Accessories,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600">
                Better Connections.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Your trusted destination for premium mobile chargers, durable Type-C cables,
              true wireless earbuds, high-capacity power banks, and modern smartwatches.
              Genuine quality, competitive prices, and friendly Pakistani customer support.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 cursor-pointer text-sm"
              >
                <span>Shop Featured Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello A.M Accessories! I want to place an order or ask a question.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 hover:border-emerald-300 rounded-lg transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: {BUSINESS_INFO.whatsapp}</span>
              </a>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-sky-200/80">
              <div>
                <div className="text-xs text-slate-500">Payment</div>
                <div className="text-sm font-bold text-slate-900">Cash on Delivery</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Delivery</div>
                <div className="text-sm font-bold text-slate-900">3–5 Working Days</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Headquarters</div>
                <div className="text-sm font-bold text-slate-900">Karachi, Pakistan</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Warranty</div>
                <div className="text-sm font-bold text-slate-900">7-Day Replacement</div>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-sky-200/80 bg-white shadow-2xl shadow-sky-500/10 group">
              <img
                src={HERO_IMAGE}
                alt="A.M Accessories Premium Mobile Accessories Collection"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* In-image highlight tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-sky-100 flex items-center justify-between gap-3 shadow-lg">
                <div>
                  <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">
                    Authentic Guarantee
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    100% Quality Inspected Before Shipping
                  </div>
                </div>
                <span className="shrink-0 text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold">
                  Karachi Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-sky-200/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/90 border border-sky-100 shadow-sm">
            <div className="p-2.5 rounded-lg bg-sky-100 text-sky-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Nationwide Pakistan Delivery</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Fast courier delivery to Karachi, Lahore, Islamabad, and all cities in 3–5 working days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/90 border border-sky-100 shadow-sm">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Multiple Payment Options</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pay with Cash on Delivery (COD), Easypaisa, JazzCash, or online Bank Transfer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/90 border border-sky-100 shadow-sm">
            <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Tested Performance</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Every charger, cable, earbud, and power bank is bench-tested for safety and endurance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
