'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/types/dashboard'

interface RoleSelectorProps {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
}

const roles: Array<{ role: UserRole; label: string; color: string; emoji: string; description: string }> = [
  { role: 'student', label: 'Student', color: 'blue', emoji: '👨‍🎓', description: 'View as student' },
  { role: 'teacher', label: 'Teacher', color: 'green', emoji: '👩‍🏫', description: 'View as teacher' },
  { role: 'parent', label: 'Parent', color: 'purple', emoji: '👨‍👩‍👧‍👦', description: 'View as parent' },
  { role: 'admin', label: 'Admin', color: 'orange', emoji: '🛡️', description: 'View as admin' }
]

const colorMap: Record<string, { bg: string; hover: string; text: string }> = {
  blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-white' },
  green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-white' },
  purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-white' },
  orange: { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-white' }
}

export default function RoleSelector({ activeRole, setActiveRole }: RoleSelectorProps) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-3 font-medium">Switch Role:</p>
      <div className="grid grid-cols-2 gap-2">
        {roles.map(({ role, label, color, emoji, description }) => {
          const isActive = activeRole === role
          const colorClass = colorMap[color]

          return (
            <motion.div
              key={role}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => setActiveRole(role)}
                className={`w-full text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${
                  isActive
                    ? `${colorClass.bg} ${colorClass.hover} ${colorClass.text} shadow-md`
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-pressed={isActive}
                aria-label={`${description} (${label})`}
                title={description}
              >
                <span className="mr-1" aria-hidden="true">
                  {emoji}
                </span>
                {label}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

