import { useEffect, useCallback, useState } from 'react'
import React from 'react'

interface KeyboardNavigationOptions {
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: () => void
}

/**
 * Custom hook for handling keyboard navigation
 * Useful for accessible components that need keyboard support
 */
export const useKeyboardNavigation = (options: KeyboardNavigationOptions) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (options.onEscape) {
            event.preventDefault()
            options.onEscape()
          }
          break
        case 'Enter':
          if (options.onEnter) {
            event.preventDefault()
            options.onEnter()
          }
          break
        case 'ArrowUp':
          if (options.onArrowUp) {
            event.preventDefault()
            options.onArrowUp()
          }
          break
        case 'ArrowDown':
          if (options.onArrowDown) {
            event.preventDefault()
            options.onArrowDown()
          }
          break
        case 'ArrowLeft':
          if (options.onArrowLeft) {
            event.preventDefault()
            options.onArrowLeft()
          }
          break
        case 'ArrowRight':
          if (options.onArrowRight) {
            event.preventDefault()
            options.onArrowRight()
          }
          break
        case 'Tab':
          if (options.onTab) {
            event.preventDefault()
            options.onTab()
          }
          break
        default:
          break
      }
    },
    [options]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

/**
 * Hook for managing focus within a list of items
 * Supports arrow key navigation
 */
export const useFocusNavigation = (itemCount: number) => {
  const [focusedIndex, setFocusedIndex] = useState(0)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % itemCount)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setFocusedIndex((prev) => (prev - 1 + itemCount) % itemCount)
      }
    },
    [itemCount]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { focusedIndex, setFocusedIndex }
}

/**
 * Hook for managing modal/dialog keyboard interactions
 */
export const useModalKeyboard = (onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])
}

