"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const ApplicationCards = ({
  application,
  applications,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  //   const { data: session } = useSession();
  //   const accessToken = session?.access_token;

  //   useEffect(() => {
  //     const getOrganization = async () => {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${application?.jobDetails?.job?.organization}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       console.log("Response :: ", response);
  //     };

  //     getOrganization();
  //   }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {application.map((app, index) => {
          //   const date = app.deadline;
          //   const formattedDate = format(date, "MMM dd, yyyy");
          return (
            <div key={index}>
              <Link href={`/my-applications/${app.id}`}>
                <Card className="w-full hover:border hover:border-black duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 font-medium bg-gray-200 rounded-full flex items-center justify-center">
                        <span>
                          {app.orgName ? app.orgName.slice(0, 1) : "Un"}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-[15px] font-medium">
                          {app.jobDetails.job.organization
                            ? app.jobDetails.job.organization
                            : "Organization not found"}
                        </h1>
                        <p className="text-xs">
                          {app.jobDetails.address
                            ? app.location
                            : "Location not found"}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h1 className="text-[17px] font-semibold">
                        {app.jobDetails.job.title}
                      </h1>
                      <div className="flex items-center mt-3 gap-3">
                        <span
                          className={`text-xs font-semibold capitalize ${
                            app.employeeType === "full-time"
                              ? "text-[#20c997]"
                              : app.employeeType === "contractual"
                              ? "text-[#ffc107]"
                              : app.employeeType === "part-time"
                              ? "text-[#6610f2]"
                              : "text-black"
                          }`}
                        >
                          {app.employeeType}
                        </span>
                        <span className="text-xs font-medium">
                          {app.yearOfExperience}{" "}
                          {app.yearOfExperience === 1 ? "year" : "years"}
                        </span>
                        {/* <span className="text-xs font-medium">{jobType}</span> */}
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs">
                            Applied on:{" "}
                            <span className="font-medium">Date: {app.id}</span>
                          </span>
                          <span
                            className={`text-xs lowercase font-medium p-1 rounded-md ${
                              app.status === "Applied"
                                ? "text-blue-500 bg-blue-100"
                                : app.status === "Shortlisted"
                                ? "text-yellow-500 bg-yellow-100"
                                : "text-red-500 bg-red-100"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      <div>
                        <span className="font-bold">
                          ${app.jobDetails.salary}
                        </span>
                        <span className="text-sm">/month</span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationCards;
