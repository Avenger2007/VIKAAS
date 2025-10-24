'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { validateObservationForm, ValidationError } from '@/lib/validation'

interface ObservationFormProps {
  studentName?: string
  onSubmitComplete?: (observation: string) => void
}

export default function ObservationForm({ studentName = 'Student', onSubmitComplete }: ObservationFormProps) {
  const [content, setContent] = useState('')
  const [type, setType] = useState('')
  const [tags, setTags] = useState('')
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const observationTypes = ['Academic', 'Behavioral', 'Social', 'Creative', 'Physical']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const validation = validateObservationForm(content, type)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors([])
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setSubmitSuccess(true)
      setContent('')
      setType('')
      setTags('')
      onSubmitComplete?.(content)

      // Reset success message
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      setErrors([{ field: 'submit', message: 'Failed to save observation. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (fieldName: string) => {
    return errors.find((e) => e.field === fieldName)?.message
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Observation</h2>
          <p className="text-gray-600 mb-6">
            Record your observations about {studentName}'s performance and behavior.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Type Field */}
            <div>
              <label htmlFor="obs-type" className="block text-sm font-medium text-gray-700 mb-2">
                Observation Type <span className="text-red-500" aria-label="required">*</span>
              </label>
              <select
                id="obs-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  getFieldError('type') ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!getFieldError('type')}
                aria-describedby={getFieldError('type') ? 'type-error' : undefined}
              >
                <option value="">Select a type...</option>
                {observationTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {getFieldError('type') && (
                <p id="type-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {getFieldError('type')}
                </p>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="obs-content" className="block text-sm font-medium text-gray-700 mb-2">
                Observation <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="obs-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your observation in detail..."
                rows={6}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                  getFieldError('Observation') ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!getFieldError('Observation')}
                aria-describedby={getFieldError('Observation') ? 'content-error' : undefined}
              />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">Minimum 10 characters required</p>
                <p className="text-xs text-gray-500">{content.length}/1000</p>
              </div>
              {getFieldError('Observation') && (
                <p id="content-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {getFieldError('Observation')}
                </p>
              )}
            </div>

            {/* Tags Field */}
            <div>
              <label htmlFor="obs-tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags <span className="text-gray-500 text-xs">(optional, comma-separated)</span>
              </label>
              <input
                id="obs-tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., leadership, teamwork, creativity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                role="alert"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-green-900">Observation saved!</p>
                  <p className="text-sm text-green-700">The observation has been recorded and analyzed.</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                  Save Observation
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

