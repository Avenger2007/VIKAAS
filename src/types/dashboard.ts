// Dashboard Types and Enums

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin'

export enum UploadType {
  ARTWORK = 'ARTWORK',
  PROJECT = 'PROJECT',
  ESSAY = 'ESSAY',
  PRESENTATION = 'PRESENTATION',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT'
}

export enum UploadCategory {
  DRAWING = 'drawing',
  PAINTING = 'painting',
  DIGITAL = 'digital',
  CRAFT = 'craft',
  PHOTOGRAPHY = 'photography',
  OTHER = 'other'
}

export enum ObservationType {
  ACADEMIC = 'ACADEMIC',
  BEHAVIORAL = 'BEHAVIORAL',
  SOCIAL = 'SOCIAL',
  EMOTIONAL = 'EMOTIONAL',
  PHYSICAL = 'PHYSICAL'
}

export enum SentimentType {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE'
}

export interface StudentInfo {
  name: string
  email: string
  phone: string
  class: string
  section: string
  rollNumber: string
  school: string
  location: string
  joinDate: string
}

export interface TalentDimension {
  name: string
  score: number
  color: string
  icon: string
}

export interface CareerMatch {
  title: string
  match: number
  icon: string
  skills: string[]
  color: string
}

export interface RecentUpload {
  id: number
  title: string
  type: string
  uploaded: string
  status: string
  icon: string
}

export interface TeacherObservation {
  teacher: string
  subject: string
  observation: string
  tags: string[]
  time: string
  student?: string
}

export interface DashboardContextType {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface StudentDashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface TeacherDashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface ParentDashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface AdminDashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface DashboardHeaderProps {
  activeRole: UserRole
  title: string
}

export interface DashboardSidebarProps {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export interface RoleSelectorProps {
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
}

export interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  tab: string
}

export interface UploadFormData {
  title: string
  description: string
  category: UploadCategory | ''
  subject: string
  class: string
}

export interface UploadState {
  selectedFile: File | null
  uploadProgress: number
  uploadStatus: 'idle' | 'uploading' | 'analyzing' | 'complete'
  formData: UploadFormData
}

