import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  unit?: string;
  status?: string;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  unit,
  status,
  color = "blue",
  trend,
  trendValue,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg hover:scale-105",
        colorClasses[color]
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5" />
        {status && (
          <span className="text-xs font-semibold uppercase px-2 py-1 rounded-full bg-white bg-opacity-50">
            {status}
          </span>
        )}
      </div>

      <div className="text-2xl font-bold mb-1">
        {typeof value === "number" ? value.toFixed(1) : value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs opacity-80">{title}</div>
        {trend && trendValue && (
          <div
            className={cn(
              "text-xs font-medium",
              trend === "up"
                ? "text-green-700"
                : trend === "down"
                ? "text-red-700"
                : "text-gray-700"
            )}
          >
            {trendIcons[trend]} {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};
