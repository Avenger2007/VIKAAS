'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Award, 
  TrendingUp,
  Star,
  Target,
  Heart,
  Activity
} from 'lucide-react'

interface ChildProfile {
  id: string
  name: string
  email: string
  phone: string
  grade: string
  age: number
  avatar: string
  joinDate: string
  address: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  topIntelligences: {
    name: string
    score: number
    description: string
  }[]
  recentAchievements: {
    id: string
    title: string
    description: string
    date: string
    type: string
  }[]
  healthInfo: {
    allergies: string[]
    medications: string[]
    notes: string
  }
  academicPerformance: {
    overall: number
    subjects: {
      name: string
      score: number
      trend: 'up' | 'down' | 'stable'
    }[]
  }
}

const childProfile: ChildProfile = {
  id: '1',
  name: 'Emma Thompson',
  email: 'emma.t@school.edu',
  phone: '+1 234-567-8901',
  grade: '10th Grade',
  age: 15,
  avatar: '/avatars/emma.jpg',
  joinDate: '2024-01-15',
  address: '123 Main St, Springfield, IL 62701',
  emergencyContact: {
    name: 'Sarah Thompson',
    relationship: 'Mother',
    phone: '+1 234-567-8902'
  },
  topIntelligences: [
    {
      name: 'Visual Arts',
      score: 95,
      description: 'Exceptional talent in drawing, painting, and visual composition'
    },
    {
      name: 'Music',
      score: 88,
      description: 'Strong musical aptitude with good rhythm and pitch recognition'
    },
    {
      name: 'Intrapersonal',
      score: 82,
      description: 'Well-developed self-awareness and emotional intelligence'
    }
  ],
  recentAchievements: [
    {
      id: '1',
      title: 'Art Competition Winner',
      description: 'First place in the regional art competition for digital artwork',
      date: '2024-01-10',
      type: 'Creative'
    },
    {
      id: '2',
      title: 'Math Excellence',
      description: 'Achieved 95% score in advanced mathematics examination',
      date: '2024-01-08',
      type: 'Academic'
    },
    {
      id: '3',
      title: 'Leadership Award',
      description: 'Recognized for outstanding leadership in group project',
      date: '2024-01-05',
      type: 'Social'
    }
  ],
  healthInfo: {
    allergies: ['Peanuts', 'Dust'],
    medications: ['Vitamin D supplement'],
    notes: 'Regular physical activity recommended. Good overall health.'
  },
  academicPerformance: {
    overall: 92,
    subjects: [
      { name: 'Mathematics', score: 95, trend: 'up' },
      { name: 'Visual Arts', score: 98, trend: 'up' },
      { name: 'Music', score: 88, trend: 'stable' },
      { name: 'Science', score: 85, trend: 'down' },
      { name: 'Literature', score: 90, trend: 'stable' }
    ]
  }
}

export default function ChildProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '➡️'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Child's Profile</h1>
          <p className="text-muted-foreground">Complete overview of your child's development and progress</p>
        </div>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Contact Teacher
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={childProfile.avatar} alt={childProfile.name} />
                <AvatarFallback className="text-2xl">{childProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{childProfile.name}</CardTitle>
              <CardDescription>{childProfile.grade}</CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Age {childProfile.age}</Badge>
                <Badge variant="outline">Student ID: {childProfile.id}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{childProfile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{childProfile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{childProfile.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {childProfile.joinDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Emergency Contact</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">{childProfile.emergencyContact.name}</span></p>
                <p className="text-muted-foreground">{childProfile.emergencyContact.relationship}</p>
                <p className="text-muted-foreground">{childProfile.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="intelligences">Intelligences</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Performance</CardTitle>
                    <CardDescription>Overall performance across subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(childProfile.academicPerformance.overall)}`}>
                          {childProfile.academicPerformance.overall}%
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Score</p>
                      </div>
                      <div className="space-y-3">
                        {childProfile.academicPerformance.subjects.map(subject => (
                          <div key={subject.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{subject.name}</span>
                              <span className="flex items-center gap-1">
                                {subject.score}% {getTrendIcon(subject.trend)}
                              </span>
                            </div>
                            <Progress value={subject.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Latest updates and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">New artwork submitted</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Achievement unlocked</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Progress milestone reached</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Intelligence Areas</CardTitle>
                  <CardDescription>Strengths based on recent assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {childProfile.topIntelligences.map((intelligence, index) => (
                      <div key={intelligence.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="font-medium">{intelligence.name}</span>
                          </div>
                          <span className={`font-bold ${getScoreColor(intelligence.score)}`}>
                            {intelligence.score}%
                          </span>
                        </div>
                        <Progress value={intelligence.score} className="h-2" />
                        <p className="text-sm text-muted-foreground">{intelligence.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intelligences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Intelligence Profile</CardTitle>
                  <CardDescription>Detailed breakdown across all intelligence categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      { name: 'Visual Arts', score: 95, description: 'Exceptional talent in visual arts and design' },
                      { name: 'Music', score: 88, description: 'Strong musical abilities and appreciation' },
                      { name: 'Intrapersonal', score: 82, description: 'Good self-awareness and reflection' },
                      { name: 'Linguistics', score: 78, description: 'Developed language and communication skills' },
                      { name: 'Logical/Mathematical', score: 75, description: 'Solid logical reasoning abilities' },
                      { name: 'Interpersonal', score: 72, description: 'Good social skills and empathy' },
                      { name: 'Naturalistic', score: 68, description: 'Moderate connection with nature' },
                      { name: 'Performing Arts', score: 65, description: 'Emerging performance skills' }
                    ].map(intelligence => (
                      <div key={intelligence.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{intelligence.name}</span>
                          <span className={`font-bold ${getScoreColor(intelligence.score)}`}>
                            {intelligence.score}%
                          </span>
                        </div>
                        <Progress value={intelligence.score} className="h-2" />
                        <p className="text-sm text-muted-foreground">{intelligence.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-4">
                {childProfile.recentAchievements.map(achievement => (
                  <Card key={achievement.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <Badge variant="secondary">{achievement.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Health Information
                  </CardTitle>
                  <CardDescription>Important health and medical information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {childProfile.healthInfo.allergies.map(allergy => (
                        <Badge key={allergy} variant="destructive">{allergy}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Medications</h4>
                    <div className="flex flex-wrap gap-2">
                      {childProfile.healthInfo.medications.map(medication => (
                        <Badge key={medication} variant="outline">{medication}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Health Notes</h4>
                    <p className="text-sm text-muted-foreground">{childProfile.healthInfo.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}