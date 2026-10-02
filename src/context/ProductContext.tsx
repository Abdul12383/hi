import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { INITIAL_PRODUCTS, BUSINESS_INFO } from '../data/products';

export interface StoreSettings {
  freeShippingThreshold: number;
  shippingFee: number;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
}

interface ProductContextType {
  products: Product[];
  settings: StoreSettings;
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefault: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'am_accessories_products_v2';
const SETTINGS_STORAGE_KEY = 'am_accessories_settings_v2';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Force update threshold if it was old default 5000
        if (parsed.freeShippingThreshold === 5000) {
          parsed.freeShippingThreshold = BUSINESS_INFO.freeShippingThreshold;
        }
        // Force update whatsapp if it was old default number
        if (!parsed.whatsapp || parsed.whatsapp.includes('3410219550')) {
          parsed.whatsapp = BUSINESS_INFO.whatsapp;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading settings from storage:', e);
    }
    return {
      freeShippingThreshold: BUSINESS_INFO.freeShippingThreshold,
      shippingFee: BUSINESS_INFO.shippingFee,
      email: BUSINESS_INFO.email,
      phone: BUSINESS_INFO.phone,
      whatsapp: BUSINESS_INFO.whatsapp,
      location: BUSINESS_INFO.location
    };
  });

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to storage:', e);
    }
  }, [products]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings to storage:', e);
    }
  }, [settings]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const editProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings({
      freeShippingThreshold: BUSINESS_INFO.freeShippingThreshold,
      shippingFee: BUSINESS_INFO.shippingFee,
      email: BUSINESS_INFO.email,
      phone: BUSINESS_INFO.phone,
      whatsapp: BUSINESS_INFO.whatsapp,
      location: BUSINESS_INFO.location
    });
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        settings,
        addProduct,
        editProduct,
        deleteProduct,
        toggleStock,
        updateSettings,
        resetToDefault
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
