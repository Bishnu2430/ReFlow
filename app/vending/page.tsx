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
  CheckCircle,
  AlertTriangle,
  Gauge,
  DollarSign,
} from "lucide-react";
import { SensorData } from "@/lib/utils";

export default function VendingPage() {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vending machine data...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Smart Vending Machine
              </h1>
              <p className="text-gray-600 mt-1">
                24/7 automated sanitary pad dispensing with cashless payments
              </p>
            </div>
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

        {/* Inventory Status */}
        {latestData && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Stock Level */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Current Stock
                </h3>
                <Package className="w-8 h-8 text-purple-600" />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {estimatedPads}
                  </span>
                  <span className="text-sm text-gray-500">pads remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      stockPercentage > 50
                        ? "bg-green-500"
                        : stockPercentage > 20
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${stockPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm text-purple-600 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {currentStock}g
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-3">
                  <p className="text-sm text-pink-600 mb-1">Status</p>
                  <p className="text-2xl font-bold text-pink-900">
                    {stockStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Distance Sensor */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Dispensing Mechanism
                </h3>
                <Gauge className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Distance to Product</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {latestData.dist} cm
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (latestData.dist / 50) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    latestData.dist < 10
                      ? "bg-red-50 border border-red-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {latestData.dist < 10 ? (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700 font-medium">
                          Dispenser full - Product ready
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">
                          Dispenser ready for next product
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Payment Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
              <Smartphone className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                UPI Payment
              </h3>
              <p className="text-gray-600 text-sm">
                Instant payment via Google Pay, PhonePe, Paytm
              </p>
            </div>

            <div className="border-2 border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                QR Code
              </h3>
              <p className="text-gray-600 text-sm">
                Scan and pay with any UPI app
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Affordable
              </h3>
              <p className="text-gray-600 text-sm">
                Subsidized pricing for accessibility
              </p>
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
      </main>
    </div>
  );
}
