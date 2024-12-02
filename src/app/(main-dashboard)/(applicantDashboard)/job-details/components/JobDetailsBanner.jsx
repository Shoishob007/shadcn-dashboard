import { Bookmark } from "lucide-react";
import Image from "next/image";
import companyLogo from "../../../../../../public/assests/company.png";

const JobDetailsBanner = () => {
  return (
    <div className="job-details-banner">
      <div className="p-4 flex justify-between">
        <h1 className="text-white text-sm">Job Detail</h1>
        <div className="backdrop-blur bg-muted/50 h-8 w-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-muted/60 duration-300">
          <span className="text-white">
            <Bookmark size={20} />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        {/* company info */}
        <div className="flex items-center">
          <div className="">
            <Image
              src={companyLogo}
              alt="company logo"
              height={80}
              width={80}
              // className="w-full"
            />
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold">
              Frontend Designer
            </h1>
            <p className="text-sm text-gray-300">Streamo Ltd.</p>
          </div>
        </div>
        <div>
          <button className="px-4 py-2.5 bg-slate-100 text-xs rounded-md font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsBanner;
