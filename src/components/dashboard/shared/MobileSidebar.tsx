'use client'

import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RoleSelector from './RoleSelector'
import { UserRole } from '@/types/dashboard'
import { getNavigationItems, getWelcomeMessage } from './DashboardSidebar'
import type { NavigationItem } from '@/types/dashboard'

interface MobileSidebarProps {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

function MobileSidebarComponent({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navigationItems = getNavigationItems(activeRole)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setIsOpen(false) // Close menu after selection
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen w-72 bg-gray-50 border-r border-gray-200 z-40 md:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <span className="text-xl font-bold text-gray-900">VIKAAS</span>
              </div>

              {/* Role Selector */}
              <RoleSelector activeRole={activeRole} setActiveRole={setActiveRole} />

              {/* Welcome Message */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Welcome back,</p>
                <p className="text-lg font-semibold text-gray-900">{getWelcomeMessage(activeRole)}</p>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map(({ icon: Icon, label, tab }) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={activeTab === tab ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(MobileSidebarComponent)

