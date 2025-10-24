'use client'

import { useState, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, Brain, Target, Zap, ChevronRight, Star, Users } from 'lucide-react'
import { StudentDashboardProps } from '@/types/dashboard'
import UploadForm from './UploadForm'
import { useResponsive } from '@/hooks/useResponsive'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const recentUploads = [
  {
    id: 1,
    title: 'Architecture Sketch',
    type: 'Artwork',
    uploaded: '2 days ago',
    status: 'Analyzed',
    icon: '🖼️'
  },
  {
    id: 2,
    title: 'Science Project',
    type: 'Project',
    uploaded: '5 days ago',
    status: 'Analyzed',
    icon: '📊'
  },
  {
    id: 3,
    title: 'Environmental Essay',
    type: 'Essay',
    uploaded: '1 week ago',
    status: 'Analyzed',
    icon: '📝'
  }
]

const careerMatches = [
  {
    title: 'Architecture',
    match: 92,
    icon: '🏛️',
    skills: ['Spatial Reasoning', 'Visual Thinking', 'Attention to Detail'],
    color: 'green'
  },
  {
    title: 'Product Design',
    match: 89,
    icon: '🎨',
    skills: ['Creativity', 'Problem Solving', 'Technical Skills'],
    color: 'purple'
  },
  {
    title: 'Software Engineering',
    match: 85,
    icon: '💻',
    skills: ['Logical Thinking', 'Analytical Skills', 'Innovation'],
    color: 'blue'
  }
]

function StudentDashboardComponent({ activeTab, setActiveTab }: StudentDashboardProps) {
  const { isMobile, isTablet } = useResponsive()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const renderOverview = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Good Morning, Aarav! 👋</h2>
            <p className="text-gray-600 text-lg">Here's your learning journey overview</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards - responsive grid */}
      <motion.div
        variants={fadeIn}
        className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'
        }`}
      >
        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Upload className="h-8 w-8 text-blue-600" aria-hidden="true" />
                <span className="text-sm text-green-600 font-medium">↑ 4 this week</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">28</div>
              <div className="text-sm text-gray-600">Total Uploads</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className="h-8 w-8 text-purple-600" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
              <div className="text-sm text-gray-600">Talent Areas</div>
              <div className="text-xs text-gray-500">Architecture, Design...</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">Career Paths</div>
              <div className="text-xs text-gray-500">92% avg match</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="h-8 w-8 text-orange-600" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">14</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-xs text-gray-500">Keep it up! 🔥</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Your Recent Work</CardTitle>
              <CardDescription>Your latest uploads and their analysis</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                  {upload.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{upload.title}</h4>
                  <p className="text-sm text-gray-600">
                    {upload.type} • {upload.uploaded}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {upload.status}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload New Work
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Career Matches</CardTitle>
            <CardDescription>Based on your talent profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {careerMatches.map((career, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{career.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{career.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{career.match}% match</span>
                      <Progress value={career.match} className="flex-1 h-2" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
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
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">AK</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Aarav Kumar</h2>
              <p className="text-gray-600 mb-4">Class 10 - Section A</p>
              <p className="text-gray-600">Profile details coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderUpload = () => (
    <div className="space-y-6">
      <UploadForm
        onUploadComplete={(fileName) => {
          console.log(`File uploaded: ${fileName}`)
        }}
      />
    </div>
  )

  const renderAnalysis = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Talent Analysis Results</CardTitle>
            <CardDescription>AI-powered insights into your unique talents and abilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Talent analysis details coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderCareer = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Career Explorer</CardTitle>
            <CardDescription>Discover career paths aligned with your unique talents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Career explorer details coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderResources = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Learning Resources</CardTitle>
            <CardDescription>Curated resources to develop your talents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Learning resources coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'profile':
        return renderProfile()
      case 'upload':
        return renderUpload()
      case 'analysis':
        return renderAnalysis()
      case 'career':
        return renderCareer()
      case 'resources':
        return renderResources()
      default:
        return renderOverview()
    }
  }

  return <div className="p-4 md:p-8">{renderContent()}</div>
}

// Memoize to prevent unnecessary re-renders when parent updates
export default memo(StudentDashboardComponent)

