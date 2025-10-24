/**
 * LoadingSpinner Component Tests
 * Tests for the loading spinner component with different sizes and states
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('displays label when provided', () => {
    const label = 'Loading data...'
    render(<LoadingSpinner label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByRole('status').querySelector('div > div')
    expect(spinner).toHaveClass('w-6', 'h-6')

    rerender(<LoadingSpinner size="md" />)
    spinner = screen.getByRole('status').querySelector('div > div')
    expect(spinner).toHaveClass('w-12', 'h-12')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByRole('status').querySelector('div > div')
    expect(spinner).toHaveClass('w-16', 'h-16')
  })

  it('applies fullScreen class when fullScreen prop is true', () => {
    render(<LoadingSpinner fullScreen />)
    const container = screen.getByRole('status')
    expect(container).toHaveClass('fixed', 'inset-0')
  })

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner label="Processing..." />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-live', 'polite')
    expect(spinner).toHaveAttribute('aria-label', 'Processing...')
  })

  it('hides spinner icon from screen readers', () => {
    render(<LoadingSpinner />)
    const spinnerIcon = screen.getByRole('status').querySelector('[aria-hidden="true"]')
    expect(spinnerIcon).toBeInTheDocument()
  })
})

