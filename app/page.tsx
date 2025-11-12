import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShoppingBag,
  Heart,
  TrendingUp,
  Users,
  Leaf,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              IoT Solutions for
              <span className="block mt-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Menstrual Health & Hygiene
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive ecosystem integrating smart technology,
              sustainability, and women empowerment for dignified menstrual
              health management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:shadow-lg transition-all border border-gray-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      </section>

      {/* Core Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hygiene Monitoring */}
            <Link href="/hygiene" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all hover:scale-105">
                <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hygiene Monitoring
                </h3>
                <p className="text-gray-600 text-sm">
                  Real-time washroom hygiene tracking with IoT sensors
                </p>
              </div>
            </Link>

            {/* Smart Incinerator */}
            <Link href="/incinerator" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-xl transition-all hover:scale-105">
                <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Smart Incinerator
                </h3>
                <p className="text-gray-600 text-sm">
                  Eco-friendly waste disposal with emission monitoring
                </p>
              </div>
            </Link>

            {/* Smart Vending */}
            <Link href="/vending" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all hover:scale-105">
                <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Smart Vending
                </h3>
                <p className="text-gray-600 text-sm">
                  24/7 pad availability with cashless payments
                </p>
              </div>
            </Link>

            {/* Awareness */}
            <Link href="/awareness" className="group">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 hover:shadow-xl transition-all hover:scale-105">
                <div className="bg-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Social Awareness
                </h3>
                <p className="text-gray-600 text-sm">
                  Educational content breaking menstrual taboos
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Expected Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center card-shadow-lg">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Women Reached</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center card-shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">80%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center card-shadow-lg">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Systems Deployed</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center card-shadow-lg">
              <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-600">
                IoT sensors track temperature, humidity, air quality, and
                occupancy 24/7
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Eco-Friendly
              </h3>
              <p className="text-gray-600">
                Biodegradable products and sustainable waste management
                solutions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Women Empowerment
              </h3>
              <p className="text-gray-600">
                Creating employment through SHGs and promoting menstrual dignity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join us in revolutionizing menstrual health management through
            technology
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-xl transition-all text-lg"
          >
            Explore Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">Menstrual Health IoT Monitoring System</p>
          <p className="text-gray-400 text-sm">
            Presented at IIT Bhubaneswar Menstrual Health Innovation Hackathon
            2025
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2025 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
