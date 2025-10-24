'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Lightbulb
} from 'lucide-react'
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
  ],
  schools: [
    {
      icon: Shield,
      title: "NEP 2020 Compliance",
      description: "Full alignment with National Education Policy requirements",
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "School-wide insights and performance metrics",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Digital Integration",
      description: "Seamless integration with existing school management systems",
      color: "green"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Access platform from any device, anywhere, anytime",
      color: "orange"
    }
  ]
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
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

            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="students" className="text-lg">For Students</TabsTrigger>
                <TabsTrigger value="teachers" className="text-lg">For Teachers</TabsTrigger>
                <TabsTrigger value="schools" className="text-lg">For Schools</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.students.map((feature, index) => (
                    <motion.div key={index} variants={fadeIn}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                        <CardHeader>
                          <div className={`w-16 h-16 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                          </div>
                          <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teachers" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.teachers.map((feature, index) => (
                    <motion.div key={index} variants={fadeIn}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                        <CardHeader>
                          <div className={`w-16 h-16 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                          </div>
                          <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schools" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.schools.map((feature, index) => (
                    <motion.div key={index} variants={fadeIn}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                        <CardHeader>
                          <div className={`w-16 h-16 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                          </div>
                          <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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

      {/* How VIKAAS Works Section */}
      <section className="py-24 bg-white">
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
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Simple. Powerful. Transformative.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how VIKAAS works in 4 simple steps to transform education
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 items-center">
              {/* Step 1 */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl mb-4">👨‍🎓</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
                  <p className="text-gray-600 mb-4">Upload Work</p>
                  <p className="text-sm text-gray-500">Artwork, Projects, Essays</p>
                </div>
              </motion.div>

              {/* Horizontal Arrow 1 */}
              <motion.div variants={fadeIn} className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                    <div className="w-0 h-0 border-l-8 border-l-orange-500 border-y-4 border-y-transparent"></div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl mb-4">👩‍🏫</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Teachers</h3>
                  <p className="text-gray-600 mb-4">Add Notes</p>
                  <p className="text-sm text-gray-500">30-sec Voice</p>
                </div>
              </motion.div>

              {/* Horizontal Arrow 2 */}
              <motion.div variants={fadeIn} className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                    <div className="w-0 h-0 border-l-8 border-l-orange-500 border-y-4 border-y-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-4 gap-8 items-center mt-8">
              {/* Step 3 */}
              <motion.div variants={fadeIn} className="text-center md:col-start-2">
                <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analyzes</h3>
                  <p className="text-gray-600 mb-4">Patterns, Growth</p>
                </div>
              </motion.div>

              {/* Horizontal Arrow 3 */}
              <motion.div variants={fadeIn} className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                    <div className="w-0 h-0 border-l-8 border-l-orange-500 border-y-4 border-y-transparent"></div>
                  </div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Holistic</h3>
                  <p className="text-gray-600 mb-4">Profile Generated</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Innovations Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                Three Breakthrough Innovations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cutting-edge technology that sets VIKAAS apart
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Innovation 1 */}
              <motion.div variants={fadeIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-100 text-blue-800">Innovation 1</Badge>
                  </div>
                  <CardHeader className="pt-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Visual Evidence Engine</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      AI analyzes actual student work—not self-reported interests. 
                      Computer vision identifies cognitive patterns from artwork.
                    </p>
                    <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Innovation 2 */}
              <motion.div variants={fadeIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-100 text-blue-800">Innovation 2</Badge>
                  </div>
                  <CardHeader className="pt-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Longitudinal Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      Tracks talent development Class 6-12. Time-series ML predicts growth trajectories.
                    </p>
                    <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Innovation 3 */}
              <motion.div variants={fadeIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-100 text-blue-800">Innovation 3</Badge>
                  </div>
                  <CardHeader className="pt-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-center">Behavioral Intelligence</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      Passive monitoring for early intervention. Detects at-risk patterns 12-18 months early.
                    </p>
                    <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Alignment Showcase */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
              <h2 className="text-4xl font-bold text-white mb-4">
                Aligned with India's National Vision
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-12">
              {/* NEP 2020 */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-44 h-44 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-white mx-auto mb-2" />
                    <div className="text-white font-bold">NEP 2020</div>
                  </div>
                </div>
                <p className="text-white font-medium">Holistic Development</p>
              </motion.div>

              {/* Viksit Bharat 2047 */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-44 h-44 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-white mx-auto mb-2" />
                    <div className="text-white font-bold">Viksit Bharat 2047</div>
                  </div>
                </div>
                <p className="text-white font-medium">Human Capital Development</p>
              </motion.div>

              {/* Digital India */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-44 h-44 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-center">
                    <Smartphone className="h-12 w-12 text-white mx-auto mb-2" />
                    <div className="text-white font-bold">Digital India</div>
                  </div>
                </div>
                <p className="text-white font-medium">Technology Integration</p>
              </motion.div>

              {/* Ek Bharat Shreshtha Bharat */}
              <motion.div variants={fadeIn} className="text-center">
                <div className="w-44 h-44 mx-auto bg-gradient-to-br from-orange-400 via-white via-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-white mx-auto mb-2" />
                    <div className="text-white font-bold text-sm">Ek Bharat</div>
                    <div className="text-white font-bold text-sm">Shreshtha Bharat</div>
                  </div>
                </div>
                <p className="text-white font-medium">Rural-Urban Equity</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
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
                Advanced Technology
              </h2>
              <p className="text-xl text-gray-600">
                Cutting-edge AI and machine learning powering education transformation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Multi-Modal AI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Analyzes text, images, audio, and video to provide comprehensive talent insights
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Real-Time Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Get instant insights and recommendations with our lightning-fast AI engine
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Secure & Private</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Enterprise-grade security ensuring student data privacy and compliance
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      
    </div>
  )
}