"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  ShoppingBag,
  Package,
  CreditCard,
  Smartphone,
  Bell,
  TrendingUp,
  Clock,
  AlertTriangle,
  Gauge,
  DollarSign,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  QrCode,
  Loader2,
  ArrowLeft,
  Star,
} from "lucide-react";
import { SensorData } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  rating: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

type PaymentMethod = "upi" | "qr" | "card" | null;

export default function VendingPage() {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const latestRef = ref(database, "sensorData/latest");
    const unsubscribe = onValue(latestRef, (snapshot) => {
      if (snapshot.exists()) {
        setLatestData(snapshot.val());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Calculate stock level percentage (using load sensor as proxy)
  const maxCapacity = 1000; // grams
  const currentStock = latestData?.load || 0;
  const stockPercentage = Math.max(
    0,
    Math.min(100, (currentStock / maxCapacity) * 100)
  );
  const stockStatus =
    stockPercentage > 50 ? "Good" : stockPercentage > 20 ? "Low" : "Critical";
  const estimatedPads = Math.floor(currentStock / 15); // Assuming 15g per pad

  // Product catalog
  const products: Product[] = [
    {
      id: "pad_regular",
      name: "Regular Sanitary Pads",
      price: 30,
      description: "Biodegradable, 8 pads per pack",
      stock: 25,
      image: "🌸",
      rating: 4.8,
      category: "Regular",
    },
    {
      id: "pad_large",
      name: "Large Sanitary Pads",
      price: 40,
      description: "Extra protection, 6 pads per pack",
      stock: 18,
      image: "🌺",
      rating: 4.9,
      category: "Large",
    },
    {
      id: "pad_overnight",
      name: "Overnight Pads",
      price: 50,
      description: "Maximum absorption, 5 pads per pack",
      stock: 15,
      image: "🌹",
      rating: 4.7,
      category: "Overnight",
    },
  ];

  // Cart functions
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return item;
            if (newQuantity > item.stock) return item;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Payment processing
  const processPayment = async () => {
    setPaymentProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const orderNum = "ORD" + Date.now().toString().slice(-8);
    setOrderNumber(orderNum);

    setPaymentProcessing(false);
    setPaymentSuccess(true);

    // Reset cart after 3 seconds
    setTimeout(() => {
      setCart([]);
      setShowCheckout(false);
      setPaymentMethod(null);
      setPaymentSuccess(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vending machine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Smart Vending Machine
                </h1>
                <p className="text-gray-600 mt-1">
                  24/7 automated sanitary pad dispensing
                </p>
              </div>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setShowCheckout(true)}
              className="relative bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        {latestData && (
          <div
            className={`rounded-2xl p-8 mb-8 text-white card-shadow-lg ${
              stockPercentage > 20
                ? "bg-gradient-to-r from-purple-400 to-pink-500"
                : "bg-gradient-to-r from-orange-400 to-red-500"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {stockPercentage > 20 ? (
                  <CheckCircle className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16 animate-pulse" />
                )}
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {stockPercentage > 20 ? "OPERATIONAL" : "LOW STOCK ALERT"}
                  </h2>
                  <p className="text-lg opacity-90">
                    {stockPercentage > 20
                      ? `Machine ready to dispense - ${estimatedPads} pads available`
                      : "Refill needed soon - Notify maintenance team"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-1">
                  {stockPercentage.toFixed(0)}%
                </div>
                <div className="text-sm opacity-90">Stock Level</div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Smart Vending
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  QR code and UPI integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Real-time stock monitoring via load cells
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Cashless payment system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Automated refill alerts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Cloud-based inventory management
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Benefits
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  24/7 pad availability without embarrassment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Reduces manpower costs significantly
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Prevents stockout situations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Promotes menstrual dignity and privacy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Data-driven supply chain optimization
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Usage Analytics
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">127</div>
              <div className="text-sm text-gray-600">Total Dispensed Today</div>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">14:30</div>
              <div className="text-sm text-gray-600">Peak Usage Time</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98.5%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                3 days
              </div>
              <div className="text-sm text-gray-600">Until Refill Needed</div>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Scalable Model
            </h3>
            <p className="text-gray-600 text-sm">
              ATM-like franchise potential with steady revenue streams and low
              operational costs
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <Bell className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Alerts
            </h3>
            <p className="text-gray-600 text-sm">
              Automated notifications to refill teams prevent stockouts and
              ensure continuous availability
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <Package className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Optimized Supply
            </h3>
            <p className="text-gray-600 text-sm">
              Cloud-based inventory management optimizes supply chain and
              reduces waste
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {!showCheckout && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Products
              </h2>
              <p className="text-gray-600">
                Select products to add to your cart
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-all"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{product.image}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-purple-600">
                        ₹{product.price}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          product.stock > 10
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {product.stock} left
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      product.stock === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {!paymentSuccess ? (
                <>
                  {/* Checkout Header */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setShowCheckout(false);
                            setPaymentMethod(null);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {paymentMethod ? "Payment" : "Your Cart"}
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowCheckout(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <XCircle className="w-6 h-6 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {!paymentMethod ? (
                      <>
                        {/* Cart Items */}
                        {cart.length === 0 ? (
                          <div className="text-center py-12">
                            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">
                              Your cart is empty
                            </p>
                            <button
                              onClick={() => setShowCheckout(false)}
                              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-4 mb-6">
                              {cart.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                                >
                                  <div className="text-4xl">{item.image}</div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">
                                      {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {item.description}
                                    </p>
                                    <p className="text-purple-600 font-bold mt-1">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, -1)
                                      }
                                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-bold text-lg w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors ml-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="bg-purple-50 rounded-xl p-6 mb-6">
                              <div className="flex justify-between items-center text-lg mb-2">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-semibold">
                                  ₹{cartTotal}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-lg mb-2">
                                <span className="text-gray-700">Tax (0%):</span>
                                <span className="font-semibold">₹0</span>
                              </div>
                              <div className="border-t border-purple-200 pt-3 mt-3">
                                <div className="flex justify-between items-center text-2xl">
                                  <span className="font-bold text-gray-900">
                                    Total:
                                  </span>
                                  <span className="font-bold text-purple-600">
                                    ₹{cartTotal}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setPaymentMethod("upi")}
                              className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                              Proceed to Payment
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Payment Methods */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select Payment Method
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <button
                              onClick={() => setPaymentMethod("upi")}
                              className={`p-6 rounded-xl border-2 transition-all ${
                                paymentMethod === "upi"
                                  ? "border-purple-600 bg-purple-50"
                                  : "border-gray-200 hover:border-purple-300"
                              }`}
                            >
                              <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">
                                UPI Payment
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                GPay, PhonePe, Paytm
                              </p>
                            </button>

                            <button
                              onClick={() => setPaymentMethod("qr")}
                              className={`p-6 rounded-xl border-2 transition-all ${
                                paymentMethod === "qr"
                                  ? "border-purple-600 bg-purple-50"
                                  : "border-gray-200 hover:border-purple-300"
                              }`}
                            >
                              <QrCode className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">
                                QR Code
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Scan & Pay
                              </p>
                            </button>

                            <button
                              onClick={() => setPaymentMethod("card")}
                              className={`p-6 rounded-xl border-2 transition-all ${
                                paymentMethod === "card"
                                  ? "border-purple-600 bg-purple-50"
                                  : "border-gray-200 hover:border-purple-300"
                              }`}
                            >
                              <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                              <p className="font-semibold text-gray-900">
                                Card Payment
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Debit / Credit
                              </p>
                            </button>
                          </div>

                          {/* Payment UI */}
                          {paymentMethod === "upi" && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                              <h4 className="font-semibold text-gray-900 mb-4">
                                Enter UPI ID
                              </h4>
                              <input
                                type="text"
                                placeholder="yourname@upi"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:outline-none mb-4"
                              />
                              <p className="text-sm text-gray-600 mb-4">
                                Or pay using any UPI app (Google Pay, PhonePe,
                                Paytm, etc.)
                              </p>
                            </div>
                          )}

                          {paymentMethod === "qr" && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 text-center">
                              <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                                <QrCode className="w-32 h-32 text-purple-600" />
                              </div>
                              <p className="text-sm text-gray-700 font-medium">
                                Scan this QR code with any UPI app to pay ₹
                                {cartTotal}
                              </p>
                            </div>
                          )}

                          {paymentMethod === "card" && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                              <h4 className="font-semibold text-gray-900 mb-4">
                                Card Details
                              </h4>
                              <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:outline-none mb-3"
                                maxLength={16}
                              />
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                                  maxLength={5}
                                />
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                                  maxLength={3}
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Cardholder Name"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                              />
                            </div>
                          )}
                        </div>

                        {/* Amount Summary */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                          <div className="flex justify-between items-center text-xl">
                            <span className="font-bold text-gray-900">
                              Amount to Pay:
                            </span>
                            <span className="font-bold text-purple-600 text-2xl">
                              ₹{cartTotal}
                            </span>
                          </div>
                        </div>

                        {/* Pay Button */}
                        <button
                          onClick={processPayment}
                          disabled={paymentProcessing}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {paymentProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Pay ₹{cartTotal}
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                /* Success Screen */
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your order has been placed
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Order Number</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {orderNumber}
                    </p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      📦 Please collect your items from the dispenser
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    This window will close automatically...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
