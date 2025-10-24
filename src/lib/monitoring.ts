/**
 * Performance Monitoring & Analytics
 * Provides utilities for tracking performance metrics, errors, and user interactions
 */

interface PerformanceMetric {
  name: string
  duration: number
  timestamp: number
  metadata?: Record<string, any>
}

interface ErrorLog {
  message: string
  stack?: string
  timestamp: number
  context?: Record<string, any>
}

interface AnalyticsEvent {
  name: string
  timestamp: number
  properties?: Record<string, any>
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private errors: ErrorLog[] = []
  private events: AnalyticsEvent[] = []
  private maxMetrics = 100
  private maxErrors = 50
  private maxEvents = 200

  /**
   * Record a performance metric
   */
  recordMetric(name: string, duration: number, metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata
    }

    this.metrics.push(metric)
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift()
    }

    // Warn about slow operations in development
    if (process.env.NODE_ENV === 'development' && duration > 1000) {
      console.warn(`Slow operation detected: ${name} took ${duration}ms`)
    }
  }

  /**
   * Record an error
   */
  recordError(message: string, stack?: string, context?: Record<string, any>) {
    const error: ErrorLog = {
      message,
      stack,
      timestamp: Date.now(),
      context
    }

    this.errors.push(error)
    if (this.errors.length > this.maxErrors) {
      this.errors.shift()
    }

    // Log errors in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error recorded: ${message}`, { stack, context })
    }
  }

  /**
   * Track an analytics event
   */
  trackEvent(name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      timestamp: Date.now(),
      properties
    }

    this.events.push(event)
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }
  }

  /**
   * Get average metric duration
   */
  getAverageMetricDuration(name: string): number {
    const matching = this.metrics.filter((m) => m.name === name)
    if (matching.length === 0) return 0
    const total = matching.reduce((sum, m) => sum + m.duration, 0)
    return total / matching.length
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  /**
   * Get all errors
   */
  getErrors(): ErrorLog[] {
    return [...this.errors]
  }

  /**
   * Get all events
   */
  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  /**
   * Clear all data
   */
  clear() {
    this.metrics = []
    this.errors = []
    this.events = []
  }

  /**
   * Get performance summary
   */
  getSummary() {
    return {
      totalMetrics: this.metrics.length,
      totalErrors: this.errors.length,
      totalEvents: this.events.length,
      avgMetricDuration: this.metrics.length > 0
        ? this.metrics.reduce((sum, m) => sum + m.duration, 0) / this.metrics.length
        : 0,
      slowOperations: this.metrics.filter((m) => m.duration > 1000).length
    }
  }
}

// Global monitor instance
export const monitor = new PerformanceMonitor()

/**
 * Measure function execution time
 */
export function measureExecution<T>(
  name: string,
  fn: () => T,
  metadata?: Record<string, any>
): T {
  const start = performance.now()
  try {
    const result = fn()
    const duration = performance.now() - start
    monitor.recordMetric(name, duration, metadata)
    return result
  } catch (error) {
    const duration = performance.now() - start
    monitor.recordMetric(name, duration, { ...metadata, error: true })
    throw error
  }
}

/**
 * Measure async function execution time
 */
export async function measureAsyncExecution<T>(
  name: string,
  fn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> {
  const start = performance.now()
  try {
    const result = await fn()
    const duration = performance.now() - start
    monitor.recordMetric(name, duration, metadata)
    return result
  } catch (error) {
    const duration = performance.now() - start
    monitor.recordMetric(name, duration, { ...metadata, error: true })
    throw error
  }
}

/**
 * Report Core Web Vitals
 */
export function reportWebVitals(metric: any) {
  const { name, value, rating } = metric
  monitor.trackEvent('web_vital', { name, value, rating })
}

/**
 * Get performance report
 */
export function getPerformanceReport() {
  return {
    summary: monitor.getSummary(),
    metrics: monitor.getMetrics(),
    errors: monitor.getErrors(),
    events: monitor.getEvents()
  }
}

