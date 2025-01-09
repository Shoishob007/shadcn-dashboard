import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Skills = ({ profileInfo }) => {
  return (
    <section>
      <div className="flex justify-between mb-[14px]">
        <h1>Skills</h1>
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
        {profileInfo.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-4">
              {item.skills.map((skill) => {
                return (
                  <div className="" key={skill.id}>
                    <span className="border border-[#383838] dark:border-gray-300 px-3 py-1.5 text-sm text-[#383838] dark:text-gray-300 rounded-[30px]">
                      {skill.title}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
