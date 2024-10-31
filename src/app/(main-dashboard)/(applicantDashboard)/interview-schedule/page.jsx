
"use client";

import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
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
import { Clock, Loader, Tag } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import companyLogo from '../../../../../public/assests/dummy-logo.png';
import logo from '../../../../../public/assests/h-logo.png';

// Interview list data
export const interviewList = [
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
      status: 'applied',
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
      status: 'shortlisted',
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
      status: 'Interview Scheduled',
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
      status: 'shortlisted',
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
      status: 'Interview Scheduled',
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
      status: 'Interview Scheduled',
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
      status: 'shortlisted',
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
      status: 'applied',
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
      status: 'applied',
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
      status: 'shortlisted',
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
      status: 'applied',
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
      status: 'shortlisted',
      details: 'QA engineer interview focusing on testing methodologies and automation tools.',
  },
];



const UpcomingInterviews = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
  
  const shortlisted = interviewList.filter(d => d.status === 'shortlisted');
  console.log(shortlisted)
  
  const [open, setOpen] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);
  const handleDetails = (id) => {
    const interviewDetailsData = interviewList.find(d => d.id === id);
    setInterviewDetails(interviewDetailsData);
    setOpen(true);  
  }
  const closeDialog = () => setOpen(false);

  
  return (
    <div>
       <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      {/* Ucoming interview cards */}
      <section className="grid grid-cols-1 gap-5">
        {
          shortlisted.map(data => (
            <Card key={data.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col">
      <CardContent className="p-4  rounded-t-lg flex-grow">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={120}
          />
          <div className="">
            <p className=" font-medium">{data.jobTitle} - {data.position}</p>
            <h2 className="text-sm text-gray-500 font-medium">{data.company}</h2>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-gray-500 text-sm">Interview Date</p>
            <p className="text-black text-sm font-medium">{data.date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Time</p>
            <p className="text-black text-sm font-medium">{data.time}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">Salary</p>
          <p className="text-black text-sm font-medium">{data.salary}</p>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">Description</p>
          <p className="text-black text-sm ">{data.details}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 border-t">
        <Button onClick={() => handleDetails(data.id)} className="">Details</Button>
      </CardFooter>
          </Card>
          ))
        }
      </section>

      {/* Interview details popup */}
      <section>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent>
          <DialogHeader>
                    <DialogTitle>Interview Details</DialogTitle>
                    <DialogDescription>
                        <section className="mt-3">
                            {
                                interviewDetails && (
                                    <>
                                      <div className="flex items-center gap-2">
                                            <Image
                                                src={companyLogo}
                                                width={40}
                                            />
                                            <div>
                                                <h1 className="text-black font-medium">{interviewDetails.title}</h1>
                                                <h2 className="text-xs">{interviewDetails.company}</h2>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span > <Clock className="w-4" /> </span>
                                                        <h3 className="capitalize text-black">{interviewDetails.time}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span><Loader className="w-4" /></span>
                                                        <h3 className="capitalize text-black">{interviewDetails.status}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span > <Tag className="w-4" /> </span>
                                                        <h3 className="capitalize text-black">{interviewDetails.salary} Monthly</h3>
                                                    </div>
                                                </div>
                                            </div>
                                      </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-medium">Job Description</h1>
                                            <p className="text-xs mt-1">{interviewDetails.details}</p>
                                        </div>
                                        
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <h1>Designation:</h1> <span className="text-black">{interviewDetails.position}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                            <h1>Role:</h1> <span className="text-black capitalize">{interviewDetails.role}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-medium">Interview Date</h1>
                                            <p className="text-xs mt-1">{interviewDetails.date}</p>
                                        </div>
                                        
                                    </>
                                )
                            }
                        </section>
                    </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeDialog}>Close</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
};

export default UpcomingInterviews;
