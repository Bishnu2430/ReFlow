import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Alert } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: number) => void;
}

export const AlertSystem: React.FC<AlertSystemProps> = ({
  alerts,
  onDismiss,
}) => {
  if (alerts.length === 0) {
    return null;
  }

  const severityConfig = {
    high: {
      bg: "bg-red-100 border-red-300 text-red-800",
      icon: "text-red-600",
      badge: "bg-red-600 text-white",
    },
    medium: {
      bg: "bg-yellow-100 border-yellow-300 text-yellow-800",
      icon: "text-yellow-600",
      badge: "bg-yellow-600 text-white",
    },
    low: {
      bg: "bg-blue-100 border-blue-300 text-blue-800",
      icon: "text-blue-600",
      badge: "bg-blue-600 text-white",
    },
  };

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity];

        return (
          <div
            key={alert.id}
            className={cn(
              "rounded-lg border-l-4 p-3 animate-fade-in relative",
              config.bg
            )}
          >
            <button
              onClick={() => onDismiss(alert.id)}
              className="absolute top-2 right-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <AlertTriangle
                className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.icon)}
              />

              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "text-xs font-bold uppercase px-2 py-0.5 rounded",
                      config.badge
                    )}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-xs opacity-70">{alert.timestamp}</span>
                </div>

                <p className="text-sm font-medium mb-1">{alert.message}</p>

                {alert.issues.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {alert.issues.map((issue, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-50"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
