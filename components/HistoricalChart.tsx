import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SensorData } from "@/lib/utils";

interface HistoricalChartProps {
  data: SensorData[];
  metric: "temp" | "hum" | "co2" | "pm10";
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({
  data,
  metric,
}) => {
  const metricConfig = {
    temp: {
      label: "Temperature",
      unit: "°C",
      color: "#ef4444",
      dataKey: "temp",
    },
    hum: {
      label: "Humidity",
      unit: "%",
      color: "#3b82f6",
      dataKey: "hum",
    },
    co2: {
      label: "CO2 Level",
      unit: "ppm",
      color: "#8b5cf6",
      dataKey: "co2",
    },
    pm10: {
      label: "PM10",
      unit: "µg/m³",
      color: "#f59e0b",
      dataKey: "pm10",
    },
  };

  const config = metricConfig[metric];

  // Format data for chart
  const chartData = data
    .slice(0, 20)
    .reverse()
    .map((item, index) => ({
      name: `T${index + 1}`,
      value: item[config.dataKey as keyof SensorData] as number,
      timestamp: item.timestamp,
    }));

  return (
    <div className="bg-white rounded-xl p-4 card-shadow">
      <h3 className="text-lg font-semibold mb-4">
        {config.label} - Last 20 Readings
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            label={{
              value: config.unit,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: "12px", fill: "#6b7280" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [
              `${value.toFixed(2)} ${config.unit}`,
              config.label,
            ]}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={config.color}
            strokeWidth={2}
            dot={{ fill: config.color, r: 4 }}
            activeDot={{ r: 6 }}
            name={config.label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
