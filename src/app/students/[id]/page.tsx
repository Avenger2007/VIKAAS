'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Download,
  Share,
  TrendingUp,
  Brain,
  Palette,
  Calculator,
  Music,
  Heart,
  Globe,
  Award,
  Target,
  BookOpen,
  Star,
  Eye,
  Calendar,
  User,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Zap,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Mock comprehensive student data
const studentReport = {
  id: 1,
  name: "Aarav Kumar",
  class: "10-A",
  age: 15,
  admissionNo: "STU2024001",
  overallScore: 92,
  lastAnalysis: "2024-11-15",
  analysisPeriod: "Oct 2024 - Nov 2024",
  
  // Talent breakdown
  talents: [
    { 
      area: "Creative Design", 
      score: 95, 
      icon: Palette, 
      color: "purple",
      description: "Exceptional visual-spatial intelligence and design thinking",
      evidence: ["Science Project Poster Design", "Art Competition Winner", "Classroom Visual Aids"],
      careerMatches: ["Architecture", "Graphic Design", "UX/UI Design", "Interior Design"]
    },
    { 
      area: "Problem Solving", 
      score: 88, 
      icon: Brain, 
      color: "blue",
      description: "Strong analytical thinking and logical reasoning abilities",
      evidence: ["Math Olympiad Participation", "Science Fair Project", "Coding Challenge"],
      careerMatches: ["Software Engineering", "Data Science", "Research", "Consulting"]
    },
    { 
      area: "Leadership", 
      score: 85, 
      icon: Award, 
      color: "orange",
      description: "Natural leadership qualities with team coordination skills",
      evidence: ["Class Representative", "Group Project Leader", "Sports Team Captain"],
      careerMatches: ["Management", "Entrepreneurship", "Project Management", "Public Administration"]
    },
    { 
      area: "Communication", 
      score: 82, 
      icon: Globe, 
      color: "green",
      description: "Effective verbal and written communication skills",
      evidence: ["Debate Competition", "Essay Writing", "Presentation Skills"],
      careerMatches: ["Journalism", "Teaching", "Marketing", "Public Relations"]
    },
    { 
      area: "Technical Aptitude", 
      score: 78, 
      icon: Zap, 
      color: "cyan",
      description: "Good understanding of technical concepts and tools",
      evidence: ["Computer Projects", "Technical Presentations", "Workshop Participation"],
      careerMatches: ["Engineering", "IT Services", "Technical Support", "Product Development"]
    }
  ],

  // Growth trajectory
  growthData: [
    { month: "Jun", score: 75 },
    { month: "Jul", score: 78 },
    { month: "Aug", score: 82 },
    { month: "Sep", score: 85 },
    { month: "Oct", score: 88 },
    { month: "Nov", score: 92 }
  ],

  // Recent activities
  recentActivities: [
    {
      date: "2024-11-10",
      type: "Project",
      title: "Science Exhibition - Renewable Energy Model",
      description: "Designed and built a working model of solar energy system",
      aiScore: 94,
      skills: ["Design", "Research", "Presentation"]
    },
    {
      date: "2024-11-05",
      type: "Competition",
      title: "Inter-School Art Competition",
      description: "Won 1st prize in digital art category",
      aiScore: 96,
      skills: ["Creativity", "Technical Skills", "Visual Design"]
    },
    {
      date: "2024-10-28",
      type: "Academic",
      title: "Mathematics Olympiad",
      description: "Secured 3rd position in regional level",
      aiScore: 85,
      skills: ["Problem Solving", "Logical Thinking", "Accuracy"]
    }
  ],

  // AI recommendations
  aiRecommendations: {
    strengths: [
      "Exceptional creative thinking and visual design abilities",
      "Strong problem-solving skills with practical application",
      "Natural leadership qualities with team coordination",
      "Good communication and presentation skills"
    ],
    areasForImprovement: [
      "Advanced technical skills in digital tools",
      "Time management for complex projects",
      "Public speaking confidence",
      "Advanced mathematics concepts"
    ],
    recommendedActions: [
      "Enroll in advanced design workshops",
      "Participate in national level competitions",
      "Take on leadership roles in school projects",
      "Join coding or robotics clubs"
    ]
  },

  // NEP 2020 compliance
  nepCompliance: {
    cognitiveDevelopment: 90,
    emotionalDevelopment: 85,
    socialDevelopment: 88,
    creativeDevelopment: 95,
    physicalDevelopment: 78
  }
}

export default function StudentReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/students">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Students
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Intelligence Report</h1>
                <p className="text-gray-600">AI-Powered Holistic Assessment</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Info Header */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{studentReport.name}</h2>
                  <p className="text-blue-100">Class {studentReport.class} • Age {studentReport.age}</p>
                  <p className="text-blue-200 text-sm">Admission No: {studentReport.admissionNo}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{studentReport.overallScore}</div>
                <p className="text-blue-100">Overall Talent Score</p>
                <p className="text-blue-200 text-sm">Last Analysis: {studentReport.lastAnalysis}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Talent Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* Talent Scores */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Talent Breakdown
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of student's abilities across different domains
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {studentReport.talents.map((talent, index) => {
                    const Icon = talent.icon
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-${talent.color}-100 rounded-lg flex items-center justify-center`}>
                              <Icon className={`h-5 w-5 text-${talent.color}-600`} />
                            </div>
                            <div>
                              <h4 className="font-semibold">{talent.area}</h4>
                              <p className="text-sm text-gray-600">{talent.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{talent.score}</div>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        </div>
                        <Progress value={talent.score} className="h-2" />
                        
                        {/* Evidence */}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Evidence:</h5>
                          <div className="flex flex-wrap gap-1">
                            {talent.evidence.map((item, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Career Matches */}
                        <div className="bg-blue-50 rounded-lg p-3">
                          <h5 className="text-sm font-medium text-blue-700 mb-2">Career Matches:</h5>
                          <div className="flex flex-wrap gap-1">
                            {talent.careerMatches.map((career, idx) => (
                              <Badge key={idx} className="text-xs bg-blue-100 text-blue-800">
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities & AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Latest student work and AI-powered insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentReport.recentActivities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{activity.type}</Badge>
                          <h4 className="font-semibold">{activity.title}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{activity.date}</span>
                          <div className="flex items-center space-x-1">
                            <Brain className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">{activity.aiScore}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {activity.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Insights & Recommendations */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {studentReport.aiRecommendations.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h5>
                    <ul className="space-y-1">
                      {studentReport.aiRecommendations.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">Recommended Actions</h5>
                    <ul className="space-y-1">
                      {studentReport.aiRecommendations.recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* NEP 2020 Compliance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    NEP 2020 Compliance
                  </CardTitle>
                  <CardDescription>
                    Holistic development assessment as per NEP 2020
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(studentReport.nepCompliance).map(([area, score]) => (
                    <div key={area} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium capitalize">
                          {area.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-bold">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Growth Trajectory */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Trajectory
                  </CardTitle>
                  <CardDescription>
                    Progress over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">Growth chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}