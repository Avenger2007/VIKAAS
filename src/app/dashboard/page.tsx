'use client'

import { useState, useEffect, lazy, Suspense, useMemo, useCallback } from 'react'

// Components
import DashboardHeader from '@/components/dashboard/shared/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/shared/DashboardSidebar'
import MobileSidebar from '@/components/dashboard/shared/MobileSidebar'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'

// Types and utilities
import { UserRole } from '@/types/dashboard'
import { dashboardState } from '@/lib/storage'
import { useResponsive } from '@/hooks/useResponsive'

// Lazy-loaded dashboard components for code splitting
const StudentDashboard = lazy(() => import('@/components/dashboard/StudentDashboard'))
const TeacherDashboard = lazy(() => import('@/components/dashboard/TeacherDashboard'))
const ParentDashboard = lazy(() => import('@/components/dashboard/ParentDashboard'))
const AdminDashboard = lazy(() => import('@/components/dashboard/AdminDashboard'))

/**
 * Get the page title based on the active role and tab
 * @param role - The current user role
 * @param tab - The active tab identifier
 * @returns The display title for the current view
 */
const getTitleForTab = (role: UserRole, tab: string): string => {
  const titles: Record<UserRole, Record<string, string>> = {
    student: {
      overview: 'Dashboard',
      profile: 'My Profile',
      upload: 'Upload Work',
      analysis: 'Talent Analysis',
      career: 'Career Explorer',
      resources: 'Learning Resources'
    },
    teacher: {
      overview: 'Dashboard',
      students: 'My Students',
      observations: 'Observations',
      analytics: 'Class Analytics',
      reports: 'Reports'
    },
    parent: {
      overview: 'Dashboard',
      profile: "Child's Profile",
      progress: 'Progress',
      achievements: 'Achievements',
      messages: 'Messages'
    },
    admin: {
      overview: 'Dashboard',
      students: 'Students',
      teachers: 'Teachers',
      analytics: 'Analytics',
      settings: 'Settings'
    }
  }
  return titles[role]?.[tab] || 'Dashboard'
}

/**
 * Dashboard Page Component
 * Main entry point for the unified dashboard system with role-based content
 * Handles role switching, tab navigation, and state persistence
 */
export default function DashboardPage() {
  const { isMobile } = useResponsive()
  const [activeRole, setActiveRole] = useState<UserRole>('student')
  const [activeTab, setActiveTab] = useState('overview')
  const [isMounted, setIsMounted] = useState(false)

  /**
   * Initialize dashboard state from localStorage on component mount
   * Restores user's previous role and tab selection
   */
  useEffect(() => {
    setIsMounted(true)
    const saved = dashboardState.get()

    const savedRole = saved?.activeRole
    const savedTab = saved?.activeTab

    if (savedRole && ['student', 'teacher', 'parent', 'admin'].includes(savedRole)) {
      setActiveRole(savedRole)
    }
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  /**
   * Persist dashboard state changes to localStorage
   * Ensures user preferences are maintained across sessions
   */
  useEffect(() => {
    if (isMounted) {
      dashboardState.update({ activeRole, activeTab })
    }
  }, [activeRole, activeTab, isMounted])

  /**
   * Memoized dashboard content based on active role
   * Prevents unnecessary re-renders of dashboard components
   */
  const dashboardContent = useMemo(() => {
    const props = { activeTab, setActiveTab }

    switch (activeRole) {
      case 'student':
        return <StudentDashboard {...props} />
      case 'teacher':
        return <TeacherDashboard {...props} />
      case 'parent':
        return <ParentDashboard {...props} />
      case 'admin':
        return <AdminDashboard {...props} />
      default:
        return <StudentDashboard {...props} />
    }
  }, [activeRole, activeTab])

  /**
   * Handle role changes with stable function reference
   * Resets active tab to overview when switching roles
   */
  const handleRoleChange = useCallback((role: UserRole) => {
    setActiveRole(role)
    setActiveTab('overview')
  }, [])

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <DashboardSidebar
            activeRole={activeRole}
            setActiveRole={handleRoleChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <MobileSidebar
            activeRole={activeRole}
            setActiveRole={handleRoleChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            activeRole={activeRole}
            title={getTitleForTab(activeRole, activeTab)}
          />

          {/* Content Area with Suspense for lazy-loaded components */}
          <main
            className="flex-1 overflow-y-auto bg-gray-100"
            role="main"
            aria-label={`${getTitleForTab(activeRole, activeTab)} content`}
          >
            <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Loading dashboard..." />}>
              {dashboardContent}
            </Suspense>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
