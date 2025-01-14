import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import DashboardCardSection from "./DashboardCardSection";
import FeaturedJobs from "./FeaturedJobs";
import RecentApplied from "./RecentApplied";

const ApplicantDashboardPage = ({ currentRole, session }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="mt-6">
        <DashboardCardSection />
        <RecentApplied />
        <FeaturedJobs />
      </section>
    </>
  );
};

export default ApplicantDashboardPage;
