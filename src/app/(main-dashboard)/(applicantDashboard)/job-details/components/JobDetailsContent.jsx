import ApplyForm from "./ApplyForm";

const JobDetailsContent = () => {
  return (
    <div className="mt-[30px]">
      {/* Job details content */}
      <section className="flex gap-3">
        {/* Job Overview & Job Skills */}
        <div className="flex-[2] ">
          {/* Job Overview */}
          <div className=" px-4 py-5 mb-[30px] shadow-md rounded-lg bg-white">
            <h1 className="text-xl mb-2.5 font-medium">Job Overview</h1>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span>Published On:</span>
                <span className="text-right text-[#696969]">
                  December 2, 2024
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Vacancy:</span>
                <span className="text-right text-[#696969]">05</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Experience:</span>
                <span className="text-right text-[#696969]">3 Year(s)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Job Location:</span>
                <span className="text-right text-[#696969]">New York, USA</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Degree Level:</span>
                <span className="text-right text-[#696969]">Bachelor's</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Field of Study:</span>
                <span className="text-right text-[#696969]">
                  Computer Science or related
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Job Status:</span>
                <span className="text-right px-2 py-1 text-sm rounded bg-green-200 text-green-500">
                  Open
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Deadline</span>
                <span className="text-right text-[#696969]">
                  December 15, 2024
                </span>
              </div>
              {/* Social icons for sharing job post */}
              {/* <div className="flex items-center justify-between text-sm">
                <span>Share Post</span>
                <div className="text-right">
                  <div>
                    <span>  </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* Job Skills */}
          <div className=" px-4 py-5 mb-[30px] shadow-md rounded-lg bg-white">
            <h1 className="text-xl mb-2.5 font-medium">Job Skills</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                HTML
              </span>
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                CSS
              </span>
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                JavaScript
              </span>
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                Reactjs
              </span>
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                Tailwind CSS
              </span>
              <span className="px-6 py-2 bg-[#f8f8f8] font-medium text-sm text-[#00ca99]">
                Framer Motion
              </span>
            </div>
          </div>

          {/* Company Overview */}
          <div className=" px-4 py-5 mb-[30px] shadow-md rounded-lg bg-white">
            <h1 className="text-xl mb-2.5 font-medium">Company Overview</h1>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span>Categories:</span>
                <span className="text-right text-[#696969]">
                  Software Development
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Established:</span>
                <span className="text-right text-[#696969]">2010</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Employees:</span>
                <span className="text-right text-[#696969]">86</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Location:</span>
                <span className="text-right text-[#696969]">New York, USA</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Phone Number:</span>
                <span className="text-right text-[#696969]">123 456 789</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Email:</span>
                <span className="text-right text-[#696969]">
                  codingagency@gmail.com
                </span>
              </div>
              {/* Social icons for sharing job post */}
              {/* <div className="flex items-center justify-between text-sm">
                <span>Share Post</span>
                <div className="text-right">
                  <div>
                    <span>  </span>
                  </div>
                </div>
              </div> */}
              <div>
                <p className="bg-[#e5faf5] py-2.5 px-[30px] text-[#00ca99] text-sm text-center font-medium cursor-pointer">
                  www.codingagency.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job description, key responsibilities, skills and experience */}
        <div className="flex-[4] px-3">
          <div className="border border-[#78AEB3] rounded-lg p-5">
            <h1 className="text-xl font-medium mb-4">Job Description</h1>
            <div className="space-y-4">
              <p className="text-[#696969] text-sm">
                We are seeking a creative Frontend Designer to craft engaging,
                user-friendly web interfaces. You'll transform design concepts
                into functional, responsive layouts using modern tools like
                HTML, CSS, and JavaScript. Collaborating with developers, you'll
                ensure pixel-perfect implementation while maintaining website
                performance and responsiveness across devices, creating visually
                stunning, user-centric digital experiences.
              </p>
              <p className="text-[#696969] text-sm">
                Join our dynamic team as a Frontend Designer, where you'll bring
                designs to life with precision and creativity. Your role
                involves developing responsive, visually appealing web
                interfaces using tools like Tailwind CSS and Figma. You'll
                collaborate closely with developers, optimizing for performance
                and user experience. Stay ahead of trends, contributing
                innovative ideas to enhance our digital presence and delight
                users.
              </p>
            </div>
          </div>
          <div className="mt-[30px] border border-[#78AEB3] rounded-lg p-5">
            <h1 className="text-xl font-medium mb-4">Key Responsibilities</h1>
            <ul className="px-6">
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Proficiency in HTML5, CSS3, JavaScript
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Expertise in design frameworks like Tailwind CSS, Bootstrap
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Experience with design tools like Figma, Adobe XD, or Sketch
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Familiarity with responsive design principles
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Basic understanding of JavaScript libraries (React, Vue, or
                Angular - optional but preferred)
              </li>
            </ul>
          </div>
          <div className="mt-[30px] border border-[#78AEB3] rounded-lg p-5">
            <h1 className="text-xl font-medium mb-4">Skills & Experience</h1>
            <ul className="px-6">
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                You have at least 3 years experience working as a Frontend
                Designer.
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                You have experience using Sketch and InVision or Framer Motion
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                You have some previous experience working in an agile
                environment - Think two-week sprints.
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                You are familiar using Jira and Confluence in your workflow
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Present your work to the wider business at Show & Tell sessions.
              </li>
            </ul>
          </div>
          <div className="mt-[30px] border border-[#78AEB3] rounded-lg p-5">
            <h1 className="text-xl font-medium mb-4">Benefits</h1>
            <ul className="px-6">
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Health Insurance
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Learning Opportunities
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Paid Time Off (PTO)
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Family & Lifestyle Support
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Recognition & Rewards
              </li>
              <li className="list-disc text-sm mb-[15px] text-[#696969]">
                Home office setup allowances
              </li>
            </ul>
          </div>
          {/* Apply Now button & apply form */}
          <ApplyForm />
        </div>
      </section>
    </div>
  );
};

export default JobDetailsContent;
