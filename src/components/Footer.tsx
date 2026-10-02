import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, ShieldCheck, Truck, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs">
      {/* Upper Footer: Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">Cash on Delivery</div>
            <p className="text-slate-400">Available across all Pakistani cities & towns</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">3–5 Days Delivery</div>
            <p className="text-slate-400">Fast courier dispatch from Karachi warehouse</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">7 Days Guarantee</div>
            <p className="text-slate-400">Hassle-free replacement for any defect</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">Friendly Support</div>
            <p className="text-slate-400">Direct WhatsApp & phone assistance</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-xs">
                AM
              </span>
              <span className="text-base font-extrabold text-white tracking-wider uppercase">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-sky-300 text-xs italic font-medium">
              "{BUSINESS_INFO.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted destination for premium mobile accessories and everyday tech essentials. Dedicated to high-quality products that combine performance, durability, and affordability.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Chargers
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Cables
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Audio Devices
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Wearables
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Mobile Holders
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-300 transition-colors">
                  Other Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Delivery Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Accepted Payments
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200">
                • Cash on Delivery (COD)
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200">
                • Easypaisa & JazzCash (03410219550)
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200">
                • Bank Transfer (BankIslami & Meezan Bank)
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-sky-300">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300"
                >
                  WhatsApp: {BUSINESS_INFO.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-sky-300">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Karachi, Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-sky-300">About Us</a>
            <a href="#contact" className="hover:text-sky-300">Contact Us</a>
            <a href="#products" className="hover:text-sky-300">Shop Catalog</a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-sky-300 font-bold text-sky-400 cursor-pointer"
              >
                Admin Portal
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
