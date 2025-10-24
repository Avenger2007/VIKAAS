'use client'

import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, Settings, LogOut, Home, User, Upload, Brain, Target, BookOpen, Users, MessageSquare, BarChart3, FileText, UserCheck, Award, TrendingUp } from 'lucide-react'
import { UserRole, NavigationItem } from '@/types/dashboard'
import RoleSelector from './RoleSelector'

interface DashboardSidebarProps {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const getNavigationItems = (role: UserRole): NavigationItem[] => {
  switch (role) {
    case 'student':
      return [
        { icon: Home, label: 'Dashboard', tab: 'overview' },
        { icon: User, label: 'My Profile', tab: 'profile' },
        { icon: Upload, label: 'Upload Work', tab: 'upload' },
        { icon: Brain, label: 'Talent Analysis', tab: 'analysis' },
        { icon: Target, label: 'Career Explorer', tab: 'career' },
        { icon: BookOpen, label: 'Learning Resources', tab: 'resources' }
      ]
    case 'teacher':
      return [
        { icon: Home, label: 'Dashboard', tab: 'overview' },
        { icon: Users, label: 'My Students', tab: 'students' },
        { icon: MessageSquare, label: 'Observations', tab: 'observations' },
        { icon: BarChart3, label: 'Class Analytics', tab: 'analytics' },
        { icon: FileText, label: 'Reports', tab: 'reports' }
      ]
    case 'parent':
      return [
        { icon: Home, label: 'Dashboard', tab: 'overview' },
        { icon: User, label: "Child's Profile", tab: 'profile' },
        { icon: TrendingUp, label: 'Progress', tab: 'progress' },
        { icon: Award, label: 'Achievements', tab: 'achievements' },
        { icon: MessageSquare, label: 'Messages', tab: 'messages' }
      ]
    case 'admin':
      return [
        { icon: Home, label: 'Dashboard', tab: 'overview' },
        { icon: Users, label: 'Students', tab: 'students' },
        { icon: UserCheck, label: 'Teachers', tab: 'teachers' },
        { icon: BarChart3, label: 'Analytics', tab: 'analytics' },
        { icon: Settings, label: 'Settings', tab: 'settings' }
      ]
    default:
      return []
  }
}

export const getWelcomeMessage = (role?: UserRole): string => {
  switch (role) {
    case 'student':
      return 'Hi, Aarav! 👋'
    case 'teacher':
      return 'Mrs. Kavitha 👩‍🏫'
    case 'parent':
      return 'Mr. Kumar 👨‍👩‍👧‍👦'
    case 'admin':
      return 'Admin 🛡️'
    default:
      return 'Welcome! 👋'
  }
}

export default function DashboardSidebar({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab
}: DashboardSidebarProps) {
  const navigationItems = getNavigationItems(activeRole)
  const navRef = useRef<HTMLDivElement>(null)

  // Handle keyboard navigation within sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!navRef.current) return

      const buttons = navRef.current.querySelectorAll('button')
      const currentIndex = Array.from(buttons).findIndex((btn) => btn === document.activeElement)

      if (e.key === 'ArrowDown' && currentIndex < buttons.length - 1) {
        e.preventDefault()
        buttons[currentIndex + 1]?.focus()
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault()
        buttons[currentIndex - 1]?.focus()
      } else if (e.key === 'Home') {
        e.preventDefault()
        buttons[0]?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        buttons[buttons.length - 1]?.focus()
      }
    }

    navRef.current?.addEventListener('keydown', handleKeyDown)
    return () => navRef.current?.removeEventListener('keydown', handleKeyDown)
  }, [activeRole])

  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-bold text-gray-900">VIKAAS</span>
        </div>

        {/* Role Selector */}
        <RoleSelector activeRole={activeRole} setActiveRole={setActiveRole} />

        {/* Welcome Message */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Welcome back,</p>
          <p className="text-lg font-semibold text-gray-900">{getWelcomeMessage(activeRole)}</p>
        </div>

        {/* Navigation */}
        <nav
          className="space-y-1"
          ref={navRef}
          role="navigation"
          aria-label="Dashboard navigation"
        >
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === item.tab
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              aria-current={activeTab === item.tab ? 'page' : undefined}
              aria-label={`Navigate to ${item.label}`}
              title={item.label}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            </button>
          ))}
        </nav>
      </div>

      {/* Footer Actions */}
      <footer className="p-6 border-t border-gray-200">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Open settings"
            title="Settings"
          >
            <Settings className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
            <span>Settings</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Logout from dashboard"
            title="Logout"
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">Version 1.0</p>
        </div>
      </footer>
    </div>
  )
}

