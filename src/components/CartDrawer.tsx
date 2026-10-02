import React from 'react';
import { X, Trash2, ArrowRight, MessageSquare, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/products';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    total,
    freeShippingProgress,
    amountNeededForFreeShipping
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - Rs. ${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const msg = `Hi A.M Accessories! I would like to order the following items:
${itemsList}

Subtotal: Rs. ${subtotal.toLocaleString()}
Delivery Fee: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
Total Amount: Rs. ${total.toLocaleString()}
Payment Method: Cash on Delivery

Please confirm my order.`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-sky-100 text-slate-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">Your Shopping Bag</h2>
              <span className="text-xs text-slate-500 font-medium">
                ({cart.reduce((a, b) => a + b.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-sky-50/70 border-b border-sky-100 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-sky-600" />
                    Add <strong className="text-sky-700">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE delivery
                  </span>
                  <span className="font-semibold text-slate-500">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked FREE Nationwide Delivery in Pakistan! 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Your bag is empty</p>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover genuine mobile chargers, wireless earbuds, smart watches and high capacity power banks.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-lg hover:bg-sky-500 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-sky-50/40 border border-sky-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-white border border-sky-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-sky-600 uppercase font-semibold mt-0.5">
                        {item.product.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-sky-100">
                      <div className="flex items-center border border-sky-200 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-sky-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery (Pakistan)</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-sky-100">
                  <span>Total Amount</span>
                  <span className="text-base text-sky-700">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  <span>Proceed to Online Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCartOrder}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Order Entire Bag on WhatsApp</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-500 pt-1 font-medium">
                Cash on Delivery · Easypaisa · JazzCash · Bank Transfer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
