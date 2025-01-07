import { Badge } from "@/components/ui/badge";
import DashboardCardSection from "./DashboardCardSection";
import FeaturedJobs from "./FeaturedJobs";
import RecentApplied from "./RecentApplied";

const ApplicantDashboardPage = ({ currentRole, session }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-2xl">Welcome!</span>{" "}
        <h1 className="font-medium text-2xl">{session?.user?.name || 'Emam Jion'}</h1>{" "}
        <Badge>{currentRole}</Badge>
      </div>
      <section className="mt-6">
        <DashboardCardSection />
        <RecentApplied/>
        <FeaturedJobs />
      </section>
    </>
  );
};

export default ApplicantDashboardPage;
