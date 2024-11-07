"use client";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
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
import { BriefcaseBusiness, Clock, DollarSign, Loader, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from '../../../../../public/assests/h-logo.png';

// recent jobs data
export const jobs = [
    {
        id: 1,
        date: '2024-10-30',
        time: '10:00 AM',
        company: 'GoProgs Technologies Pvt. Ltd.',
        jobTitle: 'Frontend Developer',
        position: 'Junior Developer',
        role: 'Frontend Development',
        salary: '50,000 BDT', // Monthly salary
        deadline: '2024-10-28',
        status: 'open',
        location : 'Dhaka',
        jobType: 'full-time',
        details: 'Interview for the frontend developer position, focusing on React.js and Tailwind CSS proficiency.',
    },
    {
        id: 2,
        date: '2024-11-05',
        time: '02:00 PM',
        company: 'Rocket Systems',
        jobTitle: 'React.js Developer',
        position: 'Mid-Level Developer',
        role: 'Frontend Development',
        salary: '58,333 BDT', // Monthly salary
        deadline: '2024-11-02',
        status: 'open',
        location : 'Khulna',
        jobType: 'full-time',
        details: 'React.js developer interview focusing on advanced JavaScript and component-based architecture.',
    },
    {
        id: 3,
        date: '2024-11-10',
        time: '11:00 AM',
        company: 'Bit Software Solutions Ltd.',
        jobTitle: 'Full Stack Developer',
        position: 'Senior Developer',
        role: 'Full Stack Development',
        salary: '75,000 BDT', // Monthly salary
        deadline: '2024-11-07',
        status: 'open',
        location : 'Dhaka',
        jobType: 'full-time',
        details: 'Full-stack role involving both backend (Node.js) and frontend (React.js) development tasks.',
    },
    {
        id: 4,
        date: '2024-11-12',
        time: '09:00 AM',
        company: 'Tech Innovations',
        jobTitle: 'Software Engineer',
        position: 'Entry-Level Developer',
        role: 'Software Development',
        salary: '45,833 BDT', // Monthly salary
        deadline: '2024-11-10',
        status: 'closed',
        jobType: 'full-time',
        location: 'Dhaka',
        details: 'Interview focusing on problem-solving skills and knowledge of programming fundamentals.',
    },
    {
        id: 5,
        date: '2024-11-15',
        time: '03:30 PM',
        company: 'Creative Solutions Co.',
        jobTitle: 'UI/UX Designer',
        position: 'Mid-Level Designer',
        role: 'Design',
        salary: '54,167 BDT', // Monthly salary
        deadline: '2024-11-13',
        status: 'open',
        location : 'Dhaka',
        jobType: 'contractual',
        details: 'UI/UX design interview emphasizing user-centered design principles and portfolio review.',
    },
    {
        id: 6,
        date: '2024-11-20',
        time: '01:00 PM',
        company: 'Dev Team Ltd.',
        jobTitle: 'DevOps Engineer',
        position: 'Senior Engineer',
        role: 'DevOps',
        salary: '70,833 BDT', // Monthly salary
        deadline: '2024-11-18',
        status: 'open',
        location : 'Dhaka',
        jobType: 'contractual',
        details: 'DevOps interview focusing on CI/CD processes and cloud infrastructure management.',
    },
    {
        id: 7,
        date: '2024-11-25',
        time: '10:30 AM',
        company: 'NextGen Technologies',
        jobTitle: 'Data Analyst',
        position: 'Junior Analyst',
        role: 'Data Analysis',
        salary: '41,667 BDT', // Monthly salary
        deadline: '2024-11-23',
        status: 'closed',
        location : 'Chittagong',
        jobType: 'contractual',
        details: 'Data analyst interview focusing on data interpretation and visualization skills.',
    },
    {
        id: 8,
        date: '2024-11-28',
        time: '04:00 PM',
        company: 'Global Tech Solutions',
        jobTitle: 'Project Manager',
        position: 'Senior Manager',
        role: 'Project Management',
        salary: '79,167 BDT', // Monthly salary
        deadline: '2024-11-26',
        status: 'closed',
        location : 'Sylhet',
        jobType: 'full-time',
        details: 'Project management interview emphasizing leadership skills and project lifecycle knowledge.',
    },
    {
        id: 9,
        date: '2024-12-01',
        time: '11:00 AM',
        company: 'WebWorks Agency',
        jobTitle: 'Backend Developer',
        position: 'Mid-Level Developer',
        role: 'Backend Development',
        salary: '62,500 BDT', // Monthly salary
        deadline: '2024-11-29',
        status: 'open',
        location : 'Sylhet',
        jobType: 'part-time',
        details: 'Backend developer interview focusing on Node.js and database management.',
    },
    {
        id: 10,
        date: '2024-12-05',
        time: '09:30 AM',
        company: 'Innovatech',
        jobTitle: 'Mobile Developer',
        position: 'Junior Developer',
        role: 'Mobile Development',
        salary: '54,167 BDT', // Monthly salary
        deadline: '2024-12-03',
        status: 'open',
        location : 'Rajshahi',
        jobType: 'part-time',
        details: 'Mobile development interview focusing on Flutter and cross-platform development skills.',
    },
    {
        id: 11,
        date: '2024-12-10',
        time: '02:30 PM',
        company: 'CloudCorp',
        jobTitle: 'Cloud Architect',
        position: 'Senior Architect',
        role: 'Cloud Solutions',
        salary: '83,333 BDT', // Monthly salary
        deadline: '2024-12-08',
        status: 'closed',
        location : 'Chittagong',
        jobType: 'full-time',
        details: 'Cloud architect interview emphasizing design of scalable cloud infrastructures.',
    },
    {
        id: 12,
        date: '2024-12-15',
        time: '10:00 AM',
        company: 'Smart Innovations',
        jobTitle: 'QA Engineer',
        position: 'Mid-Level Engineer',
        role: 'Quality Assurance',
        salary: '58,333 BDT', // Monthly salary
        deadline: '2024-12-13',
        status: 'open',
        location : 'Khulna',
        jobType: 'part-time',
        details: 'QA engineer interview focusing on testing methodologies and automation tools.',
    },
  ];

const RecentJobPostings = () => {
    const pathname = usePathname();
    const pageTitle = FormatTitle(pathname);

    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filtered = jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm)
        );
        setFilteredJobs(filtered);
    };

    
    const handleDetails = (id) => {
        const jobDetailsData = jobs.find(d => d.id === id);
        setJobDetails(jobDetailsData);
        setOpen(true);  
      }
      const closeDialog = () => setOpen(false);
    return (
        <div>
            <PageTitle title={pageTitle} className={"pb-4 ml-2"} />

            {/* recent job postings content */}
            <section>
                <div>
                    <Input 
                        type="text" 
                        placeholder="Search for Job..."
                        onChange={handleSearch}
                        value={searchTerm}
                        className='bg-white dark:bg-gray-800'

                    />
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    {filteredJobs.map((job) => {
                        const statusBgColor = job.status === 'open' ? "bg-green-200 text-green-600" : job.status === 'closed' ? "bg-red-200 text-red-600" : "bg-black text-white"
                        return (
                            <Card key={job.id} className="p-4 shadow-lg border rounded-lg flex flex-col">
                                <CardContent className="">
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <Image
                                                src={logo}
                                                alt="logo"
                                                width={120}
                                            />
                                            <div>
                                                <div className="font-semibold text-lg">
                                                    <span>{job.jobTitle}</span>, <span>{job.company}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center gap-1 dark:text-gray-200">
                                                        <span> <MapPin strokeWidth={0.5} /> </span>
                                                        <span className="text-gray-600 dark:text-gray-200">{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 dark:text-gray-200">
                                                        <span > <BriefcaseBusiness strokeWidth={0.5} className="dark:text-gray-200" /> </span>
                                                        <span className="text-gray-600 dark:text-gray-200">{job.jobType}</span>
                                                    </div>
                                                    <div className="">
                                                        <button className={`${statusBgColor} py-0.5 px-2 rounded`}>{job.status}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-gray-400 dark:text-gray-200 text-sm ">{job.details}</p>
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <span className="text-gray-400 mr-2 dark:text-gray-200">Position:</span> 
                                                    <span>{job.position}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400 dark:text-gray-200 mr-2">Role:</span> 
                                                    <span>{job.role}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-3">
                                                <span><DollarSign strokeWidth={0.5} /></span>
                                                <span className="dark:text-gray-200">{job.salary}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Button onClick={() => handleDetails(job.id)}>View Details</Button>
                                    </div>
                                </CardContent>
                     </Card>
                        )
                    })}
                </div>
            </section>
            
            <section>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
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
                                                src={logo}
                                                width={40}
                                            />
                                            <div>
                                                <h1 className="text-black dark:text-gray-200 font-semibold">{jobDetails.title}</h1>
                                                <h2 className="text-xs">{jobDetails.company}</h2>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 mt-2 dark:text-gray-200">
                                                        <span > <Clock className="w-4" /> </span>
                                                        <h3 className="capitalize text-black dark:text-gray-200">{jobDetails.time}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-2 dark:text-gray-200">
                                                        <span><Loader className="w-4" /></span>
                                                        <h3 className="capitalize text-black dark:text-gray-200">{jobDetails.status}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span > <Tag className="w-4" /> </span>
                                                        <h3 className="capitalize text-black">{jobDetails.salary} Monthly</h3>
                                                    </div>
                                                </div>
                                            </div>
                                      </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-medium">Job Description</h1>
                                            <p className="text-xs mt-1">{jobDetails.details}</p>
                                        </div>
                                        
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <h1>Designation:</h1> <span className="text-black">{jobDetails.position}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                            <h1>Role:</h1> <span className="text-black capitalize">{jobDetails.role}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-medium">Interview Date</h1>
                                            <p className="text-xs mt-1">{jobDetails.date}</p>
                                        </div>
                                        
                                    </>
                                )
                            }
                        </section>
                    </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={closeDialog}>Close</Button>
            <Button onClick={closeDialog}>Apply now</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
        </div>
    );
};

export default RecentJobPostings;