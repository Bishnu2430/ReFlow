import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, message, sensorData } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Discord webhook URL not configured" },
        { status: 500 }
      );
    }

    // Color based on severity
    const colors = {
      high: 15158332, // Red
      medium: 15105570, // Orange
      low: 3447003, // Blue
      success: 3066993, // Green
    };

    const color = colors[severity as keyof typeof colors] || colors.low;

    // Create Discord embed message
    const discordPayload = {
      username: "IoT Health Monitor",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/2913/2913133.png",
      embeds: [
        {
          title: `🚨 ${type} Alert`,
          description: message,
          color: color,
          fields: sensorData
            ? [
                {
                  name: "🌡️ Temperature",
                  value: `${sensorData.temp}°C`,
                  inline: true,
                },
                {
                  name: "💧 Humidity",
                  value: `${sensorData.hum}%`,
                  inline: true,
                },
                {
                  name: "🌬️ CO2 Level",
                  value: `${sensorData.co2} ppm`,
                  inline: true,
                },
                {
                  name: "☁️ PM10",
                  value: `${sensorData.pm10} µg/m³`,
                  inline: true,
                },
                {
                  name: "📊 Status",
                  value: sensorData.hygiene_status,
                  inline: true,
                },
                {
                  name: "⚠️ Issues",
                  value: sensorData.issues || "None",
                  inline: true,
                },
              ]
            : [],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Menstrual Health IoT System",
          },
        },
      ],
    };

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      message: "Discord notification sent successfully",
    });
  } catch (error) {
    console.error("Discord notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send Discord notification" },
      { status: 500 }
    );
  }
}

// Test endpoint
export async function GET() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  return NextResponse.json({
    configured: !!webhookUrl,
    message: webhookUrl
      ? "Discord webhook is configured"
      : "Discord webhook URL not set",
  });
}
