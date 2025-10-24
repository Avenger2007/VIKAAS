'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Brain,
  Target,
  Award,
  Eye,
  Download,
  Filter,
  Calendar,
  School,
  GraduationCap,
  Activity,
  Zap,
  Star,
  BookOpen,
  Palette,
  Music,
  Heart,
  Globe
} from 'lucide-react'

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

// Mock analytics data
const analyticsData = {
  overview: {
    totalStudents: 247,
    totalAnalyses: 1846,
    avgTalentScore: 87,
    topTalentCategory: "Creative Design",
    growthRate: 12.5
  },
  
  talentDistribution: [
    { category: "Creative Design", count: 89, percentage: 36, color: "purple", icon: Palette },
    { category: "Problem Solving", count: 76, percentage: 31, color: "blue", icon: Brain },
    { category: "Leadership", count: 62, percentage: 25, color: "orange", icon: Award },
    { category: "Communication", count: 54, percentage: 22, color: "green", icon: Globe },
    { category: "Technical Skills", count: 48, percentage: 19, color: "cyan", icon: Zap },
    { category: "Musical Ability", count: 35, percentage: 14, color: "pink", icon: Music }
  ],

  classPerformance: [
    { class: "10-A", avgScore: 92, students: 28, topTalent: "Creative Design" },
    { class: "10-B", avgScore: 88, students: 26, topTalent: "Problem Solving" },
    { class: "9-A", avgScore: 85, students: 30, topTalent: "Leadership" },
    { class: "9-B", avgScore: 83, students: 27, topTalent: "Technical Skills" },
    { class: "11-A", avgScore: 90, students: 25, topTalent: "Communication" }
  ],

  monthlyTrends: [
    { month: "Jun", analyses: 145, avgScore: 78 },
    { month: "Jul", analyses: 178, avgScore: 80 },
    { month: "Aug", analyses: 234, avgScore: 82 },
    { month: "Sep", analyses: 289, avgScore: 85 },
    { month: "Oct", analyses: 342, avgScore: 87 },
    { month: "Nov", analyses: 387, avgScore: 89 }
  ],

  topPerformers: [
    { name: "Aarav Kumar", class: "10-A", score: 95, topTalent: "Creative Design", trend: "up" },
    { name: "Priya Sharma", class: "10-B", score: 92, topTalent: "Problem Solving", trend: "up" },
    { name: "Sneha Reddy", class: "11-A", score: 90, topTalent: "Communication", trend: "stable" },
    { name: "Rahul Verma", class: "9-A", score: 88, topTalent: "Musical Ability", trend: "up" },
    { name: "Kavya Patel", class: "10-C", score: 87, topTalent: "Artistic Expression", trend: "up" }
  ],

  nepCompliance: {
    cognitive: 85,
    emotional: 82,
    social: 88,
    creative: 91,
    physical: 78
  }
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Analytics & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Learning Analytics
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive insights into student performance, talent distribution, and NEP 2020 compliance across the institution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last 6 Months
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalStudents}</div>
                  <p className="text-sm text-gray-600">Total Students</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalAnalyses}</div>
                  <p className="text-sm text-gray-600">AI Analyses</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgTalentScore}%</div>
                  <p className="text-sm text-gray-600">Avg. Talent Score</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{analyticsData.overview.topTalentCategory}</div>
                  <p className="text-sm text-gray-600">Top Talent</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">+{analyticsData.overview.growthRate}%</div>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Analytics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="talent-distribution" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="talent-distribution">Talent Distribution</TabsTrigger>
              <TabsTrigger value="class-performance">Class Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends & Growth</TabsTrigger>
              <TabsTrigger value="nep-compliance">NEP 2020 Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="talent-distribution" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Talent Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of student talents across categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                          <p className="text-gray-600">Talent distribution chart</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Talent Categories
                      </CardTitle>
                      <CardDescription>
                        Student count per talent category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analyticsData.talentDistribution.map((talent, index) => {
                        const Icon = talent.icon
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">{talent.category}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-blue-500"
                                  style={{ width: `${talent.percentage * 2.5}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">{talent.count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="class-performance" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="h-5 w-5" />
                      Class Performance Overview
                    </CardTitle>
                    <CardDescription>
                      Average talent scores and top talents by class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th className="px-6 py-3">Class</th>
                            <th className="px-6 py-3">Students</th>
                            <th className="px-6 py-3">Avg Score</th>
                            <th className="px-6 py-3">Top Talent</th>
                            <th className="px-6 py-3">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.classPerformance.map((classData, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium text-gray-900">{classData.class}</td>
                              <td className="px-6 py-4">{classData.students}</td>
                              <td className="px-6 py-4">
                                <Badge variant="secondary">{classData.avgScore}%</Badge>
                              </td>
                              <td className="px-6 py-4">{classData.topTalent}</td>
                              <td className="px-6 py-4">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full bg-green-500"
                                    style={{ width: `${classData.avgScore}%` }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Monthly Trends
                      </CardTitle>
                      <CardDescription>
                        AI analyses and average scores over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                          <p className="text-gray-600">Monthly trend analysis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Top Performers
                      </CardTitle>
                      <CardDescription>
                        Students with highest talent scores
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analyticsData.topPerformers.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.class}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">{student.score}</div>
                            <p className="text-xs text-gray-500">{student.topTalent}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="nep-compliance" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      NEP 2020 Compliance Overview
                    </CardTitle>
                    <CardDescription>
                      Holistic development assessment across all students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {Object.entries(analyticsData.nepCompliance).map(([area, score]) => (
                        <div key={area} className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl font-bold text-blue-600">{score}%</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 capitalize">
                            {area.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-600">Development</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}