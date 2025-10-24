'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Award, 
  Trophy, 
  Star, 
  Medal, 
  Target,
  Calendar,
  Download,
  Share2,
  Filter,
  Crown,
  Gem,
  Certificate
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: 'academic' | 'creative' | 'social' | 'leadership' | 'sports' | 'milestone'
  type: 'award' | 'certificate' | 'badge' | 'milestone' | 'recognition'
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'special'
  points: number
  issuer: string
  attachments?: string[]
  shared: boolean
  featured: boolean
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Regional Art Competition Winner',
    description: 'First place in the regional high school art competition for exceptional digital artwork titled "Digital Dreams"',
    date: '2024-01-10',
    category: 'creative',
    type: 'award',
    level: 'gold',
    points: 100,
    issuer: 'Regional Arts Council',
    attachments: ['certificate.pdf', 'artwork.jpg'],
    shared: true,
    featured: true
  },
  {
    id: '2',
    title: 'Mathematics Excellence',
    description: 'Achieved 95% score in advanced mathematics examination and qualified for state-level competition',
    date: '2024-01-08',
    category: 'academic',
    type: 'certificate',
    level: 'silver',
    points: 75,
    issuer: 'Mathematics Department',
    attachments: ['score_report.pdf'],
    shared: false,
    featured: false
  },
  {
    id: '3',
    title: 'Outstanding Leadership',
    description: 'Recognized for exceptional leadership skills in coordinating the group science project',
    date: '2024-01-05',
    category: 'leadership',
    type: 'recognition',
    level: 'gold',
    points: 80,
    issuer: 'Science Department',
    shared: true,
    featured: false
  },
  {
    id: '4',
    title: 'Perfect Attendance',
    description: 'Maintained perfect attendance for the entire fall semester',
    date: '2023-12-20',
    category: 'milestone',
    type: 'milestone',
    level: 'bronze',
    points: 50,
    issuer: 'School Administration',
    shared: false,
    featured: false
  },
  {
    id: '5',
    title: 'Music Performance Excellence',
    description: 'Outstanding solo performance in the winter concert showcase',
    date: '2023-12-15',
    category: 'creative',
    type: 'certificate',
    level: 'silver',
    points: 70,
    issuer: 'Music Department',
    attachments: ['performance_video.mp4'],
    shared: true,
    featured: false
  },
  {
    id: '6',
    title: 'Peer Mentor Badge',
    description: 'Recognized for consistently helping classmates with difficult concepts',
    date: '2023-12-10',
    category: 'social',
    type: 'badge',
    level: 'special',
    points: 60,
    issuer: 'Student Council',
    shared: false,
    featured: false
  },
  {
    id: '7',
    title: 'Science Fair Champion',
    description: 'First place in school science fair for innovative environmental project',
    date: '2023-11-25',
    category: 'academic',
    type: 'award',
    level: 'platinum',
    points: 120,
    issuer: 'Science Department',
    attachments: ['project_report.pdf', 'presentation.pptx'],
    shared: true,
    featured: true
  },
  {
    id: '8',
    title: 'Creative Writing Excellence',
    description: 'Published short story in the school literary magazine',
    date: '2023-11-15',
    category: 'creative',
    type: 'certificate',
    level: 'silver',
    points: 65,
    issuer: 'English Department',
    attachments: ['published_story.pdf'],
    shared: false,
    featured: false
  }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'academic', label: 'Academic' },
  { value: 'creative', label: 'Creative' },
  { value: 'social', label: 'Social' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'sports', label: 'Sports' },
  { value: 'milestone', label: 'Milestones' }
]

