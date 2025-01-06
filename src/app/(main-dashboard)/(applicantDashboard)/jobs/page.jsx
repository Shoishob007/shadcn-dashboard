import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import facebookCover from "../../../../../public/assests/facebook-banner.png";
import Link from "next/link";

const JobsPage = () => {
  return (
    <section className="w-[1024px] mt-12 mx-auto bg-white dark:bg-gray-800 rounded-lg">
      {/* first section */}
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          {/* image section */}
          <div className="relative">
            <Image
              src={facebookCover}
              alt="cover"
              width={56}
              height={56}
              className="rounded-lg"
            />
            <div className="absolute top-2 left-6">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <h1 className="m-0 text-sm font-medium">Hub.js</h1>
            <div className="flex items-center gap-2">
              <p className="m-0 text-xs">John Kamal</p>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div>
                <p className="text-xs">December 24, 2024 at 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div>
            <p>Job Title: Full Stack Developer</p>
            <div>
                <p>Salary:</p>
                <span>30,000 - 40,000 BDT</span>
            </div>
            <div>
                <p>Location:</p>
                <span>Remote (Must be based in Bangladesh)</span>
            </div>
            <div>
                <h3>Responsibilites:</h3>
                <ul>
                    <li>Design & develop websites and web applications</li>
                    <li>Ensure UI/UX designs are technically feasible</li>
                    <li>Optimize applications for speed & scalability</li>
                    <li>Implement and optimize CI/CD pipelines using GitHub Actions</li>
                    <li>Implement a user-friendly and visually appealing design based on the provided wireframes or design assets.
                    </li>
                    <li>Implement dynamic routing and handle SEO metadata for all pages</li>
                </ul>
            </div>
            <div>
                <h3>Requirements:</h3>
                <ul>
                    <li>Strong knowledge of React.js and its principle.</li>
                    <li>Knowledge about Sanity.io
                    </li>
                    <li>Git and Github,</li>
                    <li>GraphQL (nice to have)
                    </li>
                    <li>Freshers are encouraged to apply!
                    </li>
                </ul>
            </div>
            <div>
                <p>How to Apply:</p>
                <Link href={'/job-details'}>Click Here</Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default JobsPage;
