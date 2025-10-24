'use client'

import React, { ReactNode, ReactElement } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /** Child components to wrap with error boundary */
  children: ReactNode
  /** Optional custom fallback UI when error occurs */
  fallback?: (error: Error, reset: () => void) => ReactElement
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean
  /** The caught error object */
  error: Error | null
}

/**
 * ErrorBoundary Component
 * Catches React errors in child components and displays a user-friendly error UI
 * Prevents white screen of death and provides recovery options
 *
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * @example
 * // With custom fallback
 * <ErrorBoundary fallback={(error, reset) => (
 *   <div>
 *     <p>Error: {error.message}</p>
 *     <button onClick={reset}>Retry</button>
 *   </div>
 * )}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * Log error details for debugging
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log errors in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  /**
   * Reset error state to allow retry
   */
  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  /**
   * Render error UI or children
   */
  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      return (
        <motion.div
          className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <details className="mb-6 text-left bg-gray-50 p-4 rounded border border-gray-200">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                Error details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            </details>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={this.resetError}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                aria-label="Try again"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

