import { Briefcase, DollarSign, MapPin } from "lucide-react";

const JobDetailsInfo = () => {
  return (
    <section className="bg-white shadow-md p-4">
      <div>
        {/* job description */}
        <div>
            <h1 className="font-medium mb-1.5">Description</h1>
            <div className="text-sm space-y-2">
                <p>
                    We are seeking a creative Frontend Designer to craft engaging, user-friendly web interfaces. You'll transform design concepts into functional, responsive layouts using modern tools like HTML, CSS, and JavaScript. Collaborating with developers, you'll ensure pixel-perfect implementation while maintaining website performance and responsiveness across devices, creating visually stunning, user-centric digital experiences.
                </p>
                <p>
                    Join our dynamic team as a Frontend Designer, where you'll bring designs to life with precision and creativity. Your role involves developing responsive, visually appealing web interfaces using tools like Tailwind CSS and Figma. You'll collaborate closely with developers, optimizing for performance and user experience. Stay ahead of trends, contributing innovative ideas to enhance our digital presence and delight users.
                </p>
            </div>
        </div>

        {/* job location, type and salary range */}
        <div className="flex items-center gap-6 mt-6">
            <div className="h-32 w-40 p-6 bg-gray-100 flex items-center justify-center flex-col rounded-md">
                <span><Briefcase size={16}/></span>
                <span>Full Time</span>
            </div>
            <div className="h-32 w-40 p-6 bg-gray-100 flex items-center justify-center flex-col rounded-md">
                <span><MapPin size={16}/></span>
                <span>Chicago</span>
                <span>(Remote)</span>
            </div>
            <div className="h-32 w-40 p-6 bg-gray-100 flex items-center justify-center flex-col rounded-md">
                <span><DollarSign size={16} /></span>
                <span>120k - 150k</span>
            </div>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
            <h1 className="font-medium mb-1.5">Qualifications</h1>
            <ul className="px-6">
                <li className="list-disc text-sm ">Proficiency in HTML5, CSS3, JavaScript</li>
                <li className="list-disc text-sm ">Expertise in design frameworks like Tailwind CSS, Bootstrap</li>
                <li className="list-disc text-sm ">Experience with design tools like Figma, Adobe XD, or Sketch</li>
                <li className="list-disc text-sm ">Familiarity with responsive design principles</li>
                <li className="list-disc text-sm ">Basic understanding of JavaScript libraries (React, Vue, or Angular - optional but preferred)</li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsInfo;
