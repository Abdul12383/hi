import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  ArrowRight,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentMethod, OrderDetails } from '../types';
import { BUSINESS_INFO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: OrderDetails) => void;
}

const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Other City'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const { cart, subtotal, shippingFee, total, clearCart } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [customCity, setCustomCity] = useState('');
  const [province, setProvince] = useState('Sindh');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  // Confirmation state
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    const finalCity = city === 'Other City' ? (customCity.trim() || 'Pakistan') : city;
    const orderId = `AM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderDetails = {
      orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      address: address.trim(),
      city: finalCity,
      province,
      paymentMethod,
      items: [...cart],
      subtotal,
      shippingFee,
      total,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Confirmed'
    };

    // Store in localStorage for Order Tracking Simulator
    try {
      const existingOrders = JSON.parse(
        localStorage.getItem('am_accessories_orders') || '[]'
      );
      localStorage.setItem(
        'am_accessories_orders',
        JSON.stringify([newOrder, ...existingOrders])
      );
    } catch (e) {
      console.error(e);
    }

    setConfirmedOrder(newOrder);
    onOrderCompleted(newOrder);
    clearCart();
  };

  const copyBankDetails = () => {
    const text = `A.M ACCESSORIES Bank Transfer Details:

1. BankIslami Pakistan Limited:
Title: ${BUSINESS_INFO.bankDetails.bankIslami.accountTitle}
Account #: ${BUSINESS_INFO.bankDetails.bankIslami.accountNumber}
IBAN: ${BUSINESS_INFO.bankDetails.bankIslami.iban}

2. Meezan Bank Limited:
Title: ${BUSINESS_INFO.bankDetails.meezanBank.accountTitle}
Account #: ${BUSINESS_INFO.bankDetails.meezanBank.accountNumber}
IBAN: ${BUSINESS_INFO.bankDetails.meezanBank.iban}

