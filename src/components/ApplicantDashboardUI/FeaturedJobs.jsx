import Link from "next/link";
import { Button } from "../ui/button";
import JobCard from "./JobCard";

export const jobList = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Solutions",
    description:
      "We are looking for a Frontend Developer with expertise in React.js and TypeScript.",
    location: "Remote",
    salary: "$50,000 - $70,000/year",
    employmentType: "Full-time",
    experience: "2+ years in Frontend Development",
    skills: "React.js, TypeScript, Tailwind CSS",
    postedDate: "Dec 29, 2024",
    logo: "/assests/company.png",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Innovatech Labs",
    description:
      "Join our team as a Backend Engineer, focusing on building scalable APIs and services.",
    location: "San Francisco, CA",
    salary: "$80,000 - $100,000/year",
    employmentType: "Full-time",
    experience: "3+ years in Backend Development",
    skills: "Node.js, MongoDB, AWS",
    postedDate: "Dec 28, 2024",
    logo: "/assests/backend.png",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    description:
      "Design intuitive and visually appealing user interfaces for web and mobile applications.",
    location: "New York, NY",
    salary: "$60,000 - $85,000/year",
    employmentType: "Full-time",
    experience: "2+ years in UI/UX Design",
    skills: "Figma, Adobe XD, CSS",
    postedDate: "Dec 27, 2024",
    logo: "/assests/uiux.png",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Global Tech Systems",
    description:
      "Looking for a Full Stack Developer to work on end-to-end web solutions.",
    location: "Austin, TX",
    salary: "$90,000 - $120,000/year",
    employmentType: "Full-time",
    experience: "4+ years in Full Stack Development",
    skills: "React.js, Node.js, GraphQL",
    postedDate: "Dec 26, 2024",
    logo: "/assests/fullstack.png",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "NextGen Cloud",
    description:
      "Ensure smooth CI/CD pipelines and manage cloud infrastructure as a DevOps Engineer.",
    location: "Remote",
    salary: "$70,000 - $90,000/year",
    employmentType: "Full-time",
    experience: "3+ years in DevOps",
    skills: "Docker, Kubernetes, Azure",
    postedDate: "Dec 25, 2024",
    logo: "/assests/devops.png",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Data Insights Inc.",
    description:
      "Analyze and interpret complex data to drive business insights as a Data Scientist.",
    location: "Chicago, IL",
    salary: "$100,000 - $130,000/year",
    employmentType: "Full-time",
    experience: "3+ years in Data Science",
    skills: "Python, Machine Learning, SQL",
    postedDate: "Dec 24, 2024",
    logo: "/assests/datascientist.png",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="mt-6">
      <div>
        <h1 className="text-xl font-semibold mb-3">Featured Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobList.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Link href={"/job-search"}>
            <Button>See All Jobs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
