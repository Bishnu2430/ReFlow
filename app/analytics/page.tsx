"use client";

import React, { useState, useEffect } from "react";
import {
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { database } from "@/lib/firebase";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { SensorData } from "@/lib/utils";
import { HistoricalChart } from "@/components/HistoricalChart";

export default function AnalyticsPage() {
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<
    "temp" | "hum" | "co2" | "pm10"
  >("temp");

  useEffect(() => {
    const historyRef = query(
      ref(database, "sensorData"),
      orderByKey(),
      limitToLast(50)
    );
    const unsubscribe = onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.entries(data)
          .filter(([key]) => key !== "latest")
          .map(([key, value]) => ({ id: key, ...(value as SensorData) }))
          .reverse();
        setHistoricalData(dataArray as SensorData[]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const calculateStats = (metric: keyof SensorData) => {
    const values = historicalData
      .map((d) => Number(d[metric]))
      .filter((v) => !isNaN(v));
    if (values.length === 0) return { avg: 0, min: 0, max: 0, trend: 0 };

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Calculate trend (last 5 vs previous 5)
    const recent = values.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    const previous = values.slice(5, 10).reduce((a, b) => a + b, 0) / 5;
    const trend = ((recent - previous) / previous) * 100;

    return { avg, min, max, trend };
  };

  const tempStats = calculateStats("temp");
  const humStats = calculateStats("hum");
  const co2Stats = calculateStats("co2");
  const pm10Stats = calculateStats("pm10");

  // Count hygiene status
  const hygieneCount = historicalData.reduce((acc, d) => {
    acc[d.hygiene_status] = (acc[d.hygiene_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hygienePercentage = hygieneCount["HYGIENIC"]
    ? (hygieneCount["HYGIENIC"] / historicalData.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Data Analytics & Insights
              </h1>
              <p className="text-gray-600 mt-1">
                Historical trends and performance metrics
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Performance */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Overall Performance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  UPTIME
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {hygienePercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Hygiene Score</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                  RECORDS
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {historicalData.length}
              </div>
              <div className="text-sm text-gray-600">Data Points Collected</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-orange-600" />
                <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                  ALERTS
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {hygieneCount["UNHYGIENIC"] || 0}
              </div>
              <div className="text-sm text-gray-600">Issues Detected</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                  ACTIVE
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Real-Time Monitoring</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Statistics */}
        <div className="bg-white rounded-2xl p-6 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Metrics Statistics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Temperature */}
            <div className="border-2 border-red-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Temperature (°C)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Average</span>
                  <span className="text-lg font-bold text-gray-900">
                    {tempStats.avg.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Min / Max</span>
                  <span className="text-sm font-medium text-gray-700">
                    {tempStats.min.toFixed(1)} / {tempStats.max.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  {tempStats.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-blue-600" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      tempStats.trend > 0 ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {Math.abs(tempStats.trend).toFixed(1)}% trend
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity */}
            <div className="border-2 border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Humidity (%)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Average</span>
                  <span className="text-lg font-bold text-gray-900">
                    {humStats.avg.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Min / Max</span>
                  <span className="text-sm font-medium text-gray-700">
                    {humStats.min.toFixed(1)} / {humStats.max.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  {humStats.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="text-xs font-semibold text-blue-600">
                    {Math.abs(humStats.trend).toFixed(1)}% trend
                  </span>
                </div>
              </div>
            </div>

            {/* CO2 */}
            <div className="border-2 border-purple-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                CO2 (ppm)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Average</span>
                  <span className="text-lg font-bold text-gray-900">
                    {co2Stats.avg.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Min / Max</span>
                  <span className="text-sm font-medium text-gray-700">
                    {co2Stats.min.toFixed(0)} / {co2Stats.max.toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  {co2Stats.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      co2Stats.trend > 0 ? "text-orange-600" : "text-green-600"
                    }`}
                  >
                    {Math.abs(co2Stats.trend).toFixed(1)}% trend
                  </span>
                </div>
              </div>
            </div>

            {/* PM10 */}
            <div className="border-2 border-yellow-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                PM10 (µg/m³)
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Average</span>
                  <span className="text-lg font-bold text-gray-900">
                    {pm10Stats.avg.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Min / Max</span>
                  <span className="text-sm font-medium text-gray-700">
                    {pm10Stats.min.toFixed(1)} / {pm10Stats.max.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  {pm10Stats.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      pm10Stats.trend > 0 ? "text-orange-600" : "text-green-600"
                    }`}
                  >
                    {Math.abs(pm10Stats.trend).toFixed(1)}% trend
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Charts */}
        <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Historical Trends
            </h2>
            <div className="flex gap-2">
              {(["temp", "hum", "co2", "pm10"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {metric.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {historicalData.length > 0 ? (
            <HistoricalChart data={historicalData} metric={selectedMetric} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No historical data available
            </p>
          )}
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Key Insights
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">
                  Average hygiene score of{" "}
                  <strong>{hygienePercentage.toFixed(1)}%</strong> indicates
                  good environmental conditions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">
                  Temperature maintained within optimal range most of the time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">
                  Air quality metrics show consistent monitoring and control
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">
                  {hygieneCount["UNHYGIENIC"] || 0} alerts detected - requiring
                  attention
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recommendations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Continue regular monitoring to maintain high hygiene standards
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Schedule maintenance when stock levels drop below 30%
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Review ventilation systems if CO2 levels trend upward
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Implement predictive maintenance based on usage patterns
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
