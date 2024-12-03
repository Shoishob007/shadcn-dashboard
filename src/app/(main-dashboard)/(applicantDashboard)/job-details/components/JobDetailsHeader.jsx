import PageTitle from "@/components/PageTitle";
import {
  Bookmark,
  BriefcaseBusinessIcon,
  CircleDollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import companyLogo from "../../../../../../public/assests/company.png";

const JobDetailsHeader = () => {
  return (
    <div>
      <div>
        <PageTitle title={"Job Details"} className={"ml-2"} />
        {/* Job details header */}
        <section className="mt-4 bg-white shadow-md rounded-md px-5 flex justify-between">
          {/* left content - Job Info */}
          <div className="py-5 px-4 flex gap-3 items-center">
            <div>
              <Image src={companyLogo} alt="company logo" width={80} />
            </div>
            <div>
              {/* Job type | Employee Type | Location type -> Remote/Onsite */}
              <div className="space-x-4 mb-4">
                <span className="py-1.5 px-4 bg-[#e5faf5] text-[#00ca99] text-xs font-medium rounded-[50px]">
                  Full Time
                </span>
                <span className="py-1.5 px-4 bg-[#ffefed] text-[#ff5b4a] text-xs font-medium rounded-[50px]">
                  Permanent
                </span>
                <span className="py-1.5 px-4 bg-[#ffedf6] text-[#ff4aa1] text-xs font-medium rounded-[50px]">
                  Remote
                </span>
              </div>

              {/* Job Title */}
              <div className="mb-2.5">
                <h1 className="text-xl font-medium">Frontend Designer</h1>
              </div>

              {/* Company name | Job  posted countdate */}
              <div className="mb-3 flex items-center gap-2.5">
                <div>
                  <h4 className="text-[#00ca99] text-[17px]">Coding Agency</h4>
                </div>
                <div className="flex gap-1 items-center">
                  <span>
                    <Clock size={16} />
                  </span>
                  <span className="text-[#696969] text-sm">Posted 1 Weaks Ago</span>
                </div>
              </div>

              {/* Category | location | Salary */}
              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <span>
                    <BriefcaseBusinessIcon size={16} />
                  </span>
                  <div>
                    <span className="text-[#696969] text-sm">Category:</span>
                    <span className="ml-2">IT & Telecomunication</span>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span>
                    <MapPin size={16} />
                  </span>
                  <div>
                    <span className="text-[#696969] text-sm">Location:</span>
                    <span className="ml-2">Hicks St Brooklyn, NY</span>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span>
                    <CircleDollarSign size={16} />
                  </span>
                  <div>
                    <span className="text-[#696969] text-sm">Salary:</span>
                    <span className="ml-2">$20 - $30 Per Hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmark Icon1 */}
          <div className="py-5 px-4 ">
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer"><Bookmark size={20} /></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetailsHeader;
