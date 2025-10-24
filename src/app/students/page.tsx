'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  TrendingUp, 
  Brain, 
  Eye, 
  Download,
  Filter,
  Search,
  Star,
  Award,
  Target,
  BookOpen,
  Palette,
  Music,
  Calculator,
  Globe,
  Heart,
  Zap
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

// Mock student data with AI analysis results
const studentsData = [
  {
    id: 1,
    name: "Aarav Kumar",
    class: "10-A",
    age: 15,
    overallScore: 92,
    topTalents: [
      { area: "Creative Design", score: 95, icon: Palette, color: "purple" },
      { area: "Problem Solving", score: 88, icon: Brain, color: "blue" },
      { area: "Leadership", score: 85, icon: Award, color: "orange" }
    ],
    recentActivities: ["Science Project", "Art Competition", "Debate Club"],
    aiInsights: "Shows exceptional creative thinking and visual-spatial intelligence. Recommended career paths: Architecture, Graphic Design, UX Design.",
    growthTrend: "up",
    lastAnalysis: "2 days ago"
  },
  {
    id: 2,
    name: "Priya Sharma",
    class: "10-B",
    age: 15,
    overallScore: 88,
    topTalents: [
      { area: "Analytical Thinking", score: 92, icon: Calculator, color: "green" },
      { area: "Research Skills", score: 86, icon: BookOpen, color: "blue" },
      { area: "Communication", score: 84, icon: Globe, color: "purple" }
    ],
    recentActivities: ["Math Olympiad", "Science Fair", "Essay Writing"],
    aiInsights: "Strong logical reasoning and research abilities. Recommended career paths: Data Science, Research, Engineering.",
    growthTrend: "up",
    lastAnalysis: "1 week ago"
  },
  {
    id: 3,
    name: "Rahul Verma",
    class: "9-A",
    age: 14,
    overallScore: 85,
    topTalents: [
      { area: "Musical Ability", score: 90, icon: Music, color: "pink" },
      { area: "Performance", score: 85, icon: Star, color: "yellow" },
      { area: "Creativity", score: 82, icon: Zap, color: "orange" }
    ],
    recentActivities: ["School Concert", "Drama Club", "Music Competition"],
    aiInsights: "Exceptional musical talent and performance skills. Recommended career paths: Music Performance, Sound Engineering, Entertainment.",
    growthTrend: "stable",
    lastAnalysis: "3 days ago"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    class: "11-A",
    age: 16,
    overallScore: 90,
    topTalents: [
      { area: "Social Leadership", score: 93, icon: Heart, color: "red" },
      { area: "Organization", score: 87, icon: Target, color: "blue" },
      { area: "Communication", score: 85, icon: Globe, color: "purple" }
    ],
    recentActivities: ["Student Council", "Community Service", "Event Management"],
    aiInsights: "Natural leadership qualities with strong social intelligence. Recommended career paths: Management, Social Work, Public Relations.",
    growthTrend: "up",
    lastAnalysis: "5 days ago"
  },
  {
    id: 5,
    name: "Vikram Singh",
    class: "9-B",
    age: 14,
    overallScore: 83,
    topTalents: [
      { area: "Technical Skills", score: 86, icon: Zap, color: "cyan" },
      { area: "Innovation", score: 82, icon: Brain, color: "blue" },
      { area: "Problem Solving", score: 80, icon: Target, color: "green" }
    ],
    recentActivities: ["Coding Club", "Robotics Workshop", "Science Exhibition"],
    aiInsights: "Strong technical aptitude and innovative thinking. Recommended career paths: Software Development, Engineering, Product Design.",
    growthTrend: "up",
    lastAnalysis: "1 day ago"
  },
  {
    id: 6,
    name: "Kavya Patel",
    class: "10-C",
    age: 15,
    overallScore: 87,
    topTalents: [
      { area: "Artistic Expression", score: 91, icon: Palette, color: "purple" },
      { area: "Creative Writing", score: 85, icon: BookOpen, color: "blue" },
      { area: "Visual Design", score: 83, icon: Eye, color: "green" }
    ],
    recentActivities: ["Art Exhibition", "Poetry Competition", "Design Workshop"],
    aiInsights: "Exceptional artistic abilities with strong creative expression. Recommended career paths: Fine Arts, Content Creation, Visual Design.",
    growthTrend: "stable",
    lastAnalysis: "4 days ago"
  }
]

export default function StudentsPage() {
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
              Student Intelligence Dashboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Student
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Talent Profiles
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive AI analysis of student work, activities, and performance to discover unique talents and potential career paths.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name or class..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <p className="text-sm text-gray-600">Total Students</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1,846</div>
                  <p className="text-sm text-gray-600">AI Analyses</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">87%</div>
                  <p className="text-sm text-gray-600">Avg. Talent Score</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">15</div>
                  <p className="text-sm text-gray-600">Talent Categories</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Students Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {studentsData.map((student) => (
              <motion.div key={student.id} variants={fadeIn}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription>{student.class} • Age {student.age}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{student.overallScore}</div>
                        <p className="text-xs text-gray-500">Overall Score</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Top Talents */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Top Talents</h4>
                      <div className="space-y-2">
                        {student.topTalents.map((talent, index) => {
                          const Icon = talent.icon
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Icon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{talent.area}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full bg-${talent.color}-500`}
                                    style={{ width: `${talent.score}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium text-gray-600">{talent.score}%</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">AI Insights</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{student.aiInsights}</p>
                    </div>

                    {/* Recent Activities */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Recent Activities</h4>
                      <div className="flex flex-wrap gap-1">
                        {student.recentActivities.map((activity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}