
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { jobs } from "./applicantJobData";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentAppliedCard from "./RecentAppliedCard";

const RecentApplied = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.access_token;
      const [application, setApplication] = useState([]);
  
    useEffect(() => {
    const getJobApplications = async () => {
      if (status !== "authenticated" || !accessToken) {
        console.error("Access Token Missing or Session not authenticated!");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?limit=3`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApplication(data.docs);
        // console.log("Job data:: ", data);
      } catch (error) {
        console.log("Error fetching job applications:: ", error.message);
      }
    };
    getJobApplications();
  }, [accessToken, status]);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-center">Recent Applied</h1>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {application.map((app) => <RecentAppliedCard key={app.id} app={app} />)}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Link href={"/my-applications"}>
            <Button size="sm">See All Applications</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RecentApplied;
