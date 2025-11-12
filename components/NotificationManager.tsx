import React, { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { requestNotificationPermission } from "@/lib/utils";

export const NotificationManager: React.FC = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleEnableNotifications = async () => {
    setLoading(true);
    const granted = await requestNotificationPermission();
    setPermission(granted ? "granted" : "denied");
    setLoading(false);

    if (granted) {
      // Show test notification
      new Notification("Notifications Enabled!", {
        body: "You will now receive alerts for hygiene issues.",
        icon: "/icon-192x192.png",
      });
    }
  };

  if (permission === "granted") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Bell className="w-4 h-4" />
        <span>Notifications Active</span>
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <BellOff className="w-4 h-4" />
        <span>Notifications Blocked</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleEnableNotifications}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm"
    >
      <Bell className="w-4 h-4" />
      {loading ? "Enabling..." : "Enable Notifications"}
    </button>
  );
};
