import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Lock,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Truck,
  MessageSquare,
  Search,
  RefreshCw,
  AlertCircle,
  Eye,
  Building,
  Save,
  DollarSign,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useReviews } from '../context/ReviewsContext';
import { OrderDetails, Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    products,
    settings,
    addProduct,
    editProduct,
    deleteProduct,
    toggleStock,
    updateSettings,
    resetToDefault
  } = useProducts();

  const { reviews, deleteReview } = useReviews();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'reviews' | 'settings'>('dashboard');

  // Orders State (loaded from localStorage + initial samples)
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('Active');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [deliveredNotice, setDeliveredNotice] = useState<string>('');
  const [autoDeleteDelivered, setAutoDeleteDelivered] = useState<boolean>(false);

  // Products Admin State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form states for Adding / Editing Product
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<ProductCategory>('Chargers');
  const [pPrice, setPPrice] = useState<number>(999);
  const [pOriginalPrice, setPOriginalPrice] = useState<number>(1499);
  const [pImage, setPImage] = useState('');
  const [pTagline, setPTagline] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pFeatures, setPFeatures] = useState('');
  const [pInStock, setPInStock] = useState(true);

  // Store Settings Form State
  const [sThreshold, setSThreshold] = useState(settings.freeShippingThreshold);
  const [sFee, setSFee] = useState(settings.shippingFee);
  const [sEmail, setSEmail] = useState(settings.email);
  const [sPhone, setSPhone] = useState(settings.phone);
  const [sWhatsapp, setSWhatsapp] = useState(settings.whatsapp);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Sync settings state when modal opens or settings change
  useEffect(() => {
    setSThreshold(settings.freeShippingThreshold);
    setSFee(settings.shippingFee);
    setSEmail(settings.email);
    setSPhone(settings.phone);
    setSWhatsapp(settings.whatsapp);
  }, [settings]);

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('am_accessories_orders') || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        setOrders(saved);
      } else {
        // Sample orders for demo dashboard display
        const samples: OrderDetails[] = [
          {
            orderId: 'AM-918234',
            customerName: 'Asad Rehman',
            phone: '03461234567',
            whatsapp: '03461234567',
            address: 'House # 42, Street 8, Sector 11-B, North Karachi',
            city: 'Karachi',
            province: 'Sindh',
            paymentMethod: 'cod',
            items: [
              {
                product: products[0] || {
                  id: 'p1',
                  name: 'Wireless Earbuds',
                  price: 999,
                  category: 'Audio Devices'
                },
                quantity: 1
              }
            ],
            subtotal: 999,
            shippingFee: 150,
            total: 1149,
            date: new Date().toLocaleDateString('en-GB'),
            status: 'Confirmed'
          },
          {
            orderId: 'AM-741029',
            customerName: 'Zainab Bibi',
            phone: '03009876543',
            whatsapp: '03009876543',
            address: 'Gulberg III, Main Boulevard, Block B',
            city: 'Lahore',
            province: 'Punjab',
            paymentMethod: 'easypaisa',
            items: [
              {
                product: products[1] || {
                  id: 'p2',
                  name: 'Fast Type-C Charger',
                  price: 999,
                  category: 'Chargers'
                },
                quantity: 2
              }
            ],
            subtotal: 1998,
            shippingFee: 150,
            total: 2148,
            date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB'),
            status: 'Dispatched'
          }
        ];
        setOrders(samples);
        localStorage.setItem('am_accessories_orders', JSON.stringify(samples));
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadOrders();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === '1234' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      loadOrders();
    } else {
      setAuthError('Invalid passcode. Use "admin123" or click Quick Demo Login below.');
    }
  };

  const handleQuickLogin = () => {
    setPasscode('admin123');
    setIsAuthenticated(true);
    setAuthError('');
    loadOrders();
  };

  // Order status updater
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderDetails['status']) => {
    if (newStatus === 'Delivered' && autoDeleteDelivered) {
      // Completely delete order on delivered if option is turned on
      const updated = orders.filter((o) => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('am_accessories_orders', JSON.stringify(updated));
      setDeliveredNotice(`Order #${orderId} delivered and permanently removed from order box.`);
    } else {
      const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
      setOrders(updated);
      localStorage.setItem('am_accessories_orders', JSON.stringify(updated));
      if (newStatus === 'Delivered') {
        setDeliveredNotice(`✅ Order #${orderId} marked as Delivered! It has been removed from the Active Orders list.`);
      } else {
        setDeliveredNotice(`Order #${orderId} status updated to ${newStatus}.`);
      }
    }
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    setTimeout(() => setDeliveredNotice(''), 4500);
  };

  // Order deletion
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to delete order #${orderId}?`)) {
      const updated = orders.filter((o) => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('am_accessories_orders', JSON.stringify(updated));
      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  // Prepare Add/Edit Product form
  const openAddProductModal = () => {
    setPName('');
    setPCategory('Chargers');
    setPPrice(999);
    setPOriginalPrice(1499);
    setPImage('https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80');
    setPTagline('High quality mobile tech accessory');
    setPDescription('Premium quality product with 7 days functional warranty and nationwide fast delivery across Pakistan.');
    setPFeatures('Instant Pairing, Long Battery Life, Premium Build Quality');
    setPInStock(true);
    setEditingProduct(null);
    setIsAddingProduct(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setPName(product.name);
    setPCategory(product.category);
    setPPrice(product.price);
    setPOriginalPrice(product.originalPrice || Math.round(product.price * 1.3));
    setPImage(product.image);
    setPTagline(product.tagline);
    setPDescription(product.description);
    setPFeatures(product.features.join(', '));
    setPInStock(product.inStock);
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim() || pPrice <= 0) {
      alert('Please fill out product name and valid price.');
      return;
    }

    const featureList = pFeatures
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingProduct) {
      editProduct(editingProduct.id, {
        name: pName.trim(),
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        image: pImage.trim(),
        tagline: pTagline.trim(),
        description: pDescription.trim(),
        features: featureList.length > 0 ? featureList : ['100% Genuine Quality', '7-Day Warranty'],
        inStock: pInStock
      });
    } else {
      addProduct({
        name: pName.trim(),
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        image: pImage.trim() || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
        tagline: pTagline.trim() || 'Quality mobile tech essential',
        description: pDescription.trim() || 'High quality mobile accessory tested for durability and safety.',
        features: featureList.length > 0 ? featureList : ['100% Genuine Quality', '7-Day Warranty'],
        specs: {
          'Origin': 'Karachi Warehouse',
          'Warranty': '7 Days Replacement Warranty'
        },
        inStock: pInStock,
        isPopular: true
      });
    }

    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      freeShippingThreshold: Number(sThreshold),
      shippingFee: Number(sFee),
      email: sEmail.trim(),
      phone: sPhone.trim(),
      whatsapp: sWhatsapp.trim()
    });
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 2500);
  };

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    let matchesStatus = true;
    if (orderStatusFilter === 'Active') {
      matchesStatus = o.status !== 'Delivered';
    } else if (orderStatusFilter !== 'All') {
      matchesStatus = o.status === orderStatusFilter;
    }

    const cleanQ = orderSearch.toLowerCase().trim();
    const matchesQ =
      !cleanQ ||
      o.orderId.toLowerCase().includes(cleanQ) ||
      o.customerName.toLowerCase().includes(cleanQ) ||
      o.phone.includes(cleanQ) ||
      o.city.toLowerCase().includes(cleanQ);
    return matchesStatus && matchesQ;
  });

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const cleanQ = productSearch.toLowerCase().trim();
    const matchesQ =
      !cleanQ ||
      p.name.toLowerCase().includes(cleanQ) ||
      p.tagline.toLowerCase().includes(cleanQ) ||
      p.category.toLowerCase().includes(cleanQ);
    return matchesCat && matchesQ;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'In Transit').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '5.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-sky-100 rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-wide uppercase">
                  A.M Accessories Admin Portal
                </h3>
                {isAuthenticated && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-300/30 font-bold">
                    Authenticated
                  </span>
                )}
              </div>
              <p className="text-xs text-sky-100/90 font-medium">
                Manage Inventory, Orders, Customer Feedback & Store Configuration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Lock / Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Login View */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-900">Admin Security Gateway</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter your administrative passcode to access order management and store inventory.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 text-left mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (e.g. admin123)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all text-sm shadow-md shadow-sky-500/20 cursor-pointer"
              >
                Authenticate & Unlock Panel
              </button>
            </form>

            <div className="pt-2 border-t border-sky-100">
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Quick Demo Admin Access (1-Click Login)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="px-5 pt-3 bg-sky-50/80 border-b border-sky-100 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-sky-700 border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-sky-100/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-sky-600" />
                <span>Overview & Metrics</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                  activeTab === 'orders'
                    ? 'bg-white text-sky-700 border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-sky-100/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <span>Orders ({orders.length})</span>
                {pendingOrdersCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                  activeTab === 'products'
                    ? 'bg-white text-sky-700 border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-sky-100/50'
                }`}
              >
                <Package className="w-4 h-4 text-sky-600" />
                <span>Inventory ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                  activeTab === 'reviews'
                    ? 'bg-white text-sky-700 border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-sky-100/50'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span>Reviews ({totalReviews})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
                  activeTab === 'settings'
                    ? 'bg-white text-sky-700 border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-sky-100/50'
                }`}
              >
                <Settings className="w-4 h-4 text-sky-600" />
                <span>Store Config</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white space-y-6">
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Metric Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 shadow-sm flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-sky-600 text-white shadow-md shadow-sky-500/20">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          Gross Revenue
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">
                          Rs. {totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                          From {orders.length} total orders
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 shadow-sm flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-amber-500 text-white shadow-md">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          Pending Orders
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">
                          {pendingOrdersCount}
                        </div>
                        <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                          Requires courier dispatch
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 shadow-sm flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-md">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          Active Inventory
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">
                          {products.length} Products
                        </div>
                        <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                          {products.filter((p) => p.inStock).length} In Stock
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 shadow-sm flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-purple-600 text-white shadow-md">
                        <Star className="w-6 h-6 fill-white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          Shopper Rating
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">
                          {avgRating} / 5.0
                        </div>
                        <div className="text-[11px] text-purple-700 font-semibold mt-0.5">
                          {totalReviews} Verified Feedback
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      Quick Administrative Actions
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={openAddProductModal}
                        className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Product to Store</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('orders')}
                        className="px-4 py-2.5 bg-white hover:bg-sky-100 text-slate-800 border border-sky-200 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ShoppingBag className="w-4 h-4 text-sky-600" />
                        <span>Manage Pending Dispatches</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="px-4 py-2.5 bg-white hover:bg-sky-100 text-slate-800 border border-sky-200 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Truck className="w-4 h-4 text-sky-600" />
                        <span>Edit Delivery & Bank Settings</span>
                      </button>

                      <button
                        onClick={resetToDefault}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Store Defaults</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Orders Overview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        Recent Store Orders
                      </h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-sky-600 font-bold hover:underline cursor-pointer"
                      >
                        View All Orders →
                      </button>
                    </div>

                    <div className="border border-sky-100 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-sky-50 text-slate-700 uppercase font-bold border-b border-sky-100 text-[11px]">
                          <tr>
                            <th className="py-3 px-4">Order Ref</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">City</th>
                            <th className="py-3 px-4">Payment</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-100 text-slate-800">
                          {orders.slice(0, 5).map((ord) => (
                            <tr key={ord.orderId} className="hover:bg-sky-50/40 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-sky-700">
                                #{ord.orderId}
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {ord.customerName}
                              </td>
                              <td className="py-3 px-4 text-slate-600">{ord.city}</td>
                              <td className="py-3 px-4 uppercase text-[11px] font-bold text-slate-700">
                                {ord.paymentMethod}
                              </td>
                              <td className="py-3 px-4 font-bold text-slate-900">
                                Rs. {ord.total.toLocaleString()}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    ord.status === 'Delivered'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : ord.status === 'Dispatched'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(ord);
                                    setActiveTab('orders');
                                  }}
                                  className="text-sky-600 font-bold hover:underline cursor-pointer"
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {deliveredNotice && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{deliveredNotice}</span>
                      </div>
                      <button
                        onClick={() => setOrderStatusFilter('Delivered')}
                        className="text-emerald-700 underline text-[11px] hover:text-emerald-900 cursor-pointer font-bold"
                      >
                        View Delivered History
                      </button>
                    </div>
                  )}

                  {/* Search and Filters */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                    <div className="relative w-full lg:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search order #, customer, phone..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full bg-sky-50/50 border border-sky-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                      {[
                        { id: 'Active', label: 'Active Orders' },
                        { id: 'Confirmed', label: 'Confirmed' },
                        { id: 'Dispatched', label: 'Dispatched' },
                        { id: 'In Transit', label: 'In Transit' },
                        { id: 'Delivered', label: 'Delivered (History)' },
                        { id: 'All', label: 'All Orders' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setOrderStatusFilter(tab.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                            orderStatusFilter === tab.id
                              ? 'bg-sky-600 text-white font-bold shadow-sm'
                              : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-100'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Auto-Remove Settings Banner */}
                  <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-100 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>
                        Showing: <strong className="text-sky-700">{orderStatusFilter === 'Active' ? 'Active Non-Delivered Orders' : orderStatusFilter}</strong> ({filteredOrders.length} items)
                      </span>
                    </div>

                    <label className="flex items-center gap-2 text-[11px] font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoDeleteDelivered}
                        onChange={(e) => setAutoDeleteDelivered(e.target.checked)}
                        className="rounded border-sky-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span>Permanently delete order on 'Delivered' status</span>
                    </label>
                  </div>

                  {/* Orders Table */}
                  <div className="border border-sky-100 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-sky-50 text-slate-700 uppercase font-bold border-b border-sky-100 text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">City / Area</th>
                          <th className="py-3 px-4">Payment</th>
                          <th className="py-3 px-4">Total</th>
                          <th className="py-3 px-4">Update Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sky-100 text-slate-800">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-500">
                              No customer orders matched your search query.
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((ord) => (
                            <tr key={ord.orderId} className="hover:bg-sky-50/40 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-sky-700">
                                #{ord.orderId}
                                <div className="text-[10px] text-slate-400 font-sans font-normal">
                                  {ord.date}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900">{ord.customerName}</div>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  {ord.phone}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-800">{ord.city}</div>
                                <div className="text-[11px] text-slate-500 truncate max-w-[160px]">
                                  {ord.address}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <span className="uppercase text-[11px] font-bold text-slate-700 block">
                                  {ord.paymentMethod}
                                </span>
                              </td>

                              <td className="py-3 px-4 font-extrabold text-slate-900">
                                Rs. {ord.total.toLocaleString()}
                              </td>

                              <td className="py-3 px-4">
                                <select
                                  value={ord.status}
                                  onChange={(e) =>
                                    handleUpdateOrderStatus(
                                      ord.orderId,
                                      e.target.value as OrderDetails['status']
                                    )
                                  }
                                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer border focus:outline-none ${
                                    ord.status === 'Delivered'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : ord.status === 'Dispatched'
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : 'bg-amber-50 text-amber-800 border-amber-300'
                                  }`}
                                >
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="In Transit">In Transit</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              </td>

                              <td className="py-3 px-4 text-right space-x-2">
                                <a
                                  href={`https://wa.me/${ord.whatsapp}?text=${encodeURIComponent(
                                    `Salam ${ord.customerName}! This is A.M Accessories regarding your order #${ord.orderId}. Your current status is: ${ord.status}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors inline-block"
                                  title="Contact Buyer on WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => handleDeleteOrder(ord.orderId)}
                                  className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors inline-block cursor-pointer"
                                  title="Delete Order Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTS INVENTORY */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="w-full bg-sky-50/50 border border-sky-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <select
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                        className="bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={openAddProductModal}
                      className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 rounded-xl bg-white border border-sky-200/80 shadow-sm flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-16 h-16 object-cover rounded-lg bg-sky-50 border border-sky-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                              {prod.category}
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {prod.name}
                            </h4>
                            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                              Rs. {prod.price.toLocaleString()}
                              {prod.originalPrice && (
                                <span className="text-[11px] text-slate-400 font-normal line-through ml-1.5">
                                  Rs. {prod.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2">
                          {prod.tagline}
                        </p>

                        <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs">
                          {/* Stock Toggle */}
                          <button
                            onClick={() => toggleStock(prod.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                              prod.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {prod.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 rounded bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete "${prod.name}" from catalog?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REVIEWS MODERATION */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Customer Reviews Moderation ({reviews.length})
                      </h4>
                      <p className="text-xs text-slate-500">
                        Review customer ratings posted across products. Delete spam or invalid feedback.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {rev.authorName}
                            </span>
                            <span className="text-slate-400 text-xs">·</span>
                            <span className="text-xs text-slate-500">{rev.authorCity || 'Pakistan'}</span>
                            <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
                          </div>

                          <div className="flex items-center text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                                }`}
                              />
                            ))}
                            <span className="text-xs font-bold text-slate-900 ml-1.5">
                              "{rev.title}"
                            </span>
                          </div>

                          <p className="text-xs text-slate-600">{rev.comment}</p>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Delete this customer review?')) {
                              deleteReview(rev.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer shrink-0"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: STORE CONFIGURATION */}
              {activeTab === 'settings' && (
                <div className="max-w-xl mx-auto space-y-5">
                  <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-sky-600" />
                      <span>Store Contact & Free Delivery Settings</span>
                    </h4>

                    {settingsSavedMsg && (
                      <div className="p-3 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Settings successfully saved and applied to storefront!</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Free Delivery Threshold (Rs.)
                        </label>
                        <input
                          type="number"
                          required
                          value={sThreshold}
                          onChange={(e) => setSThreshold(Number(e.target.value))}
                          className="w-full bg-white border border-sky-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        />
                        <span className="text-[11px] text-slate-500 mt-0.5 block">
                          Orders above this amount qualify for FREE shipping across Pakistan.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Standard Courier Delivery Fee (Rs.)
                        </label>
                        <input
                          type="number"
                          required
                          value={sFee}
                          onChange={(e) => setSFee(Number(e.target.value))}
                          className="w-full bg-white border border-sky-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Official Store Email (Form Submissions Destination)
                        </label>
                        <input
                          type="email"
                          required
                          value={sEmail}
                          onChange={(e) => setSEmail(e.target.value)}
                          className="w-full bg-white border border-sky-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            required
                            value={sPhone}
                            onChange={(e) => setSPhone(e.target.value)}
                            className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            WhatsApp Number
                          </label>
                          <input
                            type="text"
                            required
                            value={sWhatsapp}
                            onChange={(e) => setSWhatsapp(e.target.value)}
                            className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Store Configuration</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal / Form Overlay for Adding/Editing Product */}
        {isAddingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-sky-100 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <h4 className="text-base font-bold text-slate-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product to Catalog'}
                </h4>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Type-C Fast Charger 25W"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value as ProductCategory)}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">In Stock Status</label>
                    <button
                      type="button"
                      onClick={() => setPInStock(!pInStock)}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        pInStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {pInStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price (PKR) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(Number(e.target.value))}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Original Price (PKR)</label>
                    <input
                      type="number"
                      value={pOriginalPrice}
                      onChange={(e) => setPOriginalPrice(Number(e.target.value))}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="Short catchy feature highlight"
                    value={pTagline}
                    onChange={(e) => setPTagline(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Features (comma separated)</label>
                  <input
                    type="text"
                    value={pFeatures}
                    onChange={(e) => setPFeatures(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs cursor-pointer shadow-sm"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
