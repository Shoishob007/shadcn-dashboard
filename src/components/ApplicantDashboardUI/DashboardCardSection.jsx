import { Briefcase, CircleX, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";

export default function DashboardCardSection() {
  const router = useRouter();

  const handleCardClick = (tabName) => {
    router.push(`/my-applications?tab=${tabName}`);
  };

  return (
    <div>
      <div>
        <div className="flex gap-4">
          <div
            onClick={() => handleCardClick("Applied")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
              <div className="w-full">
                <div className="flex items-center justify-between ">
                  <h3 className="text-sm text-gray-600">
                    Applied Job
                  </h3>
                  <div className="text-gray-500">
                    <Briefcase size={18} />
                  </div>
                </div>
                <div className="text-2xl text-gray-800">
                  <CountUp start={0} end={7} duration={2} delay={1} />
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleCardClick("Shortlisted")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
              <div className="w-full">
                <div className="flex items-center justify-between ">
                  <h3 className="text-sm text-gray-600">
                    Shortlisted
                  </h3>
                  <div className="text-gray-500">
                    <Heart size={18} />
                  </div>
                </div>
                <div className="text-3xl text-gray-800">
                  <CountUp start={0} end={3} duration={2} delay={1} />
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleCardClick("Rejected")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
              <div className="w-full">
                <div className="flex items-center justify-between ">
                  <h3 className="text-sm text-gray-600">
                    Rejected
                  </h3>
                  <div className="text-gray-500">
                    <CircleX size={18} />
                  </div>
                </div>
                <div className="text-3xl text-gray-800">
                  <CountUp start={0} end={2} duration={2} delay={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
