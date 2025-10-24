# Testing Guide - VIKAAS Project

## Overview

The VIKAAS project includes a comprehensive testing infrastructure using Jest and React Testing Library. This guide explains how to write, run, and maintain tests.

## Setup

### Installation

Testing dependencies are already configured in `package.json`:

```bash
npm install
```

### Configuration Files

- **jest.config.js** - Jest configuration with Next.js support
- **jest.setup.js** - Test environment setup and global mocks
- **src/__tests__/setup.ts** - Testing utilities and helpers

## Running Tests

### Basic Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm run test LoadingSpinner

# Run tests matching a pattern
npm run test -- --testNamePattern="renders"
```

## Test Structure

### File Organization

```
src/
├── __tests__/
│   ├── setup.ts                    # Testing utilities
│   ├── components/
│   │   ├── LoadingSpinner.test.tsx # Component tests
│   │   └── ErrorBoundary.test.tsx
│   └── hooks/
│       └── useResponsive.test.ts
```

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Updated text')).toBeInTheDocument()
  })
})
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { useResponsive } from '@/hooks/useResponsive'

describe('useResponsive', () => {
  it('returns correct breakpoint', () => {
    const { result } = renderHook(() => useResponsive())
    expect(result.current.isMobile).toBeDefined()
  })
})
```

### Testing Async Operations

```typescript
import { render, screen, waitFor } from '@testing-library/react'

describe('AsyncComponent', () => {
  it('loads data', async () => {
    render(<AsyncComponent />)
    
    await waitFor(() => {
      expect(screen.getByText('Loaded data')).toBeInTheDocument()
    })
  })
})
```

## Testing Utilities

### Mock Helpers

```typescript
import {
  mockLocalStorage,
  mockMatchMedia,
  mockIntersectionObserver,
  mockApiResponse,
  mockApiError
} from '@/__tests__/setup'

// Mock localStorage
const storage = mockLocalStorage()
storage.setItem('key', 'value')

// Mock responsive design
mockMatchMedia(true) // Matches media query

// Mock lazy loading
mockIntersectionObserver()

// Mock API calls
const data = await mockApiResponse({ id: 1 }, 100)
```

### Test Data Generators

```typescript
import { testDataGenerators } from '@/__tests__/setup'

const user = testDataGenerators.user({ name: 'John' })
const dashboard = testDataGenerators.dashboard({ activeRole: 'teacher' })
```

## Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ✅ Good - Tests user behavior
it('displays error message when upload fails', () => {
  render(<UploadForm />)
  fireEvent.click(screen.getByRole('button', { name: /upload/i }))
  expect(screen.getByText(/error/i)).toBeInTheDocument()
})

// ❌ Bad - Tests implementation details
it('calls handleUpload function', () => {
  const handleUpload = jest.fn()
  render(<UploadForm onUpload={handleUpload} />)
  expect(handleUpload).toHaveBeenCalled()
})
```

### 2. Use Semantic Queries

```typescript
// ✅ Good - Semantic queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByPlaceholderText('Enter name')

// ❌ Bad - Implementation queries
screen.getByTestId('submit-btn')
screen.getByClassName('email-input')
```

### 3. Test Accessibility

```typescript
it('has proper accessibility attributes', () => {
  render(<LoadingSpinner label="Loading..." />)
  const spinner = screen.getByRole('status')
  expect(spinner).toHaveAttribute('aria-live', 'polite')
  expect(spinner).toHaveAttribute('aria-label', 'Loading...')
})
```

### 4. Keep Tests Focused

```typescript
// ✅ Good - One assertion per test
it('renders loading spinner', () => {
  render(<LoadingSpinner />)
  expect(screen.getByRole('status')).toBeInTheDocument()
})

// ❌ Bad - Multiple unrelated assertions
it('renders and handles everything', () => {
  render(<LoadingSpinner />)
  expect(screen.getByRole('status')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Clicked')).toBeInTheDocument()
})
```

## Coverage Goals

Target coverage thresholds:

- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

View coverage report:

```bash
npm run test:coverage
```

## Common Testing Scenarios

### Testing Error Boundaries

```typescript
const ThrowError = () => {
  throw new Error('Test error')
}

it('catches errors', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )
  expect(screen.getByText('Something went wrong')).toBeInTheDocument()
})
```

### Testing Form Validation

```typescript
it('validates form input', async () => {
  render(<UploadForm />)
  const input = screen.getByLabelText('File')
  
  fireEvent.change(input, { target: { value: '' } })
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  await waitFor(() => {
    expect(screen.getByText('File is required')).toBeInTheDocument()
  })
})
```

### Testing Responsive Behavior

```typescript
it('renders mobile layout on small screens', () => {
  mockMatchMedia(true) // Simulate mobile
  render(<Dashboard />)
  expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
})
```

## Debugging Tests

### Print DOM

```typescript
import { render, screen } from '@testing-library/react'

it('debug test', () => {
  const { debug } = render(<MyComponent />)
  debug() // Prints DOM to console
})
```

### Use screen.logTestingPlaygroundURL()

```typescript
it('debug with playground', () => {
  render(<MyComponent />)
  screen.logTestingPlaygroundURL() // Generates Testing Playground URL
})
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)

## Contributing Tests

When adding new features:

1. Write tests first (TDD approach recommended)
2. Ensure tests pass: `npm run test`
3. Check coverage: `npm run test:coverage`
4. Update this guide if adding new testing patterns
5. Include tests in pull requests

## Troubleshooting

### Tests Failing

1. Check error message carefully
2. Use `debug()` to inspect DOM
3. Verify mocks are set up correctly
4. Check for async issues with `waitFor()`

### Coverage Not Improving

1. Identify untested files: `npm run test:coverage`
2. Write tests for critical paths first
3. Focus on behavior, not line coverage
4. Use `--collectCoverageFrom` to target specific files

---

For more information, see the main README.md or contact the development team.

