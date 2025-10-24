'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, TrendingUp, Award, BarChart3 } from 'lucide-react'
import { TeacherDashboardProps } from '@/types/dashboard'
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

function TeacherDashboardComponent({ activeTab, setActiveTab }: TeacherDashboardProps) {
  const { isMobile, isTablet } = useResponsive()
  const renderOverview = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome back, Mrs. Kavitha! 👩‍🏫</h2>
            <p className="text-gray-600 text-lg">Manage your class and track student progress</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-green-600 font-medium">Class 10A</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">32</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-gray-600">Observations</div>
            <div className="text-xs text-gray-500">This month</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">89%</div>
            <div className="text-sm text-gray-600">Class Progress</div>
            <div className="text-xs text-gray-500">Above average</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">Top Talents</div>
            <div className="text-xs text-gray-500">Identified this week</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Observations</CardTitle>
            <CardDescription>Your latest student observations</CardDescription>
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
            <Button className="w-full" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Add New Observation
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Class Performance</CardTitle>
            <CardDescription>Overall class metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics', avg: 87, trend: 'up' },
                { subject: 'Science', avg: 82, trend: 'stable' },
                { subject: 'English', avg: 79, trend: 'up' },
                { subject: 'Social Studies', avg: 85, trend: 'down' }
              ].map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">
                        {subject.subject.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{subject.subject}</p>
                      <p className="text-sm text-gray-500">Class Average</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{subject.avg}%</span>
                    {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {subject.trend === 'stable' && (
                      <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    )}
                    {subject.trend === 'down' && (
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">My Students</CardTitle>
            <CardDescription>Manage and track your students</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Student management interface coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderObservations = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Observations</CardTitle>
            <CardDescription>Record and manage student observations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Observations interface coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Class Analytics</CardTitle>
            <CardDescription>Detailed class performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Reports</CardTitle>
            <CardDescription>Generate and view student reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Reports interface coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'students':
        return renderStudents()
      case 'observations':
        return renderObservations()
      case 'analytics':
        return renderAnalytics()
      case 'reports':
        return renderReports()
      default:
        return renderOverview()
    }
  }

  return <div className="p-4 md:p-8">{renderContent()}</div>
}

export default memo(TeacherDashboardComponent)

