'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Search, BookOpen, Video, FileText, Users, Clock, Star, ExternalLink } from 'lucide-react'

interface Resource {
  id: string
  title: string
  type: 'video' | 'article' | 'course' | 'workshop' | 'book'
  category: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  enrolledCount: number
  instructor?: string
  tags: string[]
  progress?: number
  url?: string
  thumbnail?: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Visual Design',
    type: 'course',
    category: 'Visual Arts',
    description: 'Learn the fundamentals of visual design including color theory, typography, and composition.',
    duration: '6 weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    enrolledCount: 1234,
    instructor: 'Sarah Johnson',
    tags: ['Design Principles', 'Color Theory', 'Typography'],
    progress: 45,
    url: '#'
  },
  {
    id: '2',
    title: 'Creative Writing Workshop',
    type: 'workshop',
    category: 'Linguistics',
    description: 'Enhance your writing skills through interactive exercises and peer feedback.',
    duration: '2 days',
    difficulty: 'Intermediate',
    rating: 4.6,
    enrolledCount: 567,
    instructor: 'Michael Chen',
    tags: ['Storytelling', 'Poetry', 'Creative Expression'],
    progress: 0,
    url: '#'
  },
  {
    id: '3',
    title: 'Mathematical Problem Solving',
    type: 'video',
    category: 'Logical/Mathematical',
    description: 'Master problem-solving techniques for mathematical challenges and competitions.',
    duration: '3 hours',
    difficulty: 'Advanced',
    rating: 4.9,
    enrolledCount: 890,
    instructor: 'Dr. Emily Watson',
    tags: ['Problem Solving', 'Mathematics', 'Critical Thinking'],
    progress: 75,
    url: '#'
  },
  {
    id: '4',
    title: 'Environmental Science Basics',
    type: 'article',
    category: 'Naturalistic',
    description: 'Understanding ecosystems, climate change, and environmental conservation.',
    duration: '15 min read',
    difficulty: 'Beginner',
    rating: 4.5,
    enrolledCount: 2341,
    tags: ['Environment', 'Ecology', 'Sustainability'],
    progress: 100,
    url: '#'
  },
  {
    id: '5',
    title: 'Music Theory Fundamentals',
    type: 'course',
    category: 'Music',
    description: 'Learn the basics of music theory, notation, and harmony.',
    duration: '8 weeks',
    difficulty: 'Beginner',
    rating: 4.7,
    enrolledCount: 456,
    instructor: 'David Martinez',
    tags: ['Music Theory', 'Notation', 'Harmony'],
    progress: 20,
    url: '#'
  },
  {
    id: '6',
    title: 'Leadership and Team Management',
    type: 'course',
    category: 'Interpersonal',
    description: 'Develop essential leadership skills and learn to manage teams effectively.',
    duration: '4 weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    enrolledCount: 789,
    instructor: 'Lisa Anderson',
    tags: ['Leadership', 'Teamwork', 'Communication'],
    progress: 0,
    url: '#'
  }
]

const categories = ['All', 'Visual Arts', 'Linguistics', 'Logical/Mathematical', 'Naturalistic', 'Music', 'Interpersonal', 'Performing Arts', 'Intrapersonal']

const resourceTypes = [
  { value: 'all', label: 'All Types', icon: BookOpen },
  { value: 'course', label: 'Courses', icon: BookOpen },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'article', label: 'Articles', icon: FileText },
  { value: 'workshop', label: 'Workshops', icon: Users },
  { value: 'book', label: 'Books', icon: BookOpen }
]

export default function LearningResources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('all')

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'article': return FileText
      case 'workshop': return Users
      case 'book': return BookOpen
      default: return BookOpen
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress > 0) return 'bg-yellow-500'
    return 'bg-gray-300'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground">Expand your knowledge with curated learning materials</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 h-auto">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="text-xs p-2 h-auto flex-col gap-1"
              >
                <span>{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          {resourceTypes.map(type => {
            const Icon = type.icon
            return (
              <Button
                key={type.value}
                variant={selectedType === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => {
          const TypeIcon = getTypeIcon(resource.type)
          return (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary">{resource.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  </div>
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{resource.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{resource.enrolledCount}</span>
                  </div>
                </div>

                {resource.instructor && (
                  <div className="text-sm">
                    <span className="font-medium">Instructor:</span> {resource.instructor}
                  </div>
                )}

                {resource.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{resource.progress}%</span>
                    </div>
                    <Progress 
                      value={resource.progress} 
                      className="h-2"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    {resource.progress === 0 ? 'Start Learning' : 
                     resource.progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}