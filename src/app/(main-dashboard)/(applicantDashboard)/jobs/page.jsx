import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import facebookCover from "../../../../../public/assests/facebook-banner.png";
import hiringPic from "../../../../../public/assests/hiring.jpg";

const JobsPage = () => {
  return (
    <section className="w-full md:w-[1024px] my-12 mx-auto bg-white dark:bg-gray-800 rounded-lg">
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
            <div className="flex items-center gap-1">
              <p className="m-0 text-xs">John Kamal</p>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div>
                <p className="text-xs">December 24, 2024 at 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Job Title: Full Stack Developer</p>
          <div className="mt-4">
            <p className="font-medium text-sm">Salary:</p>
            <span className="text-sm">30,000 - 40,000 BDT</span>
          </div>
          <div className="mt-4">
            <p className="font-medium text-sm">Location:</p>
            <span className="text-sm">
              Remote (Must be based in Bangladesh)
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-sm">Responsibilites:</h3>
            <ul className="pl-4 mt-1">
              <li className="list-disc text-sm">
                Design & develop websites and web applications
              </li>
              <li className="list-disc text-sm">
                Ensure UI/UX designs are technically feasible
              </li>
              <li className="list-disc text-sm">
                Optimize applications for speed & scalability
              </li>
              <li className="list-disc text-sm">
                Implement and optimize CI/CD pipelines using GitHub Actions
              </li>
              <li className="list-disc text-sm">
                Implement a user-friendly and visually appealing design based on
                the provided wireframes or design assets.
              </li>
              <li className="list-disc text-sm">
                Implement dynamic routing and handle SEO metadata for all pages
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-sm">Requirements:</h3>
            <ul className="pl-4 mt-1">
              <li className="list-disc text-sm">
                Strong knowledge of React.js and its principle.
              </li>
              <li className="list-disc text-sm">Knowledge about Sanity.io</li>
              <li className="list-disc text-sm">Git and Github,</li>
              <li className="list-disc text-sm">GraphQL (nice to have)</li>
              <li className="list-disc text-sm">
                Freshers are encouraged to apply!
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-medium text-sm">How to Apply:</p>
            <Button variant="link">
              <Link className="text-sm" href={"/job-details"}>
                Click Here
              </Link>
            </Button>
          </div>

          <div className="mt-4 w-full">
            <Image
              src={hiringPic}
              width={480}
              height={280}
              alt="hiring picture"
              className="w-full h-[420px]"
            />
          </div>

          <div className="mx-3 py-2 pl-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <span className="bg-[#1A7BFF] w-5 h-5 rounded-full flex items-center justify-center relative left-1 border border-white">
                  <ThumbsUp className="text-white" size={14} />
                </span>
                <span className="bg-[#FC4C51] w-5 h-5 rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={14} />
                </span>
              </div>
              <div>
                <p className="text-sm">
                  Md Waliullah, Mehedi Hasan and 132 others
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">18 comments</span>
              <span className="text-sm">9 shares</span>
            </div>
          </div>
          <div className="border-t border-b flex items-center justify-around py-2">
            <div className="flex items-center gap-1">
              <span>
                {" "}
                <ThumbsUp size={18} />
              </span>
              <span className="text-sm font-medium">Like</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                {" "}
                <MessageCircle size={18} />
              </span>
              <span className="text-sm font-medium">Comment</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 448 512"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </span>
              <span className="text-sm font-medium">Send</span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <Share2 size={18} />
              </span>
              <span className="text-sm font-medium">Share</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsPage;
