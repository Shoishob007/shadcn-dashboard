import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";

const JobSearchCard = ({ job }) => {
  const {orgName, title, location,  skills, employeeType, salary, img} = job;
  
  return (
    <Link href={`/job-search/${job.id}`} className="">
      <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
            <span>{orgName.slice(0,1)}</span>
          </div>
          <div>
              <h1 className="text-[15px] font-medium">{orgName}</h1>
              <p className="text-xs">{location}</p>
          </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="text-[17px] font-semibold">{title}</h1>
            <span className={`text-xs font-semibold capitalize ${employeeType === 'full-time' ? 'text-[#20c997]' : employeeType === 'contractual' ? 'text-[#ffc107]' : employeeType === 'part-time' ? 'text-[#6610f2]' : 'text-black'}`}>{employeeType}</span>
            <div className="flex items-center gap-1 flex-wrap mt-2 text-sm">
              {
                skills.map((skill, i) => <span className="text-sm" key={i}>{skill},</span>)
              }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <div><span className="font-bold">${salary}</span><span className="text-sm">/month</span></div>
          </div>
            <Button size='sm'>View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobSearchCard;
