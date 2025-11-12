"use client";

import React from "react";
import {
  Heart,
  Users,
  BookOpen,
  Video,
  Globe,
  TrendingUp,
  Award,
  Target,
  Leaf,
  Shield,
  Smile,
  Briefcase,
} from "lucide-react";

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Menstrual Health Awareness
              </h1>
              <p className="text-gray-600 mt-1">
                Breaking taboos, empowering women, and promoting menstrual
                dignity
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 mb-8 text-white card-shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            To create a society where menstruation is understood, accepted, and
            managed with dignity. Through education, technology, and sustainable
            solutions, we aim to eliminate stigma and ensure every woman has
            access to safe, hygienic menstrual health products and information.
          </p>
        </div>

        {/* Why Awareness Matters */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Menstrual Health Awareness Matters
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-pink-700 mb-4">
                The Problem
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>71% of girls</strong> in India are unaware of
                    menstruation until their first period
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>23% of girls</strong> drop out of school after
                    reaching puberty due to lack of facilities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Only 36%</strong> of women in rural areas use
                    sanitary napkins
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    Menstrual stigma leads to{" "}
                    <strong>shame, isolation, and health risks</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Unsafe disposal</strong> methods harm the
                    environment and public health
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Our Solution
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Educational content</strong> in multiple languages
                    and formats
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Automated awareness campaigns</strong> delivered via
                    digital platforms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Community workshops</strong> for girls, women, and
                    families
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Accessible products</strong> through smart vending
                    machines
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Eco-friendly solutions</strong> for sustainable
                    menstrual health management
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awareness Delivery Methods */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How We Spread Awareness
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <Video className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Educational Videos
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Animated explainer videos covering menstrual health basics,
                hygiene practices, and myth-busting
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Available in 10+ regional languages</li>
                <li>• Age-appropriate content</li>
                <li>• Culturally sensitive approach</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Informative Articles
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Comprehensive guides on menstrual health, product usage, and
                wellness tips
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Medical accuracy verified</li>
                <li>• Easy-to-understand language</li>
                <li>• Regular content updates</li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
              <Globe className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Infographics
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Visual content for quick learning and social media sharing
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Shareable on all platforms</li>
                <li>• Visually engaging design</li>
                <li>• Quick facts and tips</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Impact Areas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Community Reach
              </h3>
              <p className="text-3xl font-bold text-pink-600 mb-1">10,000+</p>
              <p className="text-sm text-gray-600">Women educated in Year 1</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                School Attendance
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">↑ 35%</p>
              <p className="text-sm text-gray-600">Reduction in absenteeism</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smile className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Stigma Reduction
              </h3>
              <p className="text-3xl font-bold text-green-600 mb-1">80%</p>
              <p className="text-sm text-gray-600">Report feeling empowered</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Job Creation</h3>
              <p className="text-3xl font-bold text-purple-600 mb-1">500+</p>
              <p className="text-sm text-gray-600">Women employed via SHGs</p>
            </div>
          </div>
        </div>

        {/* Women Empowerment */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white card-shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Women Empowerment Through SHGs
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Economic Empowerment
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Self-Help Groups (SHGs) produce biodegradable sanitary
                    napkins locally
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Women gain financial independence and entrepreneurial skills
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Creates sustainable livelihoods in rural and low-income
                    areas
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Social Impact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Builds confidence and community leadership among women
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Promotes open dialogue about menstrual health in communities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <span>
                    Improves overall health outcomes and reduces stigma
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-2xl p-8 mb-8 card-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Environmental Sustainability
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <Leaf className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Biodegradable Products
              </h3>
              <p className="text-gray-600 text-sm">
                Sanitary napkins made from natural fibers like banana fiber,
                bamboo, and corn starch that decompose within 6-8 months
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waste Reduction
              </h3>
              <p className="text-gray-600 text-sm">
                Smart incinerators safely dispose of used products, reducing
                landfill waste and preventing environmental contamination
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Carbon Footprint
              </h3>
              <p className="text-gray-600 text-sm">
                Local production and distribution significantly reduces
                transportation emissions and supports circular economy
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-12 text-center text-white card-shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 opacity-90">
            Help us break the silence and create a world where menstruation is
            not a barrier to education, work, or dignity
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur">
              <h3 className="font-bold text-lg mb-2">Educate</h3>
              <p className="text-sm opacity-90">
                Share awareness content with your community
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur">
              <h3 className="font-bold text-lg mb-2">Support</h3>
              <p className="text-sm opacity-90">
                Partner with us through CSR or donations
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur">
              <h3 className="font-bold text-lg mb-2">Implement</h3>
              <p className="text-sm opacity-90">
                Install our systems in your institution
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
