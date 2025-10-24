'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, TrendingUp, Brain, Award, MessageSquare } from 'lucide-react'
import { ParentDashboardProps } from '@/types/dashboard'
import { useResponsive } from '@/hooks/useResponsive'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const teacherObservations = [
  {
    teacher: 'Mrs. Kavitha',
    subject: 'Math',
    observation: 'Aarav consistently demonstrates exceptional spatial reasoning in geometry problems.',
    tags: ['Analytical', 'Mathematics'],
    time: '2 days ago'
  },
  {
    teacher: 'Mr. Rajesh',
    subject: 'Science',
    observation: 'Shows strong curiosity in physics experiments. Asks insightful "why" questions.',
    tags: ['Scientific Thinking', 'Curiosity'],
    time: '5 days ago'
  }
]

function ParentDashboardComponent({ activeTab, setActiveTab }: ParentDashboardProps) {
  const { isMobile } = useResponsive()
  const renderOverview = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Hello, Mr. Kumar! 👨‍👩‍👧‍👦</h2>
            <p className="text-gray-600 text-lg">Track your child's development and achievements</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <User className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Aarav</div>
            <div className="text-sm text-gray-600">Child's Name</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
            <div className="text-xs text-gray-500">Excellent</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-sm text-gray-600">Talent Areas</div>
            <div className="text-xs text-gray-500">Architecture, Design...</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-sm text-gray-600">Achievements</div>
            <div className="text-xs text-gray-500">This semester</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Achievements</CardTitle>
            <CardDescription>Latest accomplishments and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: 'Science Exhibition Winner',
                description: '1st place in inter-school competition',
                date: 'March 2024',
                icon: '🏆'
              },
              {
                title: 'Art Showcase',
                description: 'Selected for annual art exhibition',
                date: 'February 2024',
                icon: '🎨'
              },
              {
                title: 'Math Olympiad',
                description: 'Qualified for state level',
                date: 'January 2024',
                icon: '🧮'
              }
            ].map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                  <span className="text-xs text-gray-500">{achievement.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Teacher Feedback</CardTitle>
            <CardDescription>Latest observations from teachers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherObservations.map((obs, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{obs.teacher}</h4>
                    <p className="text-sm text-gray-600">
                      {obs.subject} • {obs.time}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{obs.observation}</p>
                <div className="flex flex-wrap gap-1">
                  {obs.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
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
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Child's Profile</CardTitle>
            <CardDescription>Detailed information about your child</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Child profile details coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Progress Tracking</CardTitle>
            <CardDescription>Monitor your child's development over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Progress tracking interface coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Achievements Gallery</CardTitle>
            <CardDescription>View all of your child's accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Achievements gallery coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Messages</CardTitle>
            <CardDescription>Communicate with teachers and school staff</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Messaging interface coming soon...</p>
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
      case 'progress':
        return renderProgress()
      case 'achievements':
        return renderAchievements()
      case 'messages':
        return renderMessages()
      default:
        return renderOverview()
    }
  }

  return <div className="p-4 md:p-8">{renderContent()}</div>
}

export default memo(ParentDashboardComponent)

