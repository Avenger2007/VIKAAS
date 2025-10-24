'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus, Eye, Edit, Trash2, Star, TrendingUp, Calendar, User } from 'lucide-react'

interface Observation {
  id: string
  studentId: string
  studentName: string
  studentAvatar: string
  date: string
  type: 'academic' | 'behavioral' | 'social' | 'creative' | 'leadership'
  category: string
  title: string
  description: string
  strengths: string[]
  improvements: string[]
  rating: number
  followUpRequired: boolean
  privateNotes: string
  attachments: string[]
}

const observations: Observation[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Emma Thompson',
    studentAvatar: '/avatars/emma.jpg',
    date: '2024-01-15',
    type: 'creative',
    category: 'Visual Arts',
    title: 'Exceptional Drawing Skills',
    description: 'Emma demonstrated remarkable talent in today\'s art class. Her understanding of perspective and color theory is well beyond her grade level.',
    strengths: ['Attention to detail', 'Color theory application', 'Creative expression'],
    improvements: ['Confidence in sharing work', 'Exploring new mediums'],
    rating: 5,
    followUpRequired: false,
    privateNotes: 'Consider recommending advanced art program',
    attachments: ['emma_artwork_1.jpg', 'emma_artwork_2.jpg']
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Michael Chen',
    studentAvatar: '/avatars/michael.jpg',
    date: '2024-01-14',
    type: 'academic',
    category: 'Mathematics',
    title: 'Advanced Problem Solving',
    description: 'Michael successfully solved complex algebraic problems that typically challenge 11th grade students.',
    strengths: ['Logical reasoning', 'Pattern recognition', 'Perseverance'],
    improvements: ['Showing work clearly', 'Explaining thought process'],
    rating: 4,
    followUpRequired: true,
    privateNotes: 'Parent meeting scheduled to discuss advanced placement',
    attachments: []
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Sophia Rodriguez',
    studentAvatar: '/avatars/sophia.jpg',
    date: '2024-01-13',
    type: 'leadership',
    category: 'Group Work',
    title: 'Natural Leadership Abilities',
    description: 'Sophia took initiative in group project, effectively delegating tasks and ensuring everyone participated.',
    strengths: ['Communication', 'Team coordination', 'Problem-solving'],
    improvements: ['Listening to others\' ideas', 'Time management'],
    rating: 5,
    followUpRequired: false,
    privateNotes: 'Potential student council candidate',
    attachments: []
  }
]

const observationTypes = [
  { value: 'all', label: 'All Types', color: 'bg-gray-100' },
  { value: 'academic', label: 'Academic', color: 'bg-blue-100' },
  { value: 'behavioral', label: 'Behavioral', color: 'bg-green-100' },
  { value: 'social', label: 'Social', color: 'bg-purple-100' },
  { value: 'creative', label: 'Creative', color: 'bg-yellow-100' },
  { value: 'leadership', label: 'Leadership', color: 'bg-red-100' }
]

export default function Observations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedObservation, setSelectedObservation] = useState<Observation | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newObservation, setNewObservation] = useState({
    studentId: '',
    type: 'academic' as const,
    title: '',
    description: '',
    rating: 3
  })

  const filteredObservations = observations.filter(obs => {
    const matchesSearch = obs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obs.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obs.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || obs.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    const typeConfig = observationTypes.find(t => t.value === type)
    return typeConfig?.color || 'bg-gray-100'
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Observations</h1>
          <p className="text-muted-foreground">Document and track student progress and behaviors</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search observations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Observation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Observation</DialogTitle>
                <DialogDescription>
                  Document a new observation about a student's progress or behavior
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Student</label>
                    <Select value={newObservation.studentId} onValueChange={(value) => setNewObservation({...newObservation, studentId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Emma Thompson</SelectItem>
                        <SelectItem value="2">Michael Chen</SelectItem>
                        <SelectItem value="3">Sophia Rodriguez</SelectItem>
                        <SelectItem value="4">James Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select value={newObservation.type} onValueChange={(value: any) => setNewObservation({...newObservation, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newObservation.title}
                    onChange={(e) => setNewObservation({...newObservation, title: e.target.value})}
                    placeholder="Brief title for the observation"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newObservation.description}
                    onChange={(e) => setNewObservation({...newObservation, description: e.target.value})}
                    placeholder="Detailed description of the observation"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 cursor-pointer ${i < newObservation.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setNewObservation({...newObservation, rating: i + 1})}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                    Save Observation
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-2">
        {observationTypes.map(type => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type.value)}
            className={`${selectedType === type.value ? '' : type.color}`}
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredObservations.map(observation => (
          <Card key={observation.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={observation.studentAvatar} alt={observation.studentName} />
                    <AvatarFallback>{observation.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{observation.title}</CardTitle>
                    <CardDescription>
                      {observation.studentName} • {observation.date} • {observation.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(observation.type)}>
                    {observation.type}
                  </Badge>
                  {observation.followUpRequired && (
                    <Badge variant="destructive">Follow Up</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{observation.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex">{renderStars(observation.rating)}</div>
                </div>

                {observation.strengths.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Strengths:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {observation.strengths.map(strength => (
                        <Badge key={strength} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedObservation(observation)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedObservation && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedObservation.studentAvatar} alt={selectedObservation.studentName} />
                  <AvatarFallback>{selectedObservation.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{selectedObservation.title}</CardTitle>
                  <CardDescription>
                    {selectedObservation.studentName} • {selectedObservation.date}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(selectedObservation.type)}>
                  {selectedObservation.type}
                </Badge>
                <div className="flex">{renderStars(selectedObservation.rating)}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedObservation.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Strengths</h3>
                <div className="space-y-2">
                  {selectedObservation.strengths.map(strength => (
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
                  {selectedObservation.improvements.map(improvement => (
                    <div key={improvement} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedObservation.privateNotes && (
              <div>
                <h3 className="font-semibold mb-2">Private Notes</h3>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{selectedObservation.privateNotes}</p>
                </div>
              </div>
            )}

            {selectedObservation.attachments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Attachments</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedObservation.attachments.map(attachment => (
                    <Badge key={attachment} variant="outline" className="cursor-pointer">
                      {attachment}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit Observation
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" onClick={() => setSelectedObservation(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}