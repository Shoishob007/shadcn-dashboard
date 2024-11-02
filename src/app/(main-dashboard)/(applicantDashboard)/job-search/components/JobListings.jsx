"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Briefcase, Loader, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import companyLogo from '../../../../../../public/assests/dummy-logo.png';

// Jobs data static 
const demoJobs = [
    { id: 1, title: "Frontend Developer", company: "Rokomari", location: "Dhaka", type: "Full-Time", salary: "60,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 2, title: "Full Stack Developer", company: "Bit Software Solutions", location: "Dhaka", type: "Contract", salary: "75,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 3, title: "Backend Developer", company: "Qzency", location: "Remote", type: "Internship", salary: "50,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 4, title: "React Developer", company: "EchoLogyx", location: "Chittagong", type: "Full-Time", salary: "70,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 5, title: "Node.js Developer", company: "Aykori Digital", location: "Remote", type: "Internship", salary: "30,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT",deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 6, title: "UI/UX Designer", company: "Mediusware", location: "Sylhet", type: "Full-Time", salary: "65,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
    { id: 7, title: "Software Engineer", company: "Rocket Systems", location: "Dhaka", type: "Contract", salary: "80,000 BDT", role: 'Frontend', description: "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
        jobRequirements: "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
        employmentType: "full-time",
        salaryRange: "35,000 - 45,000 BDT", deadline: new Date("2024-11-30"),
        postedOn: new Date("2024-10-15"), },
];


const JobListings = () => {
    const [jobs] = useState(demoJobs);
    const [filteredJobs, setFilteredJobs] = useState(demoJobs);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm)
        );
        setFilteredJobs(filtered);
    }; 
    
    const [open, setOpen] = useState(false);
        const [jobDetails, setJobDetails] = useState(null);
        const handleViewDetails = (id) => {
          const jobDetailsData = jobs.find(d => d.id === id);
          setJobDetails(jobDetailsData);
          setOpen(true);  
        }
        const closeDialog = () => setOpen(false);
        const handleApply = () => {
            toast({
                title: "Success",
                description: "Applied!",
                variant: "ourSuccess",
            });
            setOpen(false);
        }
    
    
    return (
        <div>
            <div>
                <Input 
                    type="text" 
                    placeholder="Search for Job..."
                    onChange={handleSearch}
                    value={searchTerm}
                    className='bg-white dark:bg-gray-700'

                />
            </div>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {filteredJobs.map((job) => {
                    const typeBgColor = job.type === 'Full-Time' ? "bg-green-200 text-green-600" : job.type === 'Internship' ? "bg-purple-200 text-purple-600" : job.type === 'Contract' ? "bg-blue-200 text-blue-600" : "bg-black text-white";
                    return (
                        <Card key={job.id} className="shadow-lg border rounded-lg flex flex-col">
                           <CardHeader>
                               <CardTitle className="text-lg font-bold">{job.title} at {job.company}</CardTitle>
                               <CardDescription className="text-sm text-gray-600">{job.location} - <span className={`${typeBgColor} p-1 rounded`}>{job.type}</span></CardDescription>
                           </CardHeader>
                           <CardContent className="flex justify-between items-center flex-grow">
                               <p className="">Salary: {job.salary}</p>
                           </CardContent>
                           <CardFooter className="flex justify-end">
                               <Button onClick={() => handleViewDetails(job.id)}>View Details</Button>
                           </CardFooter>
                    </Card>
                   )
                })}
            </section>
            <section>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
              <></>
              </DialogTrigger>
              <DialogContent>
              <DialogHeader>
                  <DialogTitle>Job Details</DialogTitle>
                  <DialogDescription>
                      <section className="mt-3">
                          {
                            jobDetails && (
                                  <>
                                      <div className="flex items-center gap-2">
                                          <Image
                                              src={companyLogo}
                                              width={40}
                                          />
                                          <div>
                                              <h1 className="text-black font-semibold">{jobDetails.title}</h1>
                                              <h2 className="text-xs">{jobDetails.company}</h2>
                                              <div className="flex items-center gap-3">
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span > <Briefcase className="w-4" /> </span>
                                                      <h3 className="capitalize text-black">{jobDetails.employmentType}</h3>
                                                  </div>
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span><Loader className="w-4" /></span>
                                                      <h3 className="capitalize text-black">{jobDetails.status}</h3>
                                                  </div>
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span > <Tag className="w-4" /> </span>
                                                      <h3 className="capitalize text-black">{jobDetails.salaryRange} Monthly</h3>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Job Description</h1>
                                          <p className="text-xs mt-1">{jobDetails.description}</p>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Requirements</h1>
                                          <p className="text-xs mt-1">{jobDetails.jobRequirements}</p>
                                      </div>
                                      <div className="mt-3 flex items-center justify-between">
                                          <div className="flex items-center gap-1">
                                              <h1>Designation:</h1> <span className="text-black">{jobDetails.designation}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                          <h1>Role:</h1> <span className="text-black capitalize">{jobDetails.role}</span>
                                          </div>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Deadline</h1>
                                          <p className="text-xs mt-1">{jobDetails.deadline?.toLocaleDateString()}</p>
                                      </div>
                                      
                                  </>
                            )
                          }
                      </section>
                  </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                  <Button variant='outline' onClick={closeDialog}>Close</Button>
                  <Button onClick={() => handleApply()}>Apply</Button>
              </DialogFooter>
              </DialogContent>
            </Dialog>
            </section>
        </div>
    );
};

export default JobListings;