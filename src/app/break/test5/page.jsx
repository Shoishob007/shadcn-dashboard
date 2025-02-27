"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus } from "lucide-react"
// import { toast } from "sonner"

// Sample job data
const initialJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "Epic Coders",
    type: "hourly",
    typeColor: "default",
    rate: 55,
    skills: ["UI", "UX", "Photoshop"],
    extraSkills: 4,
    description: "We are looking for an experienced UI and UX designer to work on our new projects...",
  },
  {
    id: 2,
    title: "Branding Expert",
    company: "Hubstaff",
    type: "part-time",
    typeColor: "warning",
    rate: 32,
    skills: ["PHP", "Android", "iOS"],
    extraSkills: 2,
    description: "Looking for an experienced person to help us with rebranding our business. We are interested in a...",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "TechNova",
    type: "full-time",
    typeColor: "success",
    rate: 45,
    skills: ["React", "Tailwind", "TypeScript"],
    extraSkills: 3,
    description: "Seeking a talented frontend developer to join our team and help build responsive web applications...",
  },
]


const JobCard = ({ job }) => {
  const getBadgeVariant = (color) => {
    switch (color) {
      case "warning":
        return "warning"
      case "success":
        return "success"
      case "destructive":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant={getBadgeVariant(job.typeColor)}>{job.type}</Badge>
          <span className="font-semibold">${job.rate}/hr</span>
        </div>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <div className="flex items-center text-muted-foreground">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.company}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
          {job.extraSkills > 0 && <Badge variant="secondary">+{job.extraSkills}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

const JobForm = ({ onSubmit, onCancel }) => {
  const [newJob, setNewJob] = useState<JobType>({
    id: Date.now(),
    title: "",
    company: "",
    type: "hourly",
    typeColor: "default",
    rate: 0,
    skills: [],
    extraSkills: 0,
    description: "",
  })
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() && !newJob.skills.includes(newSkill.trim())) {
      setNewJob({
        ...newJob,
        skills: [...newJob.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleSubmit = () => {
    if (!newJob.title || !newJob.company || newJob.rate <= 0) {
      toast.error("Please fill in all required fields")
      return
    }
    onSubmit(newJob)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Job</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              placeholder="e.g. UI/UX Designer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              placeholder="e.g. Epic Coders"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Job Type</Label>
            <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Hourly Rate ($)</Label>
            <Input
              id="rate"
              type="number"
              value={newJob.rate || ""}
              onChange={(e) => setNewJob({ ...newJob, rate: Number(e.target.value) })}
              placeholder="e.g. 55"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newJob.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setNewJob({
                    ...newJob,
                    skills: newJob.skills.filter((_, i) => i !== index),
                  })
                }
              >
                {skill} ×
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. React"
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <Button type="button" onClick={handleAddSkill} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            placeholder="Brief job description..."
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Job</Button>
      </CardFooter>
    </Card>
  )
}

export default function JobListings() {
  const [jobs, setJobs] = useState(initialJobs)
  const [showForm, setShowForm] = useState(false)

  const handleAddJob = (job) => {
    setJobs([...jobs, job])
    setShowForm(false)
    // toast.success("Job added successfully")
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add New Job"}</Button>
        </div>

        {showForm && <JobForm onSubmit={handleAddJob} onCancel={() => setShowForm(false)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

