import { useState, useEffect } from 'react'

// Tailwind breakpoints
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

type Breakpoint = keyof typeof breakpoints

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  currentBreakpoint: Breakpoint
  width: number
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    currentBreakpoint: 'xs',
    width: 0
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      let currentBreakpoint: Breakpoint = 'xs'
      if (width >= breakpoints['2xl']) currentBreakpoint = '2xl'
      else if (width >= breakpoints.xl) currentBreakpoint = 'xl'
      else if (width >= breakpoints.lg) currentBreakpoint = 'lg'
      else if (width >= breakpoints.md) currentBreakpoint = 'md'
      else if (width >= breakpoints.sm) currentBreakpoint = 'sm'

      setState({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
        isLargeDesktop: width >= breakpoints.xl,
        currentBreakpoint,
        width
      })
    }

    // Set initial state
    handleResize()

    // Add event listener with debounce
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return state
}

// Hook to check if a specific breakpoint is active
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const { currentBreakpoint } = useResponsive()
  return breakpoints[currentBreakpoint] >= breakpoints[breakpoint]
}

// Hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Hook to detect if user prefers dark mode
export function useDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

// Hook to detect if user prefers reduced motion
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

// Hook to detect touch device
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        () =>
          window.matchMedia('(hover: none)').matches ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
      )
    }

    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  return isTouch
}

