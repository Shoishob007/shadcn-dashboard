import { Briefcase, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

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
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Applied Job
                </h3>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
              <div className="text-gray-500">
                <Briefcase className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div
            onClick={() => handleCardClick("Shortlisted")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Shortlisted
                </h3>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
              <div className="text-gray-500">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
