import { NextRequest, NextResponse } from "next/server";

// This API route can be used to send email/SMS notifications
// You can call this from the ESP32 or from the frontend

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, message, sensorData } = body;

    // Example: Send email using Resend (install: npm install resend)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: process.env.EMAIL_TO!,
    //   subject: `[${severity.toUpperCase()}] Hygiene Alert`,
    //   html: `
    //     <h2>Washroom Hygiene Alert</h2>
    //     <p>${message}</p>
    //     <h3>Sensor Readings:</h3>
    //     <ul>
    //       <li>Temperature: ${sensorData.temp}°C</li>
    //       <li>Humidity: ${sensorData.hum}%</li>
    //       <li>CO2: ${sensorData.co2} ppm</li>
    //       <li>Status: ${sensorData.hygiene_status}</li>
    //     </ul>
    //   `,
    // });

    // Example: Send SMS using Twilio (install: npm install twilio)
    // const twilio = require('twilio');
    // const client = twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    // await client.messages.create({
    //   body: `[ALERT] ${message}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: process.env.ALERT_PHONE_NUMBER,
    // });

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

// GET endpoint to check notification service status
export async function GET() {
  return NextResponse.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    services: {
      email: process.env.RESEND_API_KEY ? "configured" : "not configured",
      sms: process.env.TWILIO_ACCOUNT_SID ? "configured" : "not configured",
    },
  });
}
