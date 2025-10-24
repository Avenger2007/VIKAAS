'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { validateUploadForm, ValidationError } from '@/lib/validation'

interface UploadFormProps {
  onUploadComplete?: (fileName: string) => void
}

export default function UploadForm({ onUploadComplete }: UploadFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadTypes = ['Artwork', 'Project', 'Essay', 'Presentation', 'Video', 'Document']

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
    // Clear file-related errors when a new file is selected
    setErrors((prev) => prev.filter((e) => e.field !== 'file'))
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-blue-50', 'border-blue-400')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-blue-50', 'border-blue-400')
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('bg-blue-50', 'border-blue-400')
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const validation = validateUploadForm(title, description, selectedFile, type)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors([])
    setIsLoading(true)

    // Simulate upload delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUploadSuccess(true)
      setTitle('')
      setDescription('')
      setType('')
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      onUploadComplete?.(selectedFile?.name || 'file')

      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error) {
      setErrors([{ field: 'submit', message: 'Upload failed. Please try again.' }])
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Work</h2>
          <p className="text-gray-600 mb-6">
            Share your creativity, projects, and achievements. AI will analyze and discover your hidden talents.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Title Field */}
            <div>
              <label htmlFor="upload-title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="upload-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My Architecture Sketch"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  getFieldError('Title') ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!getFieldError('Title')}
                aria-describedby={getFieldError('Title') ? 'title-error' : undefined}
              />
              {getFieldError('Title') && (
                <p id="title-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {getFieldError('Title')}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="upload-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <textarea
                id="upload-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your work..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                  getFieldError('Description') ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!getFieldError('Description')}
                aria-describedby={getFieldError('Description') ? 'description-error' : undefined}
              />
              {getFieldError('Description') && (
                <p id="description-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {getFieldError('Description')}
                </p>
              )}
            </div>

            {/* Type Field */}
            <div>
              <label htmlFor="upload-type" className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="text-red-500" aria-label="required">*</span>
              </label>
              <select
                id="upload-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  getFieldError('type') ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!getFieldError('type')}
                aria-describedby={getFieldError('type') ? 'type-error' : undefined}
              >
                <option value="">Select a type...</option>
                {uploadTypes.map((t) => (
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

            {/* File Upload */}
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                File <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-gray-50 transition-colors cursor-pointer hover:bg-blue-50"
                role="button"
                tabIndex={0}
                aria-label="Drag and drop file upload area"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click()
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                  aria-label="Select file to upload"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4,.mov"
                />
                <div className="text-5xl mb-3" aria-hidden="true">
                  📤
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {selectedFile ? selectedFile.name : 'Drag & drop your work'}
                </h3>
                <p className="text-gray-600 mb-4">or click to browse</p>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Choose File
                </Button>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Supported: JPG, PNG, PDF, DOC, MP4</p>
                  <p>Max size: 10 MB</p>
                </div>
              </div>
              {getFieldError('file') && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {getFieldError('file')}
                </p>
              )}
            </div>

            {/* Success Message */}
            {uploadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                role="alert"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-green-900">Upload successful!</p>
                  <p className="text-sm text-green-700">Your work is being analyzed by AI.</p>
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
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                  Upload Work
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

