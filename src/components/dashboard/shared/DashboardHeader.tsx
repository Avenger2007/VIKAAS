'use client'

import { motion } from 'framer-motion'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/types/dashboard'

interface DashboardHeaderProps {
  activeRole: UserRole
  title: string
}

export default function DashboardHeader({ activeRole, title }: DashboardHeaderProps) {
  const getUserInitial = () => {
    switch (activeRole) {
      case 'student':
        return 'A'
      case 'teacher':
        return 'K'
      case 'parent':
        return 'K'
      case 'admin':
        return 'A'
      default:
        return 'U'
    }
  }

  const getUserName = () => {
    switch (activeRole) {
      case 'student':
        return 'Aarav Kumar'
      case 'teacher':
        return 'Mrs. Kavitha'
      case 'parent':
        return 'Mr. Kumar'
      case 'admin':
        return 'Admin'
      default:
        return 'User'
    }
  }

  const getUserRole = () => {
    switch (activeRole) {
      case 'student':
        return 'Class 10'
      case 'teacher':
        return 'Mathematics'
      case 'parent':
        return 'Parent'
      case 'admin':
        return 'Administrator'
      default:
        return 'User'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <label htmlFor="dashboard-search" className="sr-only">
              Search dashboard
            </label>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="dashboard-search"
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Search dashboard content"
            />
          </div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="View notifications (1 unread)"
            title="Notifications"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
            </motion.div>
            <motion.span
              className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              aria-label="Unread notification indicator"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            ></motion.span>
          </motion.button>

          {/* User Profile */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              role="img"
              aria-label={`${getUserName()} profile avatar`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-semibold text-sm">{getUserInitial()}</span>
            </motion.div>
            <div className="text-sm hidden sm:block">
              <p className="font-semibold text-gray-900">{getUserName()}</p>
              <p className="text-gray-500 text-xs">{getUserRole()}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

