'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Search, 
  Send, 
  Reply, 
  Forward, 
  Star,
  Mail,
  Phone,
  Calendar,
  Paperclip,
  MoreHorizontal,
  Check,
  CheckCheck
} from 'lucide-react'

interface Message {
  id: string
  sender: {
    name: string
    role: string
    avatar: string
    email: string
  }
  subject: string
  preview: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
  category: 'academic' | 'behavioral' | 'general' | 'urgent'
  attachments?: string[]
  replyCount: number
}

const messages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Ms. Sarah Johnson',
      role: 'Art Teacher',
      avatar: '/avatars/teacher1.jpg',
      email: 'sarah.johnson@school.edu'
    },
    subject: 'Emma\'s Exceptional Art Project',
    preview: 'I wanted to reach out about Emma\'s latest art project. Her creativity and technical skills have improved remarkably...',
    content: 'Dear Parent,\n\nI wanted to reach out about Emma\'s latest art project. Her creativity and technical skills have improved remarkably this semester. The attention to detail in her landscape painting demonstrates advanced understanding of perspective and color theory.\n\nEmma has shown consistent dedication in class, often staying after to perfect her work. Her ability to incorporate feedback and apply it immediately shows great maturity.\n\nI recommend considering enrolling her in the advanced art program next semester. Her talent is truly exceptional and I believe she would thrive with additional challenges.\n\nPlease feel free to schedule a meeting if you\'d like to discuss this further.\n\nBest regards,\nMs. Sarah Johnson',
    timestamp: '2024-01-15 14:30',
    read: false,
    starred: true,
    category: 'academic',
    attachments: ['emma_artwork.jpg', 'progress_report.pdf'],
    replyCount: 0
  },
  {
    id: '2',
    sender: {
      name: 'Mr. David Chen',
      role: 'Mathematics Teacher',
      avatar: '/avatars/teacher2.jpg',
      email: 'david.chen@school.edu'
    },
    subject: 'Math Competition Results',
    preview: 'Great news! Emma has qualified for the state-level mathematics competition. Her problem-solving skills are outstanding...',
    content: 'Dear Parent,\n\nGreat news! Emma has qualified for the state-level mathematics competition. Her problem-solving skills are outstanding, particularly in algebra and geometry.\n\nThe competition will be held next month, and I\'d like to schedule some extra practice sessions if Emma is interested. She has the potential to do very well.\n\nPlease let me know if you have any questions about the competition or the preparation schedule.\n\nBest regards,\nMr. David Chen',
    timestamp: '2024-01-14 10:15',
    read: true,
    starred: false,
    category: 'academic',
    replyCount: 1
  },
  {
    id: '3',
    sender: {
      name: 'School Administration',
      role: 'Administration',
      avatar: '/avatars/admin.jpg',
      email: 'admin@school.edu'
    },
    subject: 'Parent-Teacher Conference Schedule',
    preview: 'The parent-teacher conferences are scheduled for next week. Please select your preferred time slot...',
    content: 'Dear Parent,\n\nThe parent-teacher conferences are scheduled for next week. Please select your preferred time slot through the parent portal.\n\nConferences will be held:\n- Monday: 2 PM - 6 PM\n- Tuesday: 3 PM - 7 PM\n- Wednesday: 1 PM - 5 PM\n\nEach conference slot is 20 minutes. Please book early to get your preferred time.\n\nBest regards,\nSchool Administration',
    timestamp: '2024-01-13 09:00',
    read: true,
    starred: false,
    category: 'general',
    replyCount: 0
  },
  {
    id: '4',
    sender: {
      name: 'Ms. Lisa Anderson',
      role: 'School Counselor',
      avatar: '/avatars/counselor.jpg',
      email: 'lisa.anderson@school.edu'
    },
    subject: 'Social Development Update',
    preview: 'I wanted to share some positive observations about Emma\'s social development. She has been showing great leadership...',
    content: 'Dear Parent,\n\nI wanted to share some positive observations about Emma\'s social development. She has been showing great leadership qualities in group activities and has formed positive relationships with her peers.\n\nEmma particularly excels at collaborative projects and often takes initiative to ensure everyone\'s ideas are heard. Her empathy and communication skills are well-developed for her age.\n\nI look forward to discussing her progress further during the upcoming conferences.\n\nBest regards,\nMs. Lisa Anderson',
    timestamp: '2024-01-12 15:45',
    read: false,
    starred: true,
    category: 'behavioral',
    replyCount: 0
  }
]

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [activeTab, setActiveTab] = useState('inbox')
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  })

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'behavioral': return 'bg-green-100 text-green-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const unreadCount = messages.filter(m => !m.read).length
  const starredCount = messages.filter(m => m.starred).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with teachers and school administration</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Send a message to teachers or school administration
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">To</label>
                  <Input
                    value={newMessage.recipient}
                    onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                    placeholder="Teacher name or department"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    placeholder="Type your message here..."
                    rows={6}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setIsComposeOpen(false)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inbox">
            Inbox {unreadCount > 0 && <Badge className="ml-2">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="starred">
            Starred {starredCount > 0 && <Badge className="ml-2">{starredCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <div className="grid gap-4">
            {filteredMessages.map(message => (
              <Card 
                key={message.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${!message.read ? 'border-blue-200 bg-blue-50/30' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{message.sender.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">{message.sender.role}</Badge>
                          <Badge className={getCategoryColor(message.category)}>{message.category}</Badge>
                          {message.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <CardDescription className="font-medium">{message.subject}</CardDescription>
                        <CardDescription className="text-sm">{message.preview}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{message.timestamp}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {message.read ? <CheckCheck className="h-4 w-4 text-blue-500" /> : <Check className="h-4 w-4 text-gray-400" />}
                        {message.replyCount > 0 && (
                          <Badge variant="secondary" className="text-xs">{message.replyCount} replies</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                {message.attachments && message.attachments.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred">
          <div className="grid gap-4">
            {filteredMessages.filter(m => m.starred).map(message => (
              <Card 
                key={message.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedMessage(message)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{message.sender.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">{message.sender.role}</Badge>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <CardDescription className="font-medium">{message.subject}</CardDescription>
                        <CardDescription className="text-sm">{message.preview}</CardDescription>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{message.timestamp}</div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sent messages</h3>
            <p className="text-muted-foreground">Your sent messages will appear here</p>
          </div>
        </TabsContent>
      </Tabs>

      {selectedMessage && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedMessage.sender.avatar} alt={selectedMessage.sender.name} />
                  <AvatarFallback>{selectedMessage.sender.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                  <CardDescription>
                    From: {selectedMessage.sender.name} ({selectedMessage.sender.role})
                  </CardDescription>
                  <CardDescription>{selectedMessage.sender.email}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(selectedMessage.category)}>{selectedMessage.category}</Badge>
                {selectedMessage.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-sm text-muted-foreground">
              {selectedMessage.timestamp}
            </div>
            
            <div className="whitespace-pre-wrap">
              {selectedMessage.content}
            </div>

            {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMessage.attachments.map((attachment, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer">
                      <Paperclip className="h-3 w-3 mr-1" />
                      {attachment}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1">
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline" className="flex-1">
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </Button>
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                {selectedMessage.starred ? 'Unstar' : 'Star'}
              </Button>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}