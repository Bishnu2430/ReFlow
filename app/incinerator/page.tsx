"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  Flame,
  Thermometer,
  Wind,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Leaf,
  TrendingDown,
  Zap,
  Shield,
} from "lucide-react";
import { SensorData } from "@/lib/utils";
import { MetricCard } from "@/components/MetricCard";

export default function IncineratorPage() {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incinerator data...</p>
        </div>
      </div>
    );
  }

  const isFlameActive = latestData?.flame === 1;
  const temperature = latestData?.temp || 0;
  const isSafeTemp = temperature >= 600 && temperature <= 1000; // Typical incinerator temp

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Smart Incinerator System
              </h1>
              <p className="text-gray-600 mt-1">
                Eco-friendly waste disposal with real-time monitoring and
                emission control
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
              isFlameActive && !latestData.issues.includes("Flame")
                ? "bg-gradient-to-r from-orange-400 to-red-500"
                : "bg-gradient-to-r from-gray-400 to-gray-600"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Flame
                  className={`w-16 h-16 ${
                    isFlameActive ? "animate-pulse" : ""
                  }`}
                />
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {isFlameActive
                      ? "ACTIVE - Incinerating"
                      : "STANDBY - Ready"}
                  </h2>
                  <p className="text-lg opacity-90">
                    {isFlameActive
                      ? "Waste disposal in progress - All systems operational"
                      : "System ready for waste disposal"}
                  </p>
                </div>
              </div>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  isFlameActive
                    ? "bg-white bg-opacity-20"
                    : "bg-white bg-opacity-10"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${
                    isFlameActive
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Smart Incinerator
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  IoT-enabled waste tracking system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Real-time emission monitoring (CO, CO2, NO2)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Temperature control and safety systems
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Automatic shutdown on unsafe conditions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Energy-efficient operation
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Benefits
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Reduces environmental pollution
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Clean and dignified waste disposal
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Eliminates need for landfill dumping
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Reduces health risks and stigma
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Cost-effective waste management
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Metrics */}
        {latestData && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              System Parameters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                icon={Flame}
                title="Flame Status"
                value={isFlameActive ? "Active" : "Inactive"}
                status={isFlameActive ? "Operating" : "Standby"}
                color={isFlameActive ? "orange" : "blue"}
              />
              <MetricCard
                icon={Thermometer}
                title="Temperature"
                value={latestData.temp}
                unit="°C"
                status={isFlameActive ? "Normal" : "Standby"}
                color={isFlameActive ? "red" : "blue"}
              />
              <MetricCard
                icon={Gauge}
                title="Load Capacity"
                value={latestData.load}
                unit="g"
                status={latestData.load > 900 ? "Full" : "Available"}
                color={latestData.load > 900 ? "red" : "green"}
              />
              <MetricCard
                icon={Wind}
                title="Distance Sensor"
                value={latestData.dist}
                unit="cm"
                status={latestData.dist < 10 ? "Full" : "Normal"}
                color={latestData.dist < 10 ? "red" : "green"}
              />
            </div>
          </>
        )}

        {/* Emission Monitoring */}
        {latestData && (
          <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Emission Monitoring
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-700">
                    CO2 Level
                  </span>
                  <Wind className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-900">
                  {latestData.co2}
                </p>
                <p className="text-sm text-purple-600">ppm</p>
                <div className="mt-2">
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (latestData.co2 / 2000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700">
                    CO Level
                  </span>
                  <Wind className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-900">
                  {latestData.co}
                </p>
                <p className="text-sm text-blue-600">ppm</p>
                <div className="mt-2">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((latestData.co / 400) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-orange-700">
                    NO2 Level
                  </span>
                  <Wind className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-900">
                  {latestData.no2}
                </p>
                <p className="text-sm text-orange-600">ppm</p>
                <div className="mt-2">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (latestData.no2 / 1500) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  Emission levels within environmental safety standards
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <Zap className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Energy Efficient
            </h3>
            <p className="text-gray-600 text-sm">
              Optimized combustion process reduces energy consumption while
              maintaining effectiveness
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <Shield className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Safety Systems
            </h3>
            <p className="text-gray-600 text-sm">
              Multiple safety sensors and automatic shutdown prevent accidents
              and ensure operator safety
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <TrendingDown className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Low Emissions
            </h3>
            <p className="text-gray-600 text-sm">
              Advanced filtration and monitoring keeps emissions below
              regulatory limits protecting environment
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
