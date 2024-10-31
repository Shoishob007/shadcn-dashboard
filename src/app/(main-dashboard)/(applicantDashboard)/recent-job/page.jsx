"use client";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
                        className='bg-white'

                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {filteredJobs.map((job) => {
                        const statusBgColor = job.status === 'open' ? "bg-green-200 text-green-600" : job.status === 'closed' ? "bg-red-200 text-red-600" : "bg-black text-white"
                        return (
                            <Card key={job.id} className="shadow-lg border rounded-lg flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">{job.jobTitle} at {job.company}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600">{job.location} - <span className={`${statusBgColor} p-1 rounded`}>{job.status}</span> - <span>{job.jobType}</span></CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center flex-grow">
                                    <p className="font-semibold">Salary: {job.salary}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button>View Details</Button>
                                </CardFooter>
                     </Card>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

export default RecentJobPostings;