'use client'

import { motion } from 'framer-motion'

/**
 * Props for the LoadingSpinner component
 */
interface LoadingSpinnerProps {
  /** Size of the spinner: 'sm' (24px), 'md' (48px), or 'lg' (64px) */
  size?: 'sm' | 'md' | 'lg'
  /** Optional label text displayed below the spinner */
  label?: string
  /** If true, spinner takes full screen with backdrop */
  fullScreen?: boolean
}

/**
 * LoadingSpinner Component
 * Animated loading indicator with multiple sizes and optional full-screen mode
 * Includes proper accessibility attributes for screen readers
 *
 * @example
 * // Basic usage
 * <LoadingSpinner size="md" label="Loading..." />
 *
 * @example
 * // Full screen loading
 * <LoadingSpinner fullScreen size="lg" label="Processing..." />
 */
export default function LoadingSpinner({
  size = 'md',
  label = 'Loading...',
  fullScreen = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center'

  return (
    <div className={containerClass} role="status" aria-live="polite" aria-label={label}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full`}
          variants={spinnerVariants}
          animate="animate"
          aria-hidden="true"
        />
        {label && <p className="text-gray-600 font-medium">{label}</p>}
      </div>
    </div>
  )
}

