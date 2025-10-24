/**
 * Test Setup & Configuration
 * Provides utilities and helpers for testing React components
 */

import React from 'react'

/**
 * Mock localStorage for testing
 */
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((key) => {
        delete store[key]
      })
    }
  }
}

/**
 * Mock window.matchMedia for responsive tests
 */
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
}

/**
 * Mock IntersectionObserver for lazy loading tests
 */
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  } as any
}

/**
 * Create mock props for components
 */
export const createMockProps = <T extends Record<string, any>>(
  overrides?: Partial<T>
): T => {
  return {
    ...overrides
  } as T
}

/**
 * Wait for async operations in tests
 */
export const waitFor = (callback: () => void, timeout = 1000) => {
  return new Promise((resolve) => {
    const start = Date.now()
    const check = () => {
      try {
        callback()
        resolve(true)
      } catch (error) {
        if (Date.now() - start > timeout) {
          throw error
        }
        setTimeout(check, 50)
      }
    }
    check()
  })
}

/**
 * Render component with providers
 */
export const renderWithProviders = (component: React.ReactElement) => {
  // This would wrap with providers like Redux, Theme, etc.
  return component
}

/**
 * Mock API responses
 */
export const mockApiResponse = <T>(data: T, delay = 0) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

/**
 * Mock API error
 */
export const mockApiError = (message: string, delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}

/**
 * Test data generators
 */
export const testDataGenerators = {
  user: (overrides?: any) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    ...overrides
  }),

  dashboard: (overrides?: any) => ({
    activeRole: 'student',
    activeTab: 'overview',
    ...overrides
  }),

  component: (overrides?: any) => ({
    className: 'test-class',
    'data-testid': 'test-component',
    ...overrides
  })
}

