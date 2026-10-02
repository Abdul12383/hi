import React from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewsContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const { getProductRatingInfo } = useReviews();
  const ratingInfo = getProductRatingInfo(product.id);

  const [justAdded, setJustAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-sky-200/80 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-sky-50/60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Marker */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-md border border-sky-200 rounded text-[11px] font-bold text-sky-700 shadow-sm">
            Save {discountPercent}%
          </div>
        )}

        {/* Quick View Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-lg bg-white/95 text-slate-700 border border-sky-200 hover:bg-sky-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-md"
          title="Quick View & Reviews"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Stock status */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="uppercase tracking-wider font-bold text-[11px] text-sky-600">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            In Stock
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Tagline / short description */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
          {product.tagline}
        </p>

        {/* Average Rating Display */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ml-1 font-bold text-slate-900 text-xs">
              {ratingInfo.average.toFixed(1)}
            </span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 text-xs">
            {ratingInfo.count} {ratingInfo.count === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Rs. {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-slate-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-100 hover:bg-sky-600 hover:text-white text-sky-800'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
