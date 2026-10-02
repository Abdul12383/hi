import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductReview } from '../types';
import { INITIAL_REVIEWS } from '../data/products';

interface NewReviewInput {
  productId: string;
  authorName: string;
  authorCity?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase?: boolean;
}

interface ReviewsContextType {
  reviews: ProductReview[];
  getProductReviews: (productId: string) => ProductReview[];
  getProductRatingInfo: (productId: string) => {
    average: number;
    count: number;
    distribution: Record<number, number>;
  };
  addReview: (input: NewReviewInput) => void;
  likeReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const REVIEWS_STORAGE_KEY = 'am_accessories_reviews_v1';

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  const getProductReviews = (productId: string) => {
    return reviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getProductRatingInfo = (productId: string) => {
    const prodReviews = reviews.filter((r) => r.productId === productId);
    const count = prodReviews.length;
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (count === 0) {
      return { average: 5.0, count: 0, distribution };
    }

    let sum = 0;
    prodReviews.forEach((r) => {
      sum += r.rating;
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      distribution[rounded] = (distribution[rounded] || 0) + 1;
    });

    const average = parseFloat((sum / count).toFixed(1));
    return { average, count, distribution };
  };

  const addReview = (input: NewReviewInput) => {
    const newRev: ProductReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: input.productId,
      authorName: input.authorName.trim(),
      authorCity: input.authorCity?.trim() || 'Verified Buyer, Pakistan',
      rating: Math.min(5, Math.max(1, input.rating)),
      date: new Date().toISOString().split('T')[0],
      title: input.title.trim(),
      comment: input.comment.trim(),
      verifiedPurchase: input.verifiedPurchase ?? true,
      helpfulCount: 0
    };

    setReviews((prev) => [newRev, ...prev]);
  };

  const likeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 }
          : r
      )
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        getProductReviews,
        getProductRatingInfo,
        addReview,
        likeReview,
        deleteReview
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
