"use client";
import OurPagination from "@/components/Pagination";
import { useState } from "react";
import ComboBox from "./components/ComboBox";

const jobs = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    companyName: "Google",
    location: "Remote",
    employmentType: "Full-Time",
    jobCategory: "Software Development",
    salary: "$5,000 - $6,000",
    deadline: "December 31, 2024",
    skills: ["React.js", "JavaScript", "CSS"],
    description:
      "We are looking for a passionate frontend developer to join our team and build amazing web experiences.",
    logo: "/assets/google.png",
    jobStatus: "Open",
    experience: "2+ years",
  },
  {
    id: 2,
    jobTitle: "UI/UX Designer",
    companyName: "Netflix",
    location: "California, USA",
    employmentType: "Part-Time",
    jobCategory: "Design",
    salary: "$4,500 - $5,000",
    deadline: "January 15, 2025",
    skills: ["Figma", "Sketch", "Prototyping"],
    description:
      "Join our design team to create stunning user interfaces and enhance user experiences.",
    logo: "/assets/netflix.png",
    jobStatus: "Open",
    experience: "3+ years",
  },
  {
    id: 3,
    jobTitle: "Backend Engineer",
    companyName: "Amazon",
    location: "Seattle, USA",
    employmentType: "Full-Time",
    jobCategory: "Software Development",
    salary: "$7,000 - $8,000",
    deadline: "December 20, 2024",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "We need a backend engineer to help us scale and improve our server infrastructure.",
    logo: "/assets/amazon.png",
    jobStatus: "Closed",
    experience: "3+ years",
  },
  {
    id: 4,
    jobTitle: "Marketing Manager",
    companyName: "Facebook",
    location: "New York, USA",
    employmentType: "Contractual",
    jobCategory: "Marketing",
    salary: "$6,000 - $7,000",
    deadline: "January 5, 2025",
    skills: ["SEO", "Campaign Management", "Analytics"],
    description:
      "We are hiring a marketing manager to lead our campaigns and boost our online presence.",
    logo: "/assets/facebook.png",
    jobStatus: "Pending",
    experience: "5+ years",
  },
  {
    id: 5,
    jobTitle: "Mobile App Developer",
    companyName: "Spotify",
    location: "Remote",
    employmentType: "Freelance",
    jobCategory: "Software Development",
    salary: "$4,000 - $5,000",
    deadline: "February 10, 2025",
    skills: ["Flutter", "React Native", "API Integration"],
    description:
      "Develop innovative and user-friendly mobile applications for millions of music lovers worldwide.",
    logo: "/assets/spotify.png",
    jobStatus: "Open",
    experience: "2+ years",
  },
  {
    id: 6,
    jobTitle: "Data Scientist",
    companyName: "IBM",
    location: "Texas, USA",
    employmentType: "Full-Time",
    jobCategory: "Data Analysis",
    salary: "$8,000 - $10,000",
    deadline: "January 20, 2025",
    skills: ["Python", "Machine Learning", "SQL"],
    description:
      "Analyze complex datasets and create predictive models to drive business decisions.",
    logo: "/assets/ibm.png",
    jobStatus: "Closed",
    experience: "4+ years",
  },
  {
    id: 7,
    jobTitle: "Product Manager",
    companyName: "Apple",
    location: "California, USA",
    employmentType: "Full-Time",
    jobCategory: "Management",
    salary: "$9,000 - $11,000",
    deadline: "December 25, 2024",
    skills: ["Product Strategy", "Agile", "Leadership"],
    description:
      "Lead cross-functional teams to design and launch groundbreaking products for global audiences.",
    logo: "/assets/apple.png",
    jobStatus: "Open",
    experience: "6+ years",
  },
  {
    id: 8,
    jobTitle: "Content Writer",
    companyName: "HubSpot",
    location: "Remote",
    employmentType: "Part-Time",
    jobCategory: "Content Creation",
    salary: "$2,500 - $3,000",
    deadline: "February 1, 2025",
    skills: ["SEO Writing", "Research", "Creativity"],
    description:
      "Craft engaging blog posts, articles, and website content to attract and retain readers.",
    logo: "/assets/hubspot.png",
    jobStatus: "Pending",
    experience: "1+ years",
  },
  {
    id: 9,
    jobTitle: "DevOps Engineer",
    companyName: "Slack",
    location: "Remote",
    employmentType: "Full-Time",
    jobCategory: "Operations",
    salary: "$7,500 - $8,500",
    deadline: "January 30, 2025",
    skills: ["AWS", "Docker", "Kubernetes"],
    description:
      "Automate and streamline infrastructure to support high-availability systems for millions of users.",
    logo: "/assets/slack.png",
    jobStatus: "Open",
    experience: "3+ years",
  },
  {
    id: 10,
    jobTitle: "Graphic Designer",
    companyName: "Adobe",
    location: "New York, USA",
    employmentType: "Full-Time",
    jobCategory: "Design",
    salary: "$5,000 - $6,500",
    deadline: "January 10, 2025",
    skills: ["Photoshop", "Illustrator", "Creativity"],
    description:
      "Create visually stunning designs that elevate branding and marketing efforts.",
    logo: "/assets/adobe.png",
    jobStatus: "Closed",
    experience: "4+ years",
  },
  {
    id: 11,
    jobTitle: "Cybersecurity Analyst",
    companyName: "Cisco",
    location: "Remote",
    employmentType: "Full-Time",
    jobCategory: "Security",
    salary: "$6,000 - $7,500",
    deadline: "February 15, 2025",
    skills: ["Network Security", "Penetration Testing", "SIEM Tools"],
    description:
      "Protect critical systems and networks from threats while ensuring data integrity.",
    logo: "/assets/cisco.png",
    jobStatus: "Open",
    experience: "3+ years",
  },
  {
    id: 12,
    jobTitle: "Digital Marketing Specialist",
    companyName: "Twitter",
    location: "San Francisco, USA",
    employmentType: "Full-Time",
    jobCategory: "Marketing",
    salary: "$5,500 - $6,500",
    deadline: "January 25, 2025",
    skills: ["PPC Campaigns", "Social Media Ads", "Analytics"],
    description:
      "Plan and execute marketing campaigns to drive user engagement and growth.",
    logo: "/assets/twitter.png",
    jobStatus: "Pending",
    experience: "2+ years",
  },
];

const EducationPage = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const filteredJobs = jobs.filter((job) => {
  //   return (
  //     (filters.location ? job.location.includes(filters.location) : true) &&
  //     (filters.employmentType
  //       ? job.employmentType.includes(filters.employmentType)
  //       : true) &&
  //     (filters.jobCategory
  //       ? job.jobCategory.includes(filters.jobCategory)
  //       : true)
  //   );
  // });

  // const jobsPerPage = 6;
  // const indexOfLastJob = currentPage * jobsPerPage;
  // const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  return (
    <div>
      <ComboBox />
      <ComboBox />
      <ComboBox />
      <ComboBox />
      <ComboBox />
      <ComboBox />

      {/* <div className="my-24">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.length === 0 ? (
            <p>No jobs found based on your filters.</p>
          ) : (
            currentJobs.map((job) => <JobSearchCard key={job.id} job={job} />)
          )}
        </div>
      </div>

      <OurPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default EducationPage;
