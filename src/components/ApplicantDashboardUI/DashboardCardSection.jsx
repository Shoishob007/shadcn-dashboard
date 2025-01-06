"use client"
import { Briefcase, CircleX, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CountUp from "react-countup";
// import ScrollTrigger from "react-scroll-trigger";

export default function DashboardCardSection() {
  const router = useRouter();
  const [counterOn, setCounterOn] = useState(false);

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
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full">
              <div className="w-full flex flex-col gap-5">
                <section className="flex items-center justify-between ">
                  <h3 className="text-sm dark:text-gray-200">
                    Applied Job
                  </h3>
                  <div className="text-gray-500">
                    <Briefcase className="h-6 w-6 text-gray-400" />
                  </div>
                </section>
                <section className="text-2xl font-semibold dark:text-gray-200">
                  <CountUp start={0} end={7} duration={2} delay={1} />
                </section>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleCardClick("Shortlisted")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full">
              <div className="w-full flex flex-col gap-5">
                <section className="flex items-center justify-between ">
                  <h3 className="text-sm dark:text-gray-200">
                    Shortlisted
                  </h3>
                  <div className="text-gray-500">
                    <Heart className="h-6 w-6 text-gray-400" />
                  </div>
                </section>
                <section className="text-2xl font-semibold dark:text-gray-200">
                  <CountUp start={0} end={3} duration={2} delay={1} />
                </section>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleCardClick("Rejected")}
            className="flex-1 cursor-pointer"
          >
            <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm hover:border hover:border-black transition-shadow duration-300 w-full">
              <div className="w-full flex flex-col gap-5">
                <section className="flex items-center justify-between ">
                  <h3 className="text-sm dark:text-gray-200">
                    Rejected
                  </h3>
                  <div className="text-gray-500">
                    <CircleX className="h-6 w-6 text-gray-400" />
                  </div>
                </section>
                <section className="text-2xl font-semibold dark:text-gray-200">
                  <CountUp start={0} end={2} duration={2} delay={1} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
