import React from 'react';
import { Shield, Sparkles, HeartHandshake, CheckCircle2, Award, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 border border-sky-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              About Our Store
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600">
                {BUSINESS_INFO.name}
              </span>
            </h2>

            <p className="text-base text-sky-700 font-bold italic">
              "{BUSINESS_INFO.tagline}"
            </p>

            {/* About Us paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {BUSINESS_INFO.aboutParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Performance & Durability
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Affordable Pakistani Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Friendly Customer Service
              </span>
            </div>
          </div>

          {/* Right Column: Key Pillars / Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/80 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dispatch Headquarters
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    Karachi, Sindh, Pakistan
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-sky-100 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wide">
                  <Award className="w-4 h-4 text-sky-600" />
                  <span>Our Product Standard</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every power bank, fast charger, Type-C cable, and earbud is batch-tested for thermal stability, real battery capacity, and charging speeds before listing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-sky-100 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Customer First Commitment</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We believe in building long-term connections. If you ever experience any technical defect, our 7-day replacement policy and WhatsApp support ensure complete peace of mind.
                </p>
              </div>

              <div className="pt-2 text-xs text-center text-slate-500 font-medium">
                Delivering to Karachi, Lahore, Islamabad, Peshawar, Quetta & 300+ towns nationwide.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
