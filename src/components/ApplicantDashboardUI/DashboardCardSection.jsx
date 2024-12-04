import { Bookmark, Briefcase, Heart } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashboardCardSection() {
  return (
    <div className="">
      <div className=" px-4">
        <div className="flex gap-6">
          <DashboardCard
            title="Applied Jobs"
            count="5"
            icon={<Briefcase className="h-8 w-8" />}
          />
          <DashboardCard
            title="Saved Jobs"
            count="0"
            icon={<Bookmark className="h-8 w-8" />}
          />
          <DashboardCard
            title="Shortlisted Jobs"
            count="2"
            icon={<Heart className="h-8 w-8" />}
          />
        </div>
      </div>
    </div>
  );
}
