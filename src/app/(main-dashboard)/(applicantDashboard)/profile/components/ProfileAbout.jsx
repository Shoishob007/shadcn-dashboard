import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

const paragraphStyle = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const ProfileAbout = () => {
  const [isParagraphOpen, setIsParagraphOpen] = useState(false);
  const [showReadMoreBtn, setShowReadMoreBtn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    // console.log(ref.current.scrollHeight, ref.current.clientHeight);
    if (ref.current) {
      setShowReadMoreBtn(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  return (
    <section className="">
      <div>
        <div className="flex items-center justify-between mb-[14px]">
          <h1>About</h1>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <Pencil size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
        <div>
          <p
            style={isParagraphOpen ? null : paragraphStyle}
            className="text-xs text-[#383838] dark:text-gray-300"
            ref={ref}
          >
            I&apos;m Emam Khalid Jion, a self-employed MERN Stack Developer with a
            passion for crafting dynamic, scalable, and user-friendly web
            applications. Over the past two years, I&apos;ve honed my skills in
            React.js, Next.js, and modern web technologies, focusing on creating
            seamless front-end designs and robust back-end solutions. I love
            tackling challenges and constantly learning new things to keep up
            with the ever-evolving tech world. From building e-commerce
            platforms to service-based and food-ordering websites like Bitewave,
            my projects reflect my dedication to quality and innovation. Coding
            isn&apos;t just my profession—it&apos;s my passion, and I&apons;m always excited to
            take on new opportunities that allow me to grow and contribute to
            impactful projects.
          </p>
          {showReadMoreBtn && (
            <span
              onClick={() => setIsParagraphOpen(!isParagraphOpen)}
              className="text-blue-600 text-xs hover:underline cursor-pointer"
            >
              {isParagraphOpen ? "Read less" : "Read more"}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileAbout;
