"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  Sparkles,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import {
  SensorData,
  getTemperatureStatus,
  getHumidityStatus,
  getAirQualityLevel,
} from "@/lib/utils";
import { MetricCard } from "@/components/MetricCard";

export default function HygienePage() {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hygiene data...</p>
        </div>
      </div>
    );
  }

  const tempStatus = latestData ? getTemperatureStatus(latestData.temp) : null;
  const humStatus = latestData ? getHumidityStatus(latestData.hum) : null;
  const airQuality = latestData ? getAirQualityLevel(latestData.co2) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Washroom Hygiene Monitoring
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time environmental monitoring for optimal hygiene
                conditions
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Status */}
        {latestData && (
          <div
            className={`rounded-2xl p-8 mb-8 text-white card-shadow-lg ${
              latestData.hygiene_status === "HYGIENIC"
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : "bg-gradient-to-r from-red-400 to-rose-500"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {latestData.hygiene_status === "HYGIENIC" ? (
                  <CheckCircle className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16" />
                )}
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {latestData.hygiene_status}
                  </h2>
                  <p className="text-lg opacity-90">
                    {latestData.hygiene_status === "HYGIENIC"
                      ? "Washroom environment is within safe parameters"
                      : `Issues detected: ${latestData.issues}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Last Updated</span>
                </div>
                <p className="text-2xl font-bold">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Hygiene Monitoring
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Parameters Tracked
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Temperature (20-35°C optimal range)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Humidity (40-65% optimal range)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Air Quality (CO2, CO, NO2 levels)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Particulate Matter (PM10)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Occupancy Detection (PIR sensor)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Benefits
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Ensures clean and safe washroom environment
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Reduces risk of infections and health issues
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Optimized cleaning schedules
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Real-time alerts for maintenance staff
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Data-driven facility management
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Metrics */}
        {latestData && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Current Readings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                icon={Thermometer}
                title="Temperature"
                value={latestData.temp}
                unit="°C"
                status={tempStatus?.status}
                color={tempStatus?.color as any}
              />
              <MetricCard
                icon={Droplets}
                title="Humidity"
                value={latestData.hum}
                unit="%"
                status={humStatus?.status}
                color={humStatus?.color as any}
              />
              <MetricCard
                icon={Wind}
                title="Air Quality (CO2)"
                value={latestData.co2}
                unit="ppm"
                status={airQuality?.level}
                color={airQuality?.color as any}
              />
              <MetricCard
                icon={Wind}
                title="PM10"
                value={latestData.pm10}
                unit="µg/m³"
                status={latestData.pm10 > 100 ? "High" : "Normal"}
                color={latestData.pm10 > 100 ? "red" : "green"}
              />
            </div>
          </>
        )}

        {/* Occupancy Status */}
        {latestData && (
          <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Occupancy Status
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users
                  className={`w-12 h-12 ${
                    latestData.pir === 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {latestData.pir === 1 ? "Occupied" : "Vacant"}
                  </p>
                  <p className="text-gray-600">
                    {latestData.pir === 1
                      ? "Motion detected - Washroom in use"
                      : "No motion - Washroom available"}
                  </p>
                </div>
              </div>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  latestData.pir === 1 ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${
                    latestData.pir === 1
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Predictive Maintenance
            </h3>
            <p className="text-gray-600 text-sm">
              AI-powered analytics predict when cleaning or maintenance is
              needed based on usage patterns
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant Alerts
            </h3>
            <p className="text-gray-600 text-sm">
              Maintenance staff receive real-time notifications when hygiene
              parameters fall below standards
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <Shield className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Health Safety
            </h3>
            <p className="text-gray-600 text-sm">
              Continuous monitoring ensures washrooms maintain standards for
              menstrual hygiene and user safety
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
