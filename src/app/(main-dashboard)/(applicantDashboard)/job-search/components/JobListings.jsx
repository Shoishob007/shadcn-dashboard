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
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Jobs data static 
const demoJobs = [
    { id: 1, title: "Frontend Developer", company: "Rokomari", location: "Dhaka", type: "Full-Time", salary: "60,000 BDT" },
    { id: 2, title: "Full Stack Developer", company: "Bit Software Solutions", location: "Dhaka", type: "Contract", salary: "75,000 BDT" },
    { id: 3, title: "Backend Developer", company: "Qzency", location: "Remote", type: "Part-Time", salary: "50,000 BDT" },
    { id: 4, title: "React Developer", company: "EchoLogyx", location: "Chittagong", type: "Full-Time", salary: "70,000 BDT" },
    { id: 5, title: "Node.js Developer", company: "Aykori Digital", location: "Remote", type: "Internship", salary: "30,000 BDT" },
    { id: 6, title: "UI/UX Designer", company: "Mediusware", location: "Sylhet", type: "Full-Time", salary: "65,000 BDT" },
    { id: 7, title: "Software Engineer", company: "Rocket Systems", location: "Dhaka", type: "Contract", salary: "80,000 BDT" },
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
    
    return (
        <div>
            <div>
                <Input 
                    type="text" 
                    placeholder="Search for Job..."
                    onChange={handleSearch}
                    value={searchTerm}
                    className='bg-white'

                />
            </div>
            <section className='grid grid-cols-3 gap-4 mt-4'>
                {filteredJobs.map((job) => (
                     <Card key={job.id} className="shadow-lg border rounded-lg flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">{job.title} at {job.company}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">{job.location} - {job.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center flex-grow">
                            <p className="text-lg font-semibold text-green-600">Salary: {job.salary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Apply Now</Button>
                        </CardFooter>
                 </Card>
                ))}
            </section>
        </div>
    );
};

export default JobListings;