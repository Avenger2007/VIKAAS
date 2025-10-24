'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target,
  Award,
  BookOpen,
  Activity,
  Download,
  Filter
} from 'lucide-react'

const progressData = [
  { month: 'Sep', overall: 75, visual: 80, music: 70, academic: 75 },
  { month: 'Oct', overall: 78, visual: 82, music: 73, academic: 78 },
  { month: 'Nov', overall: 82, visual: 85, music: 76, academic: 82 },
  { month: 'Dec', overall: 85, visual: 88, music: 80, academic: 85 },
  { month: 'Jan', overall: 88, visual: 92, music: 83, academic: 88 }
]

const subjectProgress = [
  { subject: 'Visual Arts', current: 92, previous: 88, change: 4 },
  { subject: 'Music', current: 83, previous: 80, change: 3 },
  { subject: 'Mathematics', current: 85, previous: 82, change: 3 },
  { subject: 'Science', current: 78, previous: 80, change: -2 },
  { subject: 'Literature', current: 88, previous: 85, change: 3 }
]

const intelligenceGrowth = [
  { name: 'Visual Arts', value: 35, growth: 12 },
  { name: 'Music', value: 25, growth: 8 },
  { name: 'Logical/Math', value: 20, growth: 5 },
  { name: 'Linguistics', value: 30, growth: 10 },
  { name: 'Interpersonal', value: 28, growth: 15 },
  { name: 'Intrapersonal', value: 32, growth: 18 }
]

const milestones = [
  {
    id: '1',
    title: 'Art Competition Winner',
    date: '2024-01-10',
    type: 'achievement',
    description: 'First place in regional art competition',
    impact: 'High'
  },
  {
    id: '2',
    title: 'Math Mastery',
    date: '2024-01-08',
    type: 'academic',
    description: 'Completed advanced mathematics module',
    impact: 'Medium'
  },
  {
    id: '3',
    title: 'Leadership Role',
    date: '2024-01-05',
    type: 'social',
    description: 'Led group project to success',
    impact: 'High'
  },
  {
    id: '4',
    title: 'Music Performance',
    date: '2023-12-20',
    type: 'creative',
    description: 'Successful solo performance',
    impact: 'Medium'
  }
]

const weeklyActivity = [
  { day: 'Mon', hours: 2, activities: 3 },
  { day: 'Tue', hours: 3, activities: 4 },
  { day: 'Wed', hours: 2.5, activities: 3 },
  { day: 'Thu', hours: 3, activities: 5 },
  { day: 'Fri', hours: 2, activities: 2 },
  { day: 'Sat', hours: 4, activities: 6 },
  { day: 'Sun', hours: 3, activities: 4 }
]

export default function Progress() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return <div className="h-4 w-4" />
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your child's development and growth over time</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">+13% from start of semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Visual Arts</div>
            <p className="text-xs text-muted-foreground">92% score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.5 hrs</div>
            <p className="text-xs text-muted-foreground">27 activities this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Achieved this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="intelligences">Intelligences</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Overall development trend this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="academic" stroke="#10b981" strokeWidth={1} />
                    <Line type="monotone" dataKey="visual" stroke="#f59e0b" strokeWidth={1} />
                    <Line type="monotone" dataKey="music" stroke="#8b5cf6" strokeWidth={1} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Achievements</CardTitle>
                <CardDescription>Recent milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.slice(0, 3).map(milestone => (
                    <div key={milestone.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                      </div>
                      <Badge className={getImpactColor(milestone.impact)}>
                        {milestone.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Detailed progress across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map(subject => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{subject.current}%</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(subject.change)}`}>
                          {getChangeIcon(subject.change)}
                          <span className="text-sm">{Math.abs(subject.change)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={subject.current} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Previous: {subject.previous}%</span>
                        <span>Current: {subject.current}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligences" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Intelligence Distribution</CardTitle>
                <CardDescription>Current strengths across intelligence areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={intelligenceGrowth}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {intelligenceGrowth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Areas</CardTitle>
                <CardDescription>Intelligence areas with highest growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {intelligenceGrowth
                    .sort((a, b) => b.growth - a.growth)
                    .slice(0, 4)
                    .map((intelligence, index) => (
                      <div key={intelligence.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{intelligence.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{intelligence.value}%</span>
                          <Badge variant="secondary" className="text-green-600">
                            +{intelligence.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid gap-4">
            {milestones.map(milestone => (
              <Card key={milestone.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      milestone.type === 'achievement' ? 'bg-yellow-100' :
                      milestone.type === 'academic' ? 'bg-blue-100' :
                      milestone.type === 'social' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      <Award className={`h-6 w-6 ${
                        milestone.type === 'achievement' ? 'text-yellow-600' :
                        milestone.type === 'academic' ? 'text-blue-600' :
                        milestone.type === 'social' ? 'text-green-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <Badge variant="outline">{milestone.type}</Badge>
                        <Badge className={getImpactColor(milestone.impact)}>
                          {milestone.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{milestone.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Pattern</CardTitle>
              <CardDescription>Time spent and activities completed per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" />
                  <Bar dataKey="activities" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>This week's engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Hours:</span>
                    <span className="font-medium">19.5 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Activities:</span>
                    <span className="font-medium">27 activities</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Average:</span>
                    <span className="font-medium">2.8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Active Day:</span>
                    <span className="font-medium">Saturday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>Participation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">15% increase from last week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Most active in evenings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Consistent daily participation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Above average engagement</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}