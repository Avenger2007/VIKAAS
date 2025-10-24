'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, TrendingUp, Users, BookOpen, Award, Target } from 'lucide-react'

interface CareerPath {
  id: string
  title: string
  category: string
  description: string
  requiredSkills: string[]
  averageSalary: string
  growthRate: string
  educationLevel: string
  relatedIntelligences: string[]
  companies: string[]
  matchScore?: number
}

const careerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'UX Designer',
    category: 'Design',
    description: 'Create user-centered designs for digital products and experiences.',
    requiredSkills: ['Visual Design', 'User Research', 'Prototyping', 'Communication'],
    averageSalary: '$85,000 - $130,000',
    growthRate: '13%',
    educationLevel: 'Bachelor\'s Degree',
    relatedIntelligences: ['Visual Arts', 'Interpersonal', 'Intrapersonal'],
    companies: ['Google', 'Apple', 'Microsoft', 'Adobe'],
    matchScore: 92
  },
  {
    id: '2',
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Analyze complex data to help companies make better decisions.',
    requiredSkills: ['Statistics', 'Programming', 'Machine Learning', 'Critical Thinking'],
    averageSalary: '$95,000 - $150,000',
    growthRate: '15%',
    educationLevel: 'Master\'s Degree',
    relatedIntelligences: ['Logical/Mathematical', 'Linguistics', 'Intrapersonal'],
    companies: ['Amazon', 'Netflix', 'Spotify', 'Tesla'],
    matchScore: 78
  },
  {
    id: '3',
    title: 'Marketing Manager',
    category: 'Business',
    description: 'Develop and execute marketing strategies to promote products and services.',
    requiredSkills: ['Strategy', 'Communication', 'Analytics', 'Creativity'],
    averageSalary: '$70,000 - $120,000',
    growthRate: '10%',
    educationLevel: 'Bachelor\'s Degree',
    relatedIntelligences: ['Interpersonal', 'Linguistics', 'Logical/Mathematical'],
    companies: ['Nike', 'Coca-Cola', 'Apple', 'Samsung'],
    matchScore: 85
  },
  {
    id: '4',
    title: 'Environmental Scientist',
    category: 'Science',
    description: 'Study and address environmental problems and sustainability challenges.',
    requiredSkills: ['Research', 'Analysis', 'Field Work', 'Problem Solving'],
    averageSalary: '$60,000 - $100,000',
    growthRate: '11%',
    educationLevel: 'Bachelor\'s Degree',
    relatedIntelligences: ['Naturalistic', 'Logical/Mathematical', 'Intrapersonal'],
    companies: ['EPA', 'WWF', 'Tesla', 'Patagonia'],
    matchScore: 88
  },
  {
    id: '5',
    title: 'Music Producer',
    category: 'Arts',
    description: 'Oversee and manage the production of music recordings and performances.',
    requiredSkills: ['Music Theory', 'Technical Skills', 'Creativity', 'Leadership'],
    averageSalary: '$50,000 - $150,000',
    growthRate: '9%',
    educationLevel: 'Various',
    relatedIntelligences: ['Music', 'Performing Arts', 'Interpersonal'],
    companies: ['Universal Music', 'Sony Music', 'Warner Music', 'Independent'],
    matchScore: 95
  },
  {
    id: '6',
    title: 'Teacher',
    category: 'Education',
    description: 'Educate and inspire students in various subjects and age groups.',
    requiredSkills: ['Communication', 'Patience', 'Subject Knowledge', 'Leadership'],
    averageSalary: '$45,000 - $70,000',
    growthRate: '8%',
    educationLevel: 'Bachelor\'s Degree + Certification',
    relatedIntelligences: ['Interpersonal', 'Linguistics', 'Intrapersonal'],
    companies: ['Public Schools', 'Private Schools', 'Universities', 'Online Platforms'],
    matchScore: 82
  }
]

const categories = ['All', 'Design', 'Technology', 'Business', 'Science', 'Arts', 'Education']

export default function CareerExplorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null)

  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Career Explorer</h1>
          <p className="text-muted-foreground">Discover career paths aligned with your talents</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-xs">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCareers.map(career => (
              <Card 
                key={career.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCareer(career)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <Badge variant="secondary">{career.category}</Badge>
                    </div>
                    {career.matchScore && (
                      <Badge className={getMatchScoreColor(career.matchScore)}>
                        {career.matchScore}% Match
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {career.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Growth: {career.growthRate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>{career.averageSalary}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {career.relatedIntelligences.slice(0, 3).map(intelligence => (
                        <Badge key={intelligence} variant="outline" className="text-xs">
                          {intelligence}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCareer && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedCareer.category}</Badge>
                  {selectedCareer.matchScore && (
                    <Badge className={getMatchScoreColor(selectedCareer.matchScore)}>
                      {selectedCareer.matchScore}% Match with your profile
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedCareer(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">{selectedCareer.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.requiredSkills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Related Intelligences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.relatedIntelligences.map(intelligence => (
                    <Badge key={intelligence} variant="outline">{intelligence}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedCareer.growthRate}</div>
                <div className="text-sm text-muted-foreground">Job Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedCareer.averageSalary}</div>
                <div className="text-sm text-muted-foreground">Average Salary</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{selectedCareer.educationLevel}</div>
                <div className="text-sm text-muted-foreground">Education Required</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Top Companies
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.companies.map(company => (
                  <Badge key={company} variant="secondary">{company}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">Learn More</Button>
              <Button variant="outline" className="flex-1">Save to Profile</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}