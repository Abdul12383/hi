import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ThumbsUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewsContext';
import { BUSINESS_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const { addToCart } = useCart();
  const { getProductReviews, getProductRatingInfo, addReview, likeReview } = useReviews();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review Form States
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState('');

  if (!product) return null;

  const ratingInfo = getProductRatingInfo(product.id);
  const productReviews = getProductReviews(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = `Hi A.M Accessories! I would like to order:
- Product: ${product.name}
- Quantity: ${quantity}
- Total Price: Rs. ${(product.price * quantity).toLocaleString()}
Please confirm availability and dispatch to my address.`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError('Please provide your name and review message.');
      return;
    }

    addReview({
      productId: product.id,
      authorName: reviewName,
      authorCity: reviewCity.trim() || 'Karachi',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Verified Customer Review',
      comment: reviewComment,
      verifiedPurchase: true
    });

    setReviewSubmitted(true);
    setReviewName('');
    setReviewCity('');
    setReviewTitle('');
    setReviewComment('');
    setReviewError('');
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
      setActiveTab('reviews');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-sky-100 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/90 hover:bg-sky-100 border border-sky-100 rounded-full transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Product Image */}
          <div className="md:col-span-5 bg-sky-50/50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-sky-100">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-sky-200/80">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/95 text-sky-700 text-xs font-semibold uppercase tracking-wider border border-sky-200">
                {product.category}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>7 Days Replacement & Functional Warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Nationwide Pakistan Delivery (3–5 Working Days)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Cash on Delivery (COD) / JazzCash / Easypaisa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Cart Actions & Reviews */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">Ready to Ship from Karachi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-sky-700 mt-1 font-medium">
                {product.tagline}
              </p>

              {/* Rating summary clickable to jump to reviews tab */}
              <div
                onClick={() => setActiveTab('reviews')}
                className="flex items-center gap-2 mt-2.5 text-xs cursor-pointer group"
              >
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(ratingInfo.average)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 font-bold text-slate-900">
                    {ratingInfo.average.toFixed(1)}
                  </span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 group-hover:text-sky-600 transition-colors underline">
                  {ratingInfo.count} verified customer {ratingInfo.count === 1 ? 'review' : 'reviews'}
                </span>
              </div>

              {/* Price section */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Special Offer
                </span>
              </div>
            </div>

            {/* Navigation Tabs: Details vs Customer Reviews */}
            <div className="flex border-b border-sky-100 mt-6 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 text-xs font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Product Details & Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 px-3 text-xs font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-sky-700 border-b-2 border-sky-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({ratingInfo.count})
              </button>
            </div>

            {/* Tab 1: Product Details */}
            {activeTab === 'details' && (
              <div className="space-y-5 text-slate-700 text-xs sm:text-sm">
                <p className="leading-relaxed text-slate-600">
                  {product.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Technical Specifications
                  </h4>
                  <div className="border border-sky-100 rounded-lg overflow-hidden text-xs">
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex py-2 px-3 ${
                          idx % 2 === 0 ? 'bg-sky-50/50' : 'bg-white'
                        }`}
                      >
                        <span className="w-1/3 text-slate-500 font-medium">{key}</span>
                        <span className="w-2/3 text-slate-900 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Action Bar */}
                <div className="pt-4 border-t border-sky-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-sky-200 rounded-lg bg-white p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 text-sm font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-md shadow-sky-500/20"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart · Rs. {(product.price * quantity).toLocaleString()}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Order Directly via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Reviews & Ratings */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Aggregate Summary */}
                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-3xl font-extrabold text-slate-900">
                      {ratingInfo.average.toFixed(1)}
                      <span className="text-sm font-normal text-slate-500"> / 5.0</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start text-amber-500 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(ratingInfo.average)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Based on {ratingInfo.count} verified customer ratings
                    </div>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Review Submission Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="p-5 rounded-xl bg-sky-50/60 border border-sky-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-600" />
                        <span>Leave Your Review & Rating</span>
                      </h4>
                      <span className="text-[11px] text-slate-500">All reviews are verified</span>
                    </div>

                    {reviewError && (
                      <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                        {reviewError}
                      </div>
                    )}

                    {reviewSubmitted && (
                      <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Thank you! Your review has been submitted and published.</span>
                      </div>
                    )}

                    {/* Star Rating Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                (hoverRating || reviewRating) >= star
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-sky-700 ml-2">
                          {reviewRating} out of 5 Stars
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Asad Rehman"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Your City in Pakistan
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Karachi, Lahore, Rawalpindi"
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Outstanding sound and battery life"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Detailed Feedback & Experience *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell other Pakistani shoppers about build quality, performance, delivery, and overall satisfaction..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      Post Customer Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3.5">
                  {productReviews.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-sky-50/50 rounded-xl border border-sky-100">
                      No reviews yet for this product. Be the first to share your experience!
                    </div>
                  ) : (
                    productReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-sky-50/40 border border-sky-100 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {rev.authorName}
                            </span>
                            {rev.authorCity && (
                              <>
                                <span className="text-slate-300 text-xs">·</span>
                                <span className="text-[11px] text-slate-500">
                                  {rev.authorCity}
                                </span>
                              </>
                            )}
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                                Verified Buyer
                              </span>
                            )}
                          </div>

                          <div className="flex items-center text-slate-400 text-[11px]">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-semibold text-slate-900 ml-1">
                            {rev.title}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rev.comment}
                        </p>

                        <div className="pt-1 flex items-center justify-end">
                          <button
                            onClick={() => likeReview(rev.id)}
                            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Helpful ({rev.helpfulCount || 0})</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
