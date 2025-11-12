import React from "react";
import Link from "next/link";
import {
  Info,
  Target,
  Lightbulb,
  Users,
  Award,
  Zap,
  Shield,
  Leaf,
  Heart,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
              <Info className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                About Our Project
              </h1>
              <p className="text-gray-600 mt-1">
                Innovation for menstrual health dignity and sustainability
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Overview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This project presents a{" "}
            <strong>comprehensive IoT-based ecosystem</strong> designed to
            address critical challenges in menstrual health and hygiene
            management. By integrating cutting-edge technology with social
            empowerment initiatives, we aim to create sustainable, scalable
            solutions that promote dignity, health, and environmental
            responsibility.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-900 mb-3">
              Core Innovation
            </h3>
            <p className="text-gray-700">
              We leverage IoT sensors, cloud platforms, and data analytics to
              create an interconnected system that monitors hygiene conditions,
              manages waste disposal, ensures product availability, and spreads
              awareness—all while empowering women through Self-Help Groups
              (SHGs) and promoting environmental sustainability.
            </p>
          </div>
        </div>

        {/* Five Core Solutions */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Five Interconnected Solutions
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                1. Biodegradable & Economical Sanitary Napkins
              </h3>
              <p className="text-gray-700 mb-3">
                Made from natural fibers (banana fiber, bamboo, corn starch) and
                produced by women-led Self-Help Groups (SHGs), targeting rural
                and low-income demographics.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    Economic
                  </p>
                  <p className="text-xs text-gray-600">
                    Low-cost production, local employment, affordability
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-800 mb-1">
                    Social
                  </p>
                  <p className="text-xs text-gray-600">
                    Better health outcomes, women empowerment
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-purple-800 mb-1">
                    Business
                  </p>
                  <p className="text-xs text-gray-600">
                    CSR funding eligibility, scalable production
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                2. Environment-Friendly Smart Incinerators
              </h3>
              <p className="text-gray-700 mb-3">
                IoT-enabled sensors for waste tracking, emission monitoring,
                temperature control, and safety.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-orange-800 mb-1">
                    Economic
                  </p>
                  <p className="text-xs text-gray-600">
                    Reduces waste management costs, energy-efficient
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    Social
                  </p>
                  <p className="text-xs text-gray-600">
                    Clean disposal, reduces stigma, enhances hygiene
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">
                    Business
                  </p>
                  <p className="text-xs text-gray-600">
                    Scalable, recurring revenue, regulatory compliance
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                3. Automated Periodic Awareness Drives
              </h3>
              <p className="text-gray-700 mb-3">
                Educational videos, news articles, infographics with
                multi-language support to break taboos and improve awareness.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-800 mb-1">
                    Economic
                  </p>
                  <p className="text-xs text-gray-600">
                    Lower cost than physical workshops, scalable reach
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-indigo-800 mb-1">
                    Social
                  </p>
                  <p className="text-xs text-gray-600">
                    Breaks taboos, improves awareness, reduces risks
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-purple-800 mb-1">
                    Business
                  </p>
                  <p className="text-xs text-gray-600">
                    NGO partnerships, health-tech firms, CSR opportunities
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                4. Washroom Hygiene Monitoring Systems
              </h3>
              <p className="text-gray-700 mb-3">
                IoT sensors track odor (air quality), humidity, temperature, gas
                levels, and occupancy in real-time.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-cyan-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-cyan-800 mb-1">
                    Economic
                  </p>
                  <p className="text-xs text-gray-600">
                    Optimized cleaning schedules, reduced staff workload
                  </p>
                </div>
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-teal-800 mb-1">
                    Social
                  </p>
                  <p className="text-xs text-gray-600">
                    Clean, safe washrooms, reduces infections
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-800 mb-1">
                    Business
                  </p>
                  <p className="text-xs text-gray-600">
                    Subscription service, scalable for smart cities
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                5. Smart Vending Machine Refill & Maintenance
              </h3>
              <p className="text-gray-700 mb-3">
                QR/UPI integration, real-time stock monitoring, cashless
                payments, and automated alerts.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-purple-800 mb-1">
                    Economic
                  </p>
                  <p className="text-xs text-gray-600">
                    Reduced manpower, no stockouts, efficient inventory
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-pink-800 mb-1">
                    Social
                  </p>
                  <p className="text-xs text-gray-600">
                    24/7 availability, menstrual dignity, accessibility
                  </p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-rose-800 mb-1">
                    Business
                  </p>
                  <p className="text-xs text-gray-600">
                    Franchise potential, supply chain optimization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technical Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Hardware Components
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Arduino Uno</strong> - Central processing unit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>ESP32</strong> - Wi-Fi/Bluetooth connectivity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>DHT22</strong> - Temperature & humidity sensor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>MQ135</strong> - Air quality (gas) sensor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Load Cell (HX711)</strong> - Weight measurement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>PIR Motion Sensor</strong> - Occupancy detection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Ultrasonic Sensor</strong> - Distance measurement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>IR Flame Sensor</strong> - Fire detection
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Software Stack
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Next.js 15</strong> - Full-stack web framework
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>React 18</strong> - UI development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Firebase Realtime Database</strong> - Data storage
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Tailwind CSS</strong> - Styling framework
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Recharts</strong> - Data visualization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>TypeScript</strong> - Type-safe development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Vercel</strong> - Cloud hosting platform
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Web Push API</strong> - Browser notifications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Expected Outcomes
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Quantitative Goals
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700">Women Reached (Year 1)</span>
                  <span className="text-2xl font-bold text-indigo-700">
                    10,000+
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">
                    Monitoring Systems Deployed
                  </span>
                  <span className="text-2xl font-bold text-blue-700">100+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">User Satisfaction</span>
                  <span className="text-2xl font-bold text-green-700">80%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Jobs Generated</span>
                  <span className="text-2xl font-bold text-purple-700">
                    500+
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Qualitative Impact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                  <Award className="w-6 h-6 text-pink-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Improved Awareness
                    </p>
                    <p className="text-sm text-gray-600">
                      Better understanding of menstrual health
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-rose-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Reduced Absenteeism
                    </p>
                    <p className="text-sm text-gray-600">
                      Better school and workplace attendance
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Women Empowerment
                    </p>
                    <p className="text-sm text-gray-600">
                      Economic independence and dignity
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Environmental Sustainability
                    </p>
                    <p className="text-sm text-gray-600">
                      Reduced plastic waste and pollution
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