Order ID: ${confirmedOrder?.orderId || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(true);
    setTimeout(() => setCopiedBankInfo(false), 2000);
  };

  const sendWhatsAppConfirmation = () => {
    if (!confirmedOrder) return;
    const itemsList = confirmedOrder.items
      .map((item) => `- ${item.product.name} (x${item.quantity})`)
      .join('\n');

    const msg = `Salam A.M Accessories! I just placed an order online:
📦 Order ID: ${confirmedOrder.orderId}
👤 Name: ${confirmedOrder.customerName}
📞 Phone: ${confirmedOrder.phone}
📍 Address: ${confirmedOrder.address}, ${confirmedOrder.city}, ${confirmedOrder.province}
💰 Total: Rs. ${confirmedOrder.total.toLocaleString()}
💳 Payment Method: ${confirmedOrder.paymentMethod.toUpperCase()}

Items:
${itemsList}

Please dispatch my order!`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-sky-100 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sky-100 flex items-center justify-between bg-sky-50/70">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {confirmedOrder ? 'Order Confirmation' : 'Complete Your Order'}
            </h3>
            <p className="text-xs text-slate-600">
              {confirmedOrder
                ? 'Thank you for choosing A.M Accessories!'
                : 'Nationwide delivery across Pakistan · Estimated 3–5 working days'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-sky-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {confirmedOrder ? (
            /* Order Success View */
            <div className="space-y-5 text-center sm:text-left">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-neutral-300">
                  Your Order Reference:{' '}
                  <strong className="text-amber-400 font-mono text-sm">
                    #{confirmedOrder.orderId}
                  </strong>
                </p>
                <div className="inline-block px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-xs text-neutral-300">
                  Estimated Delivery: <strong>3–5 working days</strong> via courier to{' '}
                  <span className="text-amber-300">{confirmedOrder.city}</span>
                </div>
              </div>

              {/* Payment specific details */}
              {confirmedOrder.paymentMethod === 'cod' ? (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-400" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p>
                    Please keep <strong>Rs. {confirmedOrder.total.toLocaleString()}</strong> ready in cash when the courier arrives at your doorstep in {confirmedOrder.city}.
                  </p>
                </div>
              ) : confirmedOrder.paymentMethod === 'easypaisa' ? (
                <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-800 text-xs text-neutral-300 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>Easypaisa Payment Instructions</span>
                  </div>
                  <p>
                    Please send <strong>Rs. {confirmedOrder.total.toLocaleString()}</strong> to:
                  </p>
                  <div className="p-2.5 rounded bg-neutral-900 font-mono text-xs text-white">
                    Easypaisa Account: <strong>{BUSINESS_INFO.easypaisaNumber}</strong>
                    <br />
                    Account Title: <strong>Abdul Mutaal / A.M Accessories</strong>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    After sending, share a screenshot of the transaction via WhatsApp for instant processing.
                  </p>
                </div>
              ) : confirmedOrder.paymentMethod === 'jazzcash' ? (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-800 text-xs text-neutral-300 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>JazzCash Payment Instructions</span>
                  </div>
                  <p>
                    Please send <strong>Rs. {confirmedOrder.total.toLocaleString()}</strong> to:
                  </p>
                  <div className="p-2.5 rounded bg-neutral-900 font-mono text-xs text-white">
                    JazzCash Account: <strong>{BUSINESS_INFO.jazzcashNumber}</strong>
                    <br />
                    Account Title: <strong>Abdul Mutaal / A.M Accessories</strong>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Send the TID screenshot via WhatsApp to confirm dispatch.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-neutral-950 border border-blue-800 text-xs text-neutral-300 space-y-3">
                  <div className="flex items-center justify-between font-bold text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-emerald-400" />
                      <span>Direct Bank Transfer Details</span>
                    </span>
                    <button
                      onClick={copyBankDetails}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBankInfo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBankInfo ? 'Copied All' : 'Copy All Details'}</span>
                    </button>
                  </div>

                  {/* Bank Islami Box */}
                  <div className="p-3 rounded-lg bg-neutral-900 border border-emerald-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-xs">BankIslami Pakistan Limited</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                        Primary
                      </span>
                    </div>
                    <div className="font-mono text-xs text-white space-y-0.5 pt-1">
                      <div>Title: <strong>{BUSINESS_INFO.bankDetails.bankIslami.accountTitle}</strong></div>
                      <div>Account #: <strong>{BUSINESS_INFO.bankDetails.bankIslami.accountNumber}</strong></div>
                      <div>IBAN: <strong>{BUSINESS_INFO.bankDetails.bankIslami.iban}</strong></div>
                    </div>
                  </div>

                  {/* Meezan Bank Box */}
                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-300 text-xs">Meezan Bank Limited</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        Secondary
                      </span>
                    </div>
                    <div className="font-mono text-xs text-white space-y-0.5 pt-1">
                      <div>Title: <strong>{BUSINESS_INFO.bankDetails.meezanBank.accountTitle}</strong></div>
                      <div>Account #: <strong>{BUSINESS_INFO.bankDetails.meezanBank.accountNumber}</strong></div>
                      <div>IBAN: <strong>{BUSINESS_INFO.bankDetails.meezanBank.iban}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Items breakdown */}
              <div className="border border-neutral-800 rounded-xl p-3 bg-neutral-950 text-xs space-y-2">
                <div className="font-bold text-white mb-1">Order Summary:</div>
                {confirmedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-neutral-300">
                    <span>{it.product.name} × {it.quantity}</span>
                    <span className="font-semibold text-white">
                      Rs. {(it.product.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-neutral-850 flex justify-between font-bold text-amber-400 text-sm">
                  <span>Grand Total</span>
                  <span>Rs. {confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={sendWhatsAppConfirmation}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp ({BUSINESS_INFO.whatsapp})</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Shipping Address Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  1. Delivery Details (Pakistan)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Rehman"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Mobile Number (for delivery rider call) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      WhatsApp Number (for dispatch tracking updates)
                    </label>
                    <input
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      City in Pakistan *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {city === 'Other City' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Enter Your City Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type your Pakistani city/town..."
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Complete Street Address (House / Flat #, Street, Area) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. House # 42, Street 8, Sector 11-B, North Karachi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-3 pt-3 border-t border-neutral-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  2. Select Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-amber-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-amber-400" />
                        <span>Cash on Delivery</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Pay cash when you receive the parcel
                      </div>
                    </div>
                  </label>

                  {/* Easypaisa */}
                  <label
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-400 bg-emerald-400/10'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="mt-0.5 text-emerald-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Easypaisa Mobile</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Instant transfer via {BUSINESS_INFO.easypaisaNumber}
                      </div>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-400 bg-red-400/10'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="mt-0.5 text-red-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-red-400" />
                        <span>JazzCash Wallet</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Send to JazzCash 03410219550
                      </div>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-0.5 text-blue-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-400" />
                        <span>BankIslami / Meezan Bank</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Direct online IBFT / ATM Bank Transfer
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary & Submit button */}
              <div className="pt-3 border-t border-neutral-850 space-y-3">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-neutral-400">
                    <span>Items Subtotal</span>
                    <span className="text-white font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Courier Delivery</span>
                    <span className="text-white font-medium">
                      {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `Rs. ${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-neutral-850">
                    <span>Payable Total:</span>
                    <span className="text-amber-400 text-base">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  <span>Confirm Order · Rs. {total.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
