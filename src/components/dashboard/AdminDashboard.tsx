'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, UserCheck, BarChart3, Settings, TrendingUp, Activity } from 'lucide-react'
import { AdminDashboardProps } from '@/types/dashboard'
import { useResponsive } from '@/hooks/useResponsive'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

function AdminDashboardComponent({ activeTab, setActiveTab }: AdminDashboardProps) {
  const { isMobile, isTablet } = useResponsive()
  const renderOverview = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Admin Dashboard 🛡️</h2>
            <p className="text-gray-600 text-lg">Manage platform, users, and analytics</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-green-600 font-medium">↑ 12%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,245</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="h-8 w-8 text-green-600" />
              <span className="text-sm text-green-600 font-medium">↑ 8%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-gray-600">Total Teachers</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-green-600 font-medium">↑ 5%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">89%</div>
            <div className="text-sm text-gray-600">Platform Uptime</div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <span className="text-sm text-green-600 font-medium">↑ 23%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">3,456</div>
            <div className="text-sm text-gray-600">Uploads This Month</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Health */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { metric: 'API Response Time', value: '145ms', status: 'good' },
              { metric: 'Database Performance', value: '98%', status: 'good' },
              { metric: 'Server Load', value: '45%', status: 'good' },
              { metric: 'Storage Usage', value: '62%', status: 'warning' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.metric}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: 'New student registration', time: '5 minutes ago', icon: '👤' },
              { action: 'Teacher uploaded report', time: '12 minutes ago', icon: '📄' },
              { action: 'System backup completed', time: '1 hour ago', icon: '💾' },
              { action: 'New school joined', time: '2 hours ago', icon: '🏫' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
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
            <CardTitle className="text-xl font-semibold text-gray-900">Student Management</CardTitle>
            <CardDescription>Manage all students on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Student management interface coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderTeachers = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Teacher Management</CardTitle>
            <CardDescription>Manage all teachers on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Teacher management interface coming soon...</p>
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
            <CardTitle className="text-xl font-semibold text-gray-900">Platform Analytics</CardTitle>
            <CardDescription>Comprehensive platform analytics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <motion.div variants={fadeIn}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Platform Settings</CardTitle>
            <CardDescription>Configure platform settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Settings interface coming soon...</p>
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
      case 'teachers':
        return renderTeachers()
      case 'analytics':
        return renderAnalytics()
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return <div className="p-4 md:p-8">{renderContent()}</div>
}

export default memo(AdminDashboardComponent)

