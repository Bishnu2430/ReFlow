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
  Bell,
  Droplets,
  Thermometer,
  Wind,
  Activity,
  AlertTriangle,
  CheckCircle,
  Flame,
  Users,
  Gauge,
  Cloud,
  TrendingUp,
} from "lucide-react";
import {
  SensorData,
  Alert,
  getAirQualityLevel,
  getTemperatureStatus,
  getHumidityStatus,
  showNotification,
} from "@/lib/utils";
import { MetricCard } from "./MetricCard";
import { AlertSystem } from "./AlertSystem";
import { HistoricalChart } from "./HistoricalChart";
import { NotificationManager } from "./NotificationManager";

export const Dashboard: React.FC = () => {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedChart, setSelectedChart] = useState<
    "temp" | "hum" | "co2" | "pm10"
  >("temp");

  // Listen to latest sensor data
  useEffect(() => {
    const latestRef = ref(database, "sensorData/latest");

    const unsubscribe = onValue(
      latestRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as SensorData;
          setLatestData(data);
          setLastUpdate(new Date());
          setLoading(false);

          // Check for alerts
          checkAndTriggerAlerts(data);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch historical data
  useEffect(() => {
    const historyRef = query(
      ref(database, "sensorData"),
      orderByKey(),
      limitToLast(25)
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
    });

    return () => unsubscribe();
  }, []);

  // Alert checking and notification system
  const checkAndTriggerAlerts = (data: SensorData) => {
    const newAlerts: Alert[] = [];
    const issues = data.issues?.trim().split(" ").filter(Boolean) || [];

    if (data.hygiene_status === "UNHYGIENIC") {
      const alertMessage = `⚠️ Washroom Hygiene Alert: ${issues.join(", ")}`;

      newAlerts.push({
        id: Date.now(),
        severity: "high",
        message: alertMessage,
        timestamp: new Date().toLocaleTimeString(),
        issues: issues,
      });

      // Browser notification
      showNotification("Hygiene Alert!", alertMessage);
    }

    // Temperature alert
    if (data.temp < 20 || data.temp > 35) {
      newAlerts.push({
        id: Date.now() + 1,
        severity: "medium",
        message: `Temperature out of range: ${data.temp}°C`,
        timestamp: new Date().toLocaleTimeString(),
        issues: ["Temperature"],
      });
    }

    // CO2 alert
    if (data.co2 > 1000) {
      newAlerts.push({
        id: Date.now() + 2,
        severity: "high",
        message: `High CO2 levels detected: ${data.co2} ppm`,
        timestamp: new Date().toLocaleTimeString(),
        issues: ["Air Quality"],
      });
    }

    // PM10 alert
    if (data.pm10 > 100) {
      newAlerts.push({
        id: Date.now() + 3,
        severity: "medium",
        message: `High PM10 particulate matter: ${data.pm10} µg/m³`,
        timestamp: new Date().toLocaleTimeString(),
        issues: ["Particulate Matter"],
      });
    }

    // Update alerts (keep last 10)
    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10));
    }
  };

  const handleDismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sensor data...</p>
        </div>
      </div>
    );
  }

  if (!latestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 card-shadow-lg max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600">
            Waiting for sensor readings from the IoT device...
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Make sure your ESP32 is connected and sending data.
          </p>
        </div>
      </div>
    );
  }

  const airQuality = getAirQualityLevel(latestData.co2);
  const tempStatus = getTemperatureStatus(latestData.temp);
  const humStatus = getHumidityStatus(latestData.hum);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Real-Time Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Live monitoring of all IoT sensors and system status
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right bg-white px-4 py-2 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Last Update</p>
                <p className="text-sm font-medium text-gray-700">
                  {lastUpdate?.toLocaleTimeString() || "Never"}
                </p>
              </div>
              <NotificationManager />
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {alerts.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Overall Status Banner */}
        <div
          className={`rounded-2xl p-6 mb-6 text-white card-shadow-lg ${
            latestData.hygiene_status === "HYGIENIC"
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : "bg-gradient-to-r from-red-400 to-rose-500"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {latestData.hygiene_status === "HYGIENIC" ? (
                <CheckCircle className="w-12 h-12" />
              ) : (
                <AlertTriangle className="w-12 h-12" />
              )}
              <div>
                <h2 className="text-3xl font-bold">
                  {latestData.hygiene_status}
                </h2>
                <p className="text-sm opacity-90">
                  {latestData.hygiene_status === "HYGIENIC"
                    ? "All systems operating within normal parameters"
                    : `Issues detected: ${latestData.issues}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Device Status</p>
              <p className="text-lg font-semibold">
                {latestData.device_id || "ESP32_001"} - Active
              </p>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Active Alerts ({alerts.length})
            </h2>
            <AlertSystem alerts={alerts} onDismiss={handleDismissAlert} />
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            icon={Thermometer}
            title="Temperature"
            value={latestData.temp}
            unit="°C"
            status={tempStatus.status}
            color={tempStatus.color as any}
          />
          <MetricCard
            icon={Droplets}
            title="Humidity"
            value={latestData.hum}
            unit="%"
            status={humStatus.status}
            color={humStatus.color as any}
          />
          <MetricCard
            icon={Wind}
            title="CO2 Level"
            value={latestData.co2}
            unit="ppm"
            status={airQuality.level}
            color={airQuality.color as any}
          />
          <MetricCard
            icon={Cloud}
            title="PM10"
            value={latestData.pm10}
            unit="µg/m³"
            status={latestData.pm10 > 100 ? "High" : "Normal"}
            color={latestData.pm10 > 100 ? "red" : "green"}
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <MetricCard
            icon={Gauge}
            title="Load Cell"
            value={latestData.load}
            unit="g"
            color="purple"
            status={latestData.load > 900 ? "Overload" : "Normal"}
          />
          <MetricCard
            icon={Activity}
            title="CO Level"
            value={latestData.co}
            unit="ppm"
            color={latestData.co > 200 ? "red" : "green"}
            status={latestData.co > 200 ? "High" : "Safe"}
          />
          <MetricCard
            icon={Activity}
            title="NO2 Level"
            value={latestData.no2}
            unit="ppm"
            color={latestData.no2 > 1000 ? "red" : "green"}
            status={latestData.no2 > 1000 ? "High" : "Safe"}
          />
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  Flame Detector
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  latestData.flame === 1
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {latestData.flame === 1 ? "DETECTED" : "Normal"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Motion Sensor
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  latestData.pir === 1
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {latestData.pir === 1 ? "Occupied" : "Vacant"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  Distance
                </span>
              </div>
              <span className="text-lg font-bold text-gray-800">
                {latestData.dist}{" "}
                <span className="text-sm font-normal">cm</span>
              </span>
            </div>
          </div>
        </div>

        {/* Historical Charts */}
        <div className="bg-white rounded-2xl p-6 card-shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-800">Historical Data</h2>
            <div className="flex gap-2">
              {(["temp", "hum", "co2", "pm10"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedChart(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === metric
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {metric.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {historicalData.length > 0 ? (
            <HistoricalChart data={historicalData} metric={selectedChart} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No historical data available yet
            </p>
          )}
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            System Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Database URL</p>
              <p className="font-medium text-gray-800 break-all">
                {process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Last Sensor Reading</p>
              <p className="font-medium text-gray-800">
                {latestData.timestamp || lastUpdate?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
