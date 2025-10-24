'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Check, School, BarChart3, Users, Zap, Shield, Globe, Award, TrendingUp, Star, Brain } from 'lucide-react'
import Link from 'next/link'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardHover = {
  whileHover: { y: -8, transition: { duration: 0.3 } }
}

const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl opacity-40"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE - CONTENT */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <Badge className="bg-blue-100 text-blue-800 border-none px-4 py-2 text-sm font-medium">
                🇮🇳 NEP 2020 Compliant | Viksit Bharat 2047 Aligned
              </Badge>
              
              {/* Main Headline */}
              <h1 className="font-bold text-5xl lg:text-6xl text-gray-900 leading-tight">
                Discover Every Student's
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Complete Potential
                </span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                AI-powered holistic talent intelligence for schools. Transform report cards from grades-only to complete talent profiles—aligned with NEP 2020's vision.
              </p>
              
              {/* Key Value Props */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-base text-gray-700">
                    Evidence-Based: AI analyzes actual student work, not surveys
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-base text-gray-700">
                    Longitudinal Tracking: Class 6-12 developmental intelligence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-base text-gray-700">
                    Offline-First: Works without internet—built for rural India
                  </span>
                </div>
              </div>
              
  
            </motion.div>
            
            {/* RIGHT SIDE - VISUAL */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Hero Mockup */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  {/* Student Profile Header */}
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-600">Aarav Kumar</h3>
                      <p className="text-sm text-gray-600">Class 10 • Section A</p>
                    </div>
                  </div>
                  
                  {/* Talent Radar Chart Placeholder */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="h-32 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute inset-2 w-28 h-28 border-4 border-blue-300 rounded-full"></div>
                        <div className="absolute inset-4 w-24 h-24 border-4 border-blue-400 rounded-full"></div>
                        <div className="absolute inset-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">Talent Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Growth Trajectory */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-blue-600">Growth Trajectory</h4>
                    <div className="h-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center px-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-8 bg-green-400/60 rounded"></div>
                        <div className="w-2 h-12 bg-green-400/70 rounded"></div>
                        <div className="w-2 h-10 bg-green-400/80 rounded"></div>
                        <div className="w-2 h-14 bg-green-500 rounded"></div>
                        <div className="w-2 h-16 bg-green-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Career Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-blue-600">Career Matches</h4>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Architecture 92%</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Design 89%</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce shadow-lg">
                NEP 2020
              </div>
              <div className="absolute top-1/2 -left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                Offline-First
              </div>
              <div className="absolute -bottom-4 right-1/4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce shadow-lg" style={{ animationDelay: '2s' }}>
                5 Crore Students
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
              India's Talent Discovery Crisis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              25 crore students measured by marks alone. 80% of their talents remain invisible.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} {...cardHover}>
              <Card className="bg-white border border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    📊
                  </motion.div>
                  <div className="font-bold text-6xl text-orange-500 mb-4">
                    25 Crore
                  </div>
                  <div className="font-medium text-lg text-gray-700">
                    Students Evaluated Only By Marks
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} {...cardHover}>
              <Card className="bg-white border border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    🎓
                  </motion.div>
                  <div className="font-bold text-6xl text-orange-500 mb-4">
                    93%
                  </div>
                  <div className="font-medium text-lg text-gray-700">
                    Know Only 7 Traditional Careers
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} {...cardHover}>
              <Card className="bg-white border border-gray-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    🔍
                  </motion.div>
                  <div className="font-bold text-6xl text-orange-500 mb-4">
                    80%
                  </div>
                  <div className="font-medium text-lg text-gray-700">
                    Hidden Talents Never Discovered
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
              Why Schools Choose VIKAAS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The complete solution for NEP 2020 compliance and student talent discovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Multi-modal AI analyzes projects, artwork, and activities to identify unique talents"
              },
              {
                icon: Shield,
                title: "NEP 2020 Compliant",
                description: "Fully aligned with National Education Policy requirements for holistic assessment"
              },
              {
                icon: TrendingUp,
                title: "Longitudinal Tracking",
                description: "Monitor student development from Class 6-12 with comprehensive progress reports"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn} {...cardHover}>
                <Card className="text-center shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  )
}