import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sensor data type
export interface SensorData {
  load: number;
  mq: number;
  temp: number;
  hum: number;
  flame: number;
  pir: number;
  dist: number;
  photo: number;
  pm10: number;
  co2: number;
  co: number;
  no2: number;
  hygiene_status: "HYGIENIC" | "UNHYGIENIC";
  issues: string;
  timestamp?: string;
  device_id?: string;
}

// Alert type
export interface Alert {
  id: number;
  severity: "high" | "medium" | "low";
  message: string;
  timestamp: string;
  issues: string[];
}

// Check if value is in safe range
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

// Get status color based on hygiene status
export function getStatusColor(status: "HYGIENIC" | "UNHYGIENIC"): string {
  return status === "HYGIENIC" ? "green" : "red";
}

// Get air quality level based on CO2
export function getAirQualityLevel(co2: number): {
  level: string;
  color: string;
} {
  if (co2 < 600) return { level: "Excellent", color: "green" };
  if (co2 < 1000) return { level: "Good", color: "blue" };
  if (co2 < 1500) return { level: "Moderate", color: "yellow" };
  return { level: "Poor", color: "red" };
}

// Get temperature status
export function getTemperatureStatus(temp: number): {
  status: string;
  color: string;
} {
  if (temp < 20) return { status: "Too Cold", color: "blue" };
  if (temp > 35) return { status: "Too Hot", color: "red" };
  return { status: "Normal", color: "green" };
}

// Get humidity status
export function getHumidityStatus(hum: number): {
  status: string;
  color: string;
} {
  if (hum < 40) return { status: "Too Dry", color: "yellow" };
  if (hum > 65) return { status: "Too Humid", color: "red" };
  return { status: "Normal", color: "green" };
}

// Format timestamp
export function formatTimestamp(timestamp: string): string {
  try {
    const parts = timestamp.split("_");
    if (parts.length === 2) {
      const date = parts[0];
      const time = parts[1].replace(/-/g, ":");
      return `${date} ${time}`;
    }
    return timestamp;
  } catch {
    return timestamp;
  }
}

// Check if notification permission is granted
export function canShowNotification(): boolean {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "granted"
  );
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

// Show browser notification
export function showNotification(title: string, body: string, icon?: string) {
  if (canShowNotification()) {
    new Notification(title, {
      body,
      icon: icon || "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [200, 100, 200],
      tag: "hygiene-alert",
      requireInteraction: true,
    });
  }
}