const types = [
  { value: 'all', label: 'All Types' },
  { value: 'award', label: 'Awards' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'badge', label: 'Badges' },
  { value: 'milestone', label: 'Milestones' },
  { value: 'recognition', label: 'Recognitions' }
]

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory
    const matchesType = selectedType === 'all' || achievement.type === selectedType
    return matchesCategory && matchesType
  })

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0)
  const featuredAchievements = achievements.filter(a => a.featured)
  const recentAchievements = achievements.slice(0, 3)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'platinum': return <Gem className="h-5 w-5" />
      case 'gold': return <Trophy className="h-5 w-5" />
      case 'silver': return <Medal className="h-5 w-5" />
      case 'bronze': return <Award className="h-5 w-5" />
      default: return <Star className="h-5 w-5" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'award': return <Trophy className="h-4 w-4" />
      case 'certificate': return <Certificate className="h-4 w-4" />
      case 'badge': return <Award className="h-4 w-4" />
      case 'milestone': return <Target className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'creative': return 'bg-purple-100 text-purple-800'
      case 'social': return 'bg-green-100 text-green-800'
      case 'leadership': return 'bg-red-100 text-red-800'
      case 'sports': return 'bg-orange-100 text-orange-800'
      case 'milestone': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Celebrate your child's accomplishments and milestones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Portfolio
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">Lifetime achievement points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Accomplishments earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredAchievements.length}</div>
            <p className="text-xs text-muted-foreground">Featured achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New achievements</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${achievement.featured ? 'border-yellow-200 bg-yellow-50/30' : ''}`}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getLevelColor(achievement.level)}`}>
                        {getLevelIcon(achievement.level)}
                      </div>
                      <div>
                        <CardTitle className="text-lg line-clamp-2">{achievement.title}</CardTitle>
                        <CardDescription className="text-sm">{achievement.issuer}</CardDescription>
                      </div>
                    </div>
                    {achievement.featured && <Crown className="h-4 w-4 text-yellow-500" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{achievement.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(achievement.category)}>
                          {achievement.category}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getTypeIcon(achievement.type)}
                          {achievement.type}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium">{achievement.points} pts</div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{achievement.date}</span>
                      <div className="flex items-center gap-2">
                        {achievement.shared && <span>Shared</span>}
                        {achievement.attachments && achievement.attachments.length > 0 && (
                          <span>{achievement.attachments.length} attachments</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {featuredAchievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border-yellow-200 bg-yellow-50/30"
                onClick={() => setSelectedAchievement(achievement)}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${getLevelColor(achievement.level)}`}>
                      {getLevelIcon(achievement.level)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <Crown className="h-4 w-4 text-yellow-500" />
                      </div>
                      <CardDescription>{achievement.issuer}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                    <div className="text-sm font-medium">{achievement.points} pts</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentAchievements.map(achievement => (
              <Card 
                key={achievement.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedAchievement(achievement)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getLevelColor(achievement.level)}`}>
                      {getLevelIcon(achievement.level)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <Badge className={getCategoryColor(achievement.category)}>
                          {achievement.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{achievement.points} pts</div>
                      <div className="text-xs text-muted-foreground">{achievement.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedAchievement && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${getLevelColor(selectedAchievement.level)}`}>
                  {getLevelIcon(selectedAchievement.level)}
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedAchievement.title}</CardTitle>
                  <CardDescription>{selectedAchievement.issuer}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getCategoryColor(selectedAchievement.category)}>
                      {selectedAchievement.category}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getTypeIcon(selectedAchievement.type)}
                      {selectedAchievement.type}
                    </Badge>
                    <Badge className={getLevelColor(selectedAchievement.level)}>
                      {selectedAchievement.level} level
                    </Badge>
                    {selectedAchievement.featured && <Crown className="h-4 w-4 text-yellow-500" />}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedAchievement(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedAchievement.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Achievement Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Earned:</span>
                    <span className="font-medium">{selectedAchievement.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-medium">{selectedAchievement.points} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium capitalize">{selectedAchievement.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shared:</span>
                    <span className="font-medium">{selectedAchievement.shared ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Achievement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    {selectedAchievement.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                </div>
              </div>
            </div>

            {selectedAchievement.attachments && selectedAchievement.attachments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Attachments</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.attachments.map((attachment, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer">
                      {attachment}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}