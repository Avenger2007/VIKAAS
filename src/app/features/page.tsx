'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InfoBanner } from '@/components/ui/info-banner'
import { 
  ArrowRight, 
  Brain, 
  FileText, 
  Mic, 
  Upload, 
  BarChart3, 
  Users, 
  Shield, 
  Zap,
  Eye,
  Download,
  Smartphone,
  Globe,
  ArrowDown,
  Palette,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react'

export default function FeaturesPage() {
  const [showPricingBanner, setShowPricingBanner] = useState(false)
  const [showDemoBanner, setShowDemoBanner] = useState(false)

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

  const features = {
    students: [
      {
        icon: Upload,
        title: "Multi-Format Upload",
        description: "Submit projects, artwork, videos, and documents in any format",
        color: "blue"
      },
      {
        icon: Brain,
        title: "AI Talent Analysis",
        description: "Get personalized insights about your unique strengths and abilities",
        color: "purple"
      },
      {
        icon: BarChart3,
        title: "Progress Tracking",
        description: "Monitor your growth across different skill areas over time",
        color: "green"
      },
      {
        icon: Eye,
        title: "Career Matching",
        description: "Discover career paths that align with your talents and interests",
        color: "orange"
      }
    ],
    teachers: [
      {
        icon: Mic,
        title: "30-Second Observations",
        description: "Quick voice notes to capture student behaviors and achievements",
        color: "red"
      },
      {
        icon: FileText,
        title: "Behavioral Tagging",
        description: "Tag specific traits and skills with our intelligent system",
        color: "indigo"
      },
      {
        icon: Users,
        title: "Class Management",
        description: "Overview of entire class performance and individual progress",
        color: "teal"
      },
      {
        icon: Download,
        title: "Report Generation",
        description: "Automated NEP 2020 compliant reports for parents and administration",
        color: "pink"
      }
    ]
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Platform Features
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Every User
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover how VIKAAS transforms education with AI-driven insights, 
              seamless collaboration, and comprehensive talent discovery tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setShowDemoBanner(true)}
              >
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowPricingBanner(true)}
              >
                View Pricing
              </Button>
            </div>

            <InfoBanner
              open={showPricingBanner}
              onClose={() => setShowPricingBanner(false)}
              title="Coming Soon"
              description="Our pricing details will be available shortly. Stay tuned for our competitive and flexible pricing plans!"
            />

            <InfoBanner
              open={showDemoBanner}
              onClose={() => setShowDemoBanner(false)}
              title="Demo Coming Soon"
              description="We're working on setting up our demo system. Please check back soon to experience VIKAAS in action!"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tailored for Every Role
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each user gets a personalized experience designed to meet their specific needs
              </p>
            </motion.div>

            <Tabs defaultValue="students" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex gap-4">
                <TabsTrigger value="students" className="text-lg">For Students</TabsTrigger>
                <TabsTrigger value="teachers" className="text-lg">For Teachers</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.students.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      variants={fadeIn}
                      custom={index}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                            <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teachers" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.teachers.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      variants={fadeIn}
                      custom={index}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                            <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  )
}