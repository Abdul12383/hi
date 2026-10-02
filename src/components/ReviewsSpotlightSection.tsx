import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, ThumbsUp, Filter, MessageSquareQuote } from 'lucide-react';
import { useReviews } from '../context/ReviewsContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ReviewsSpotlightSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const ReviewsSpotlightSection: React.FC<ReviewsSpotlightSectionProps> = ({
  onSelectProduct
}) => {
  const { reviews, likeReview } = useReviews();
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === selectedRatingFilter;
  });

  const totalReviewsCount = reviews.length;
  const averageTotal =
    totalReviewsCount > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
      : '5.0';

  return (
    <section id="reviews-spotlight" className="py-16 sm:py-20 bg-sky-100/30 border-t border-sky-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              Real Pakistani Shopper Feedback
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews & Ratings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
              Honest ratings from verified customers across Karachi, Lahore, Islamabad, Rawalpindi, and Peshawar.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sky-200/80 shadow-sm">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>{averageTotal}</span>
                <div className="flex text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {totalReviewsCount} Verified Reviews
              </div>
            </div>

            {/* Filter buttons */}
            <div className="border-l border-sky-100 pl-4 flex items-center gap-1">
              <button
                onClick={() => setSelectedRatingFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  selectedRatingFilter === 'all'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedRatingFilter(5)}
                className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  selectedRatingFilter === 5
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
              >
                5★
              </button>
              <button
                onClick={() => setSelectedRatingFilter(4)}
                className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  selectedRatingFilter === 4
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
              >
                4★
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.slice(0, 6).map((rev) => {
            const product = INITIAL_PRODUCTS.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white border border-sky-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-sky-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500">
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
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {rev.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                    "{rev.title}"
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rev.authorName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{rev.authorCity || 'Pakistan'}</span>
                    </div>
                  </div>

                  {product && (
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-[11px] text-sky-600 font-bold hover:underline max-w-[120px] truncate text-right cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
