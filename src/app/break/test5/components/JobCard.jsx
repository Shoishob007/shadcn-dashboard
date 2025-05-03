// JobCard.jsx
import { Check, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
// import companyLogo from "../../../../../public/assests/companyLogo.png";

const JobCard = ({ job, handleApply }) => {
  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-4 bg-white  ">
      <div className="group cursor-pointer flex items-center justify-center px-2 mb-3">
        <div className="relative h-16 w-16">
          {/* <Image
            src={companyLogo}
            alt={job.companyName}
            width={64}
            height={64}
            className="group-hover:scale-105 transition rounded-full object-contain"
          /> */}
        </div>
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>
          {job.jobType} • {job.location}
        </p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {job.position}
        </p>
        <p className="text-indigo-500 font-medium">{job.companyName}</p>

        <div className="flex items-center gap-0.5 my-2">
          {Array(5)
            .fill("")
            .map((_, i) =>
              job.companyRating > i ? (
                <Star key={i} size={14} fill="#615fff" color="#615fff" />
              ) : (
                <Star
                  key={i}
                  size={14}
                  fill="#615fff"
                  color="#615fff"
                  fillOpacity={0.35}
                />
              )
            )}
          <p>({job.companyRating.toFixed(1)})</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-base text-sm font-medium text-indigo-500">
            ${job.salaryRange.min}k - ${job.salaryRange.max}k
          </p>
          <div className="text-indigo-500">
            {!job.applied ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium hover:bg-indigo-200 transition-colors"
                onClick={() => handleApply(job.id)}
              >
                <ShoppingCart size={14} />
                Apply
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1 md:w-20 w-16 h-[34px] bg-green-500/25 rounded select-none">
                <Check size={14} className="text-green-600" />
                <span className="text-green-600 font-medium">Applied</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
