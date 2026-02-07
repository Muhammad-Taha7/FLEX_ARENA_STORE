import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard, User, MapPin, Phone, Package, CheckCircle2 } from "lucide-react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "flex-arena-gym-store.firebaseapp.com",
  databaseURL: "https://flex-arena-gym-store-default-rtdb.firebaseio.com",
  projectId: "flex-arena-gym-store",
  storageBucket: "flex-arena-gym-store.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Toast notification component
const showToast = (message, type = 'info') => {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type] || 'bg-blue-500';
  
  toast.className = `${bgColor} text-white px-4 py-2 rounded-lg shadow-lg mb-2 animate-slide-in text-sm`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate-slide-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const createToastContainer = () => {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-4 right-4 z-[100] flex flex-col items-end';
  document.body.appendChild(container);
  return container;
};

const CartDrawer = ({ open, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState({});

  // Initialize Firebase on component mount
  useEffect(() => {
    const initFirebase = async () => {
      if (typeof window === 'undefined') return;

      try {
        if (window.firebase && !window.firebaseApp) {
          const app = window.firebase.initializeApp(firebaseConfig);
          window.firebaseApp = app;
          window.firebaseDatabase = window.firebase.database();
          setFirebaseInitialized(true);
          console.log('✅ Firebase initialized successfully');
          return;
        }

        if (window.firebaseApp) {
          setFirebaseInitialized(true);
          console.log('✅ Firebase already initialized');
          return;
        }

        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };

        await loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
        await loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js');

        if (window.firebase) {
          const app = window.firebase.initializeApp(firebaseConfig);
          window.firebaseApp = app;
          window.firebaseDatabase = window.firebase.database();
          setFirebaseInitialized(true);
          console.log('✅ Firebase initialized successfully');
        }
      } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        setFirebaseInitialized(false);
      }
    };

    initFirebase();
  }, []);

  // Calculate totals
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = totalPrice > 0 ? 150 : 0;
  const grandTotal = totalPrice + deliveryFee;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (min 10 digits)';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate unique order number
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `FA${timestamp}${random}`;
  };

  // Save order to Firebase
  const saveOrderToFirebase = async (orderData) => {
    try {
      if (!window.firebaseDatabase) {
        throw new Error('Firebase database not initialized');
      }

      const database = window.firebaseDatabase;
      const orderRef = database.ref(`orders/${orderData.orderNumber}`);
      
      await orderRef.set(orderData);
      
      console.log('✅ Order saved to Firebase:', orderData.orderNumber);
      return true;
    } catch (error) {
      console.error('❌ Firebase save error:', error);
      throw error;
    }
  };

  // Handle checkout submission
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      showToast('Please fill all required fields correctly', 'error');
      return;
    }

    if (!firebaseInitialized) {
      showToast('System is still initializing. Please wait...', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNum = generateOrderNumber();
      
      const orderData = {
        orderNumber: orderNum,
        customerDetails: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode.trim()
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: item.price,
          quantity: item.quantity,
          image: item.image || '',
          category: item.category || 'General',
          selectedSize: item.selectedSize || null,
          selectedGender: item.selectedGender || null,
          subtotal: item.price * item.quantity
        })),
        orderSummary: {
          subtotal: totalPrice,
          deliveryFee: deliveryFee,
          total: grandTotal,
          itemCount: cartItems.length,
          totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        },
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'cod' ? 'pending' : 'processing',
        orderStatus: 'pending',
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
        metadata: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          orderDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      };

      await saveOrderToFirebase(orderData);

      console.log('✅ Order placed successfully:', orderNum);
      showToast(`🎉 Order placed successfully! Order #${orderNum}`, 'success');

      setOrderNumber(orderNum);
      setOrderPlaced(true);
      
      // Clear cart items
      cartItems.forEach(item => {
        onRemoveItem(item.id);
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'cod'
      });

    } catch (error) {
      console.error('❌ Error placing order:', error);
      showToast(`Failed to place order. Please try again. Error: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close checkout modal
  const handleCloseCheckout = () => {
    if (!isSubmitting) {
      setShowCheckout(false);
      setOrderPlaced(false);
      setOrderNumber('');
    }
  };

  // Back to shopping after order
  const handleBackToShopping = () => {
    handleCloseCheckout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300 ${
          open 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[500px] lg:w-[550px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 transform transition-all duration-300 shadow-2xl flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-700/50 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-xl">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-white">Your Cart</h2>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 sm:p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center mb-4 sm:mb-6 border border-slate-700">
                <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-slate-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Your cart is empty</h3>
              <p className="text-slate-400 mb-6 sm:mb-8 text-base sm:text-lg">Add some items to get started!</p>
              <button
                onClick={onClose}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105 text-sm sm:text-base"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg sm:rounded-xl flex-shrink-0 border-2 border-slate-700 shadow-md"
                    />
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1 truncate text-sm sm:text-lg">{item.name}</h4>
                      <p className="text-xs text-slate-400 mb-2 line-clamp-1">{item.description}</p>
                      
                      {/* Category Badge */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-semibold shadow-md">
                          {item.category}
                        </span>
                        {item.selectedSize && (
                          <span className="text-[10px] sm:text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-semibold shadow-md">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedGender && (
                          <span className="text-[10px] sm:text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-semibold shadow-md">
                            {item.selectedGender}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          ₹{item.price.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Total: <span className="text-emerald-400">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                            showToast(`Quantity decreased for ${item.name}`, 'info');
                          }
                        }}
                        className="p-1.5 sm:p-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:scale-110"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} className="sm:w-4 sm:h-4 text-white" />
                      </button>
                      <span className="w-10 sm:w-14 text-center font-bold text-white text-sm sm:text-lg bg-slate-700/50 py-1 sm:py-2 px-2 sm:px-3 rounded-lg border border-slate-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          onUpdateQuantity(item.id, item.quantity + 1);
                          showToast(`Quantity increased for ${item.name}`, 'info');
                        }}
                        className="p-1.5 sm:p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-md transform hover:scale-110"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onRemoveItem(item.id);
                        showToast(`${item.name} removed from cart`, 'error');
                      }}
                      className="p-1.5 sm:p-2.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg sm:rounded-xl transition-all duration-300 border border-red-500/50 shadow-md transform hover:scale-110"
                      title="Remove item"
                      aria-label="Remove item from cart"
                    >
                      <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-700/50 p-4 sm:p-6 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold text-sm sm:text-base">Subtotal:</span>
                <span className="font-bold text-white text-sm sm:text-base">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-semibold text-sm sm:text-base">Delivery Fee:</span>
                <span className="font-bold text-white text-sm sm:text-base">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-slate-700">
                <span className="text-lg sm:text-xl font-bold text-white">Grand Total:</span>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-emerald-500/50 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <CreditCard size={20} className="sm:w-[22px] sm:h-[22px]" />
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full mt-2 sm:mt-3 py-2.5 sm:py-3 bg-slate-700/50 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-slate-500 text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-2 sm:p-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700/50">
            {!orderPlaced ? (
              <>
                {/* Checkout Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-xl">
                      <Package className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">Checkout</h3>
                      <p className="text-white/90 text-xs sm:text-sm">Complete your order</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseCheckout}
                    className="p-2 sm:p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-110"
                    disabled={isSubmitting}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </button>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleCheckout} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-180px)] custom-scrollbar">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                        <User size={18} className="sm:w-5 sm:h-5 text-emerald-400" />
                        Personal Information
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                              errors.fullName 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-600 focus:ring-emerald-500'
                            }`}
                            placeholder="Enter your full name"
                            disabled={isSubmitting}
                          />
                          {errors.fullName && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                              <span>⚠️</span> {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                              Email <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                errors.email 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600 focus:ring-emerald-500'
                              }`}
                              placeholder="your@email.com"
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                              Phone <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                errors.phone 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600 focus:ring-emerald-500'
                              }`}
                              placeholder="03001234567"
                              disabled={isSubmitting}
                            />
                            {errors.phone && (
                              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                        <MapPin size={18} className="sm:w-5 sm:h-5 text-emerald-400" />
                        Delivery Address
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                            Street Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                              errors.address 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-slate-600 focus:ring-emerald-500'
                            }`}
                            placeholder="House #, Street, Area"
                            disabled={isSubmitting}
                          />
                          {errors.address && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                              <span>⚠️</span> {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                              City <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                errors.city 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600 focus:ring-emerald-500'
                              }`}
                              placeholder="Faisalabad"
                              disabled={isSubmitting}
                            />
                            {errors.city && (
                              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> {errors.city}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                              State <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                errors.state 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600 focus:ring-emerald-500'
                              }`}
                              placeholder="Punjab"
                              disabled={isSubmitting}
                            />
                            {errors.state && (
                              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> {errors.state}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                              Zip Code <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl bg-slate-800/50 text-white focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
                                errors.zipCode 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-slate-600 focus:ring-emerald-500'
                              }`}
                              placeholder="38000"
                              disabled={isSubmitting}
                            />
                            {errors.zipCode && (
                              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> {errors.zipCode}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                        <CreditCard size={18} className="sm:w-5 sm:h-5 text-emerald-400" />
                        Payment Method
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        <label className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                          formData.paymentMethod === 'cod' 
                            ? 'border-emerald-500 bg-emerald-500/10' 
                            : 'border-slate-600 hover:border-emerald-500/50 bg-slate-800/30'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleInputChange}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 focus:ring-emerald-500"
                            disabled={isSubmitting}
                          />
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm sm:text-base">💵 Cash on Delivery</p>
                            <p className="text-xs text-slate-400">Pay when you receive your order</p>
                          </div>
                        </label>

                        <label className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                          formData.paymentMethod === 'card' 
                            ? 'border-emerald-500 bg-emerald-500/10' 
                            : 'border-slate-600 hover:border-emerald-500/50 bg-slate-800/30'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 focus:ring-emerald-500"
                            disabled={isSubmitting}
                          />
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm sm:text-base">💳 Credit/Debit Card</p>
                            <p className="text-xs text-slate-400">Pay securely online</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 sm:p-5 border-2 border-emerald-500/30">
                      <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                        📦 Order Summary
                      </h4>
                      <div className="space-y-2 sm:space-y-2.5">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-300">Subtotal ({cartItems.length} items):</span>
                          <span className="font-bold text-white">₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-300">Delivery Fee:</span>
                          <span className="font-bold text-white">₹{deliveryFee}</span>
                        </div>
                        <div className="flex justify-between pt-2 sm:pt-3 border-t border-emerald-500/30">
                          <span className="font-bold text-white text-sm sm:text-base">Total:</span>
                          <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            ₹{grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={handleCloseCheckout}
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !firebaseInitialized}
                      className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg sm:rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : !firebaseInitialized ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Initializing...
                        </>
                      ) : (
                        <>
                          <Package size={16} className="sm:w-[18px] sm:h-[18px]" />
                          Place Order (₹{grandTotal.toLocaleString()})
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Order Success Screen
              <div className="p-6 sm:p-8 text-center">
                <div className="mb-4 sm:mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce shadow-2xl">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">🎉 Order Placed Successfully!</h3>
                  <p className="text-slate-400 mb-4 sm:mb-6 text-base sm:text-lg">Thank you for your order</p>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-slate-300 mb-2">Your Order Number</p>
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-wider">
                      {orderNumber}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">Please save this for your records</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 sm:p-5 text-left mb-4 sm:mb-6 border border-slate-700">
                    <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">📋 Order Details</h4>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Items:</span>
                        <span className="font-bold text-white">{cartItems.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Amount:</span>
                        <span className="font-bold text-emerald-400">₹{grandTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Payment:</span>
                        <span className="font-bold text-white">
                          {formData.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Card'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className="font-bold text-amber-400">⏳ Pending</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-blue-300">
                      📧 We've sent a confirmation email to <br/>
                      <span className="font-bold">{formData.email}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBackToShopping}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-emerald-500/50 transform hover:scale-105"
                >
                  Continue Shopping 🛍️
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;