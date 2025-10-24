'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Users, BookOpen, TrendingUp, Award, Mail, Phone, Calendar } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  grade: string
  avatar: string
  enrolledDate: string
  lastActive: string
  topIntelligences: string[]
  averageScore: number
  completedWork: number
  totalWork: number
  strengths: string[]
  areasForImprovement: string[]
  parentContact: {
    name: string
    email: string
    phone: string
  }
}

const students: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    email: 'emma.t@school.edu',
    phone: '+1 234-567-8901',
    grade: '10th Grade',
    avatar: '/avatars/emma.jpg',
    enrolledDate: '2024-01-15',
    lastActive: '2 hours ago',
    topIntelligences: ['Visual Arts', 'Music', 'Intrapersonal'],
    averageScore: 92,
    completedWork: 24,
    totalWork: 26,
    strengths: ['Creative Thinking', 'Attention to Detail', 'Self-Motivation'],
    areasForImprovement: ['Public Speaking', 'Team Collaboration'],
    parentContact: {
      name: 'Sarah Thompson',
      email: 'sarah.thompson@email.com',
      phone: '+1 234-567-8902'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@school.edu',
    phone: '+1 234-567-8903',
    grade: '10th Grade',
    avatar: '/avatars/michael.jpg',
    enrolledDate: '2024-01-20',
    lastActive: '1 day ago',
    topIntelligences: ['Logical/Mathematical', 'Naturalistic', 'Intrapersonal'],
    averageScore: 88,
    completedWork: 22,
    totalWork: 26,
    strengths: ['Problem Solving', 'Analytical Thinking', 'Research Skills'],
    areasForImprovement: ['Creative Expression', 'Communication'],
    parentContact: {
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 234-567-8904'
    }
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    email: 'sophia.r@school.edu',
    phone: '+1 234-567-8905',
    grade: '11th Grade',
    avatar: '/avatars/sophia.jpg',
    enrolledDate: '2023-09-10',
    lastActive: '3 hours ago',
    topIntelligences: ['Interpersonal', 'Linguistics', 'Performing Arts'],
    averageScore: 95,
    completedWork: 28,
    totalWork: 30,
    strengths: ['Leadership', 'Communication', 'Creativity'],
    areasForImprovement: ['Time Management', 'Attention to Detail'],
    parentContact: {
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+1 234-567-8906'
    }
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@school.edu',
    phone: '+1 234-567-8907',
    grade: '9th Grade',
    avatar: '/avatars/james.jpg',
    enrolledDate: '2024-02-01',
    lastActive: '5 hours ago',
    topIntelligences: ['Music', 'Performing Arts', 'Interpersonal'],
    averageScore: 85,
    completedWork: 18,
    totalWork: 22,
    strengths: ['Musical Talent', 'Performance Skills', 'Team Work'],
    areasForImprovement: ['Academic Focus', 'Organization'],
    parentContact: {
      name: 'Jennifer Wilson',
      email: 'jennifer.wilson@email.com',
      phone: '+1 234-567-8908'
    }
  }
]

export default function MyStudents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState('all')

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Students</h1>
          <p className="text-muted-foreground">Monitor and support your students' progress</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Work</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">Total submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Above 90% score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredStudents.map(student => (
              <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.grade} • {student.email}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(student.averageScore)}`}>
                        {student.averageScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {student.topIntelligences.map(intelligence => (
                        <Badge key={intelligence} variant="secondary" className="text-xs">
                          {intelligence}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress 
                            value={(student.completedWork / student.totalWork) * 100} 
                            className="flex-1 h-2"
                          />
                          <span className="text-xs">{student.completedWork}/{student.totalWork}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Active:</span>
                        <div className="font-medium">{student.lastActive}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedStudent(student)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-4">
            {filteredStudents
              .filter(s => !s.lastActive.includes('day'))
              .map(student => (
                <Card key={student.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">Active {student.lastActive}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Activity</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="needs-attention">
          <div className="space-y-4">
            {filteredStudents
              .filter(s => s.averageScore < 80 || (s.completedWork / s.totalWork) < 0.7)
              .map(student => (
                <Card key={student.id} className="border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-yellow-600">Needs support</p>
                        </div>
                      </div>
                      <Button size="sm">Intervene</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedStudent && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                  <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{selectedStudent.name}</CardTitle>
                  <CardDescription>{selectedStudent.grade}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedStudent.email}</Badge>
                    <Badge variant="outline">{selectedStudent.phone}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Academic Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Average Score:</span>
                    <span className={`font-bold ${getScoreColor(selectedStudent.averageScore)}`}>
                      {selectedStudent.averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Work:</span>
                    <span>{selectedStudent.completedWork}/{selectedStudent.totalWork}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enrolled Date:</span>
                    <span>{selectedStudent.enrolledDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Top Intelligences</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.topIntelligences.map(intelligence => (
                    <Badge key={intelligence} variant="secondary">{intelligence}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Strengths</h3>
                <div className="space-y-2">
                  {selectedStudent.strengths.map(strength => (
                    <div key={strength} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Areas for Improvement</h3>
                <div className="space-y-2">
                  {selectedStudent.areasForImprovement.map(area => (
                    <div key={area} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Parent Contact</h3>
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <p className="font-medium">{selectedStudent.parentContact.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedStudent.parentContact.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <p className="font-medium">{selectedStudent.parentContact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline">
                Add Observation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}