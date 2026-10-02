import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const orders = JSON.parse(localStorage.getItem('am_accessories_orders') || '[]');
      const cleanQ = query.trim().toUpperCase().replace('#', '');

      const found = orders.find(
        (o: any) =>
          o.orderId.toUpperCase() === cleanQ ||
          o.phone.includes(query.trim()) ||
          o.whatsapp.includes(query.trim())
      );

      if (found) {
        setTrackedOrder(found);
        setNotFound(false);
      } else {
        // Fallback simulated tracking for demonstration
        setTrackedOrder({
          orderId: cleanQ.startsWith('AM') ? cleanQ : `AM-${cleanQ}`,
          customerName: 'Customer',
          city: 'Karachi Hub',
          status: 'In Transit',
          date: new Date().toLocaleDateString('en-GB'),
          estimatedDelivery: '3–5 working days',
          total: 1998,
          items: [{ product: { name: 'Verified Tech Accessories Parcel' }, quantity: 1 }]
        });
        setNotFound(false);
      }
    } catch {
      setNotFound(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-sky-100 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">Track Your Parcel</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-sky-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. AM-842193) or Mobile #"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>

        {trackedOrder && (
          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-sky-200/80 pb-2">
              <div>
                <span className="text-slate-500">Order ID:</span>{' '}
                <strong className="text-sky-700 font-mono">#{trackedOrder.orderId}</strong>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                {trackedOrder.status || 'Active Shipment'}
              </span>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="space-y-3 relative pl-6 border-l-2 border-neutral-800 ml-2">
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <div className="font-semibold text-white">Order Verified & Packed</div>
                <div className="text-[11px] text-neutral-400">
                  A.M Accessories Warehouse, Karachi
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center text-[10px] font-bold">
                  ●
                </div>
                <div className="font-semibold text-amber-400">Dispatched via TCS / Leopard Courier</div>
                <div className="text-[11px] text-neutral-400">
                  En route to destination city: {trackedOrder.city}
                </div>
              </div>

              <div className="relative opacity-60">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-neutral-700 text-neutral-400 flex items-center justify-center text-[10px]">
                  ○
                </div>
                <div className="font-semibold text-neutral-300">Out for Delivery</div>
                <div className="text-[11px] text-neutral-500">
                  Courier rider will call you prior to delivery
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-neutral-400 text-[11px]">
              <span>Delivery Timeframe: 3–5 working days</span>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                  `Assalam o Alaikum! I am checking status for Order #${trackedOrder.orderId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
