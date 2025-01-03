import { Badge } from "@/components/ui/badge";
import DashboardCardSection from "./DashboardCardSection";
import FeaturedJobs from "./FeaturedJobs";
import LatestJobApplied from "./LatestJobApplied";

const ApplicantDashboardPage = ({ currentRole, session }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-2xl">Welcome!</span>{" "}
        <h1 className="font-medium text-2xl">{session?.user?.name}</h1>{" "}
        <Badge>{currentRole}</Badge>
      </div>
      <section className="mt-6">
        <DashboardCardSection />
        <LatestJobApplied />
        <FeaturedJobs />
      </section>
    </>
  );
};

export default ApplicantDashboardPage;
