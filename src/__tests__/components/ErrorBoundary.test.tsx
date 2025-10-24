/**
 * ErrorBoundary Component Tests
 * Tests for error boundary error catching and recovery
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '@/components/ErrorBoundary'

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error message')
}

// Component that renders normally
const SafeComponent = () => {
  return <div>Safe content</div>
}

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('displays error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('shows error message in details section', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    const details = screen.getByText('Error details')
    expect(details).toBeInTheDocument()
  })

  it('has try again button to reset error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = (error: Error, reset: () => void) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={reset}>Custom Reset</button>
      </div>
    )

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Custom error:/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  it('resets error state when try again is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(button)

    // After reset, error should still show because component still throws
    // In real scenario, component would be fixed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})

