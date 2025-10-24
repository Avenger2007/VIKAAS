// Client-side form validation utilities

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// File size validation (in MB)
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// File type validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

// Text field validation
export const validateTextField = (
  value: string,
  fieldName: string,
  minLength: number = 1,
  maxLength: number = 500
): ValidationError | null => {
  if (!value || value.trim().length === 0) {
    return { field: fieldName, message: `${fieldName} is required` }
  }
  if (value.length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${minLength} characters`
    }
  }
  if (value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} must not exceed ${maxLength} characters`
    }
  }
  return null
}

// Email field validation
export const validateEmailField = (email: string): ValidationError | null => {
  if (!email || email.trim().length === 0) {
    return { field: 'email', message: 'Email is required' }
  }
  if (!isValidEmail(email)) {
    return { field: 'email', message: 'Please enter a valid email address' }
  }
  return null
}

// File upload validation
export const validateFileUpload = (
  file: File | null,
  maxSizeMB: number = 10,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']
): ValidationError | null => {
  if (!file) {
    return { field: 'file', message: 'Please select a file to upload' }
  }
  if (!isValidFileSize(file, maxSizeMB)) {
    return {
      field: 'file',
      message: `File size must not exceed ${maxSizeMB}MB`
    }
  }
  if (!isValidFileType(file, allowedTypes)) {
    return {
      field: 'file',
      message: `File type not supported. Allowed types: ${allowedTypes.join(', ')}`
    }
  }
  return null
}

// Validate upload form
export const validateUploadForm = (
  title: string,
  description: string,
  file: File | null,
  type: string
): ValidationResult => {
  const errors: ValidationError[] = []

  // Validate title
  const titleError = validateTextField(title, 'Title', 3, 100)
  if (titleError) errors.push(titleError)

  // Validate description (optional but if provided, validate length)
  if (description && description.trim().length > 0) {
    const descError = validateTextField(description, 'Description', 10, 500)
    if (descError) errors.push(descError)
  }

  // Validate file
  const fileError = validateFileUpload(file)
  if (fileError) errors.push(fileError)

  // Validate type
  if (!type || type.trim().length === 0) {
    errors.push({ field: 'type', message: 'Please select an upload type' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate observation form
export const validateObservationForm = (
  content: string,
  type: string
): ValidationResult => {
  const errors: ValidationError[] = []

  // Validate content
  const contentError = validateTextField(content, 'Observation', 10, 1000)
  if (contentError) errors.push(contentError)

  // Validate type
  if (!type || type.trim().length === 0) {
    errors.push({ field: 'type', message: 'Please select an observation type' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Get error message for a specific field
export const getFieldError = (errors: ValidationError[], fieldName: string): string | null => {
  const error = errors.find((e) => e.field === fieldName)
  return error ? error.message : null
}

