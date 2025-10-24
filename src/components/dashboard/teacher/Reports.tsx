'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { 
  Search, 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Send
} from 'lucide-react'

interface Report {
  id: string
  title: string
  type: 'performance' | 'progress' | 'behavior' | 'attendance' | 'custom'
  description: string
  generatedDate: string
  period: string
  studentCount: number
  status: 'draft' | 'generated' | 'sent'
  fileSize: string
  format: 'pdf' | 'excel' | 'csv'
  scheduled?: string
  recipients?: string[]
}

const reports: Report[] = [
  {
    id: '1',
    title: 'Mid-Term Performance Report',
    type: 'performance',
    description: 'Comprehensive analysis of student performance for the first half of the semester',
    generatedDate: '2024-01-15',
    period: 'Sep 2024 - Jan 2024',
    studentCount: 24,
    status: 'generated',
    fileSize: '2.4 MB',
    format: 'pdf',
    recipients: ['parents@school.edu', 'admin@school.edu']
  },
  {
    id: '2',
    title: 'Individual Progress Reports',
    type: 'progress',
    description: 'Personalized progress reports for each student covering all intelligence areas',
    generatedDate: '2024-01-10',
    period: 'Fall Semester 2024',
    studentCount: 24,
    status: 'sent',
    fileSize: '15.2 MB',
    format: 'pdf',
    recipients: ['all-parents@school.edu']
  },
  {
    id: '3',
    title: 'Class Attendance Summary',
    type: 'attendance',
    description: 'Monthly attendance records and patterns analysis',
    generatedDate: '2024-01-05',
    period: 'December 2024',
    studentCount: 24,
    status: 'generated',
    fileSize: '856 KB',
    format: 'excel'
  },
  {
    id: '4',
    title: 'Behavioral Assessment Report',
    type: 'behavior',
    description: 'Social and behavioral development observations and recommendations',
    generatedDate: '2023-12-20',
    period: 'Fall Semester 2024',
    studentCount: 24,
    status: 'draft',
    fileSize: '1.8 MB',
    format: 'pdf'
  },
  {
    id: '5',
    title: 'Weekly Performance Dashboard',
    type: 'performance',
    description: 'Automated weekly performance metrics and trends',
    generatedDate: '2024-01-12',
    period: 'Week of Jan 8-12',
    studentCount: 24,
    status: 'generated',
    fileSize: '1.2 MB',
    format: 'csv',
    scheduled: 'Weekly'
  }
]

const reportTemplates = [
  {
    id: 'performance',
    name: 'Performance Report',
    description: 'Academic performance and achievement analysis',
    icon: BarChart3
  },
  {
    id: 'progress',
    name: 'Progress Report',
    description: 'Individual student progress tracking',
    icon: TrendingUp
  },
  {
    id: 'attendance',
    name: 'Attendance Report',
    description: 'Attendance records and patterns',
    icon: CalendarIcon
  },
  {
    id: 'behavior',
    name: 'Behavioral Report',
    description: 'Social and behavioral development',
    icon: FileText
  }
]

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'performance' as const,
    period: '',
    format: 'pdf' as const
  })

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || report.type === selectedType
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-blue-100 text-blue-800'
      case 'sent': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return BarChart3
      case 'progress': return TrendingUp
      case 'attendance': return CalendarIcon
      case 'behavior': return FileText
      default: return FileText
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage comprehensive class reports</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
                <DialogDescription>
                  Generate a comprehensive report for your class
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Report Type</label>
                    <Select value={newReport.type} onValueChange={(value: any) => setNewReport({...newReport, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance Report</SelectItem>
                        <SelectItem value="progress">Progress Report</SelectItem>
                        <SelectItem value="attendance">Attendance Report</SelectItem>
                        <SelectItem value="behavior">Behavioral Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Format</label>
                    <Select value={newReport.format} onValueChange={(value: any) => setNewReport({...newReport, format: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Report Title</label>
                  <Input
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    placeholder="Enter report title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Period</label>
                  <Input
                    value={newReport.period}
                    onChange={(e) => setNewReport({...newReport, period: e.target.value})}
                    placeholder="e.g., Fall Semester 2024"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                    Generate Report
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-2">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="attendance">Attendance</SelectItem>
            <SelectItem value="behavior">Behavioral</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="generated">Generated</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {filteredReports.map(report => {
              const TypeIcon = getTypeIcon(report.type)
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <TypeIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge variant="outline">{report.format.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Period:</span>
                          <p className="font-medium">{report.period}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Students:</span>
                          <p className="font-medium">{report.studentCount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Generated:</span>
                          <p className="font-medium">{report.generatedDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <p className="font-medium">{report.fileSize}</p>
                        </div>
                      </div>

                      {report.recipients && (
                        <div>
                          <span className="text-sm text-muted-foreground">Recipients:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.recipients.map((recipient, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {recipient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4 mr-2" />
                          Send
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
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map(template => {
              const Icon = template.icon
              return (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {reports.filter(r => r.scheduled).map(report => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <CalendarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Scheduled: {report.scheduled}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit Schedule</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedReport && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{selectedReport.title}</CardTitle>
                <CardDescription>{selectedReport.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Report Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{selectedReport.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Period:</span>
                    <span className="font-medium">{selectedReport.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{selectedReport.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{selectedReport.format.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">File Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generated:</span>
                    <span className="font-medium">{selectedReport.generatedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Size:</span>
                    <span className="font-medium">{selectedReport.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send to Recipients
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}