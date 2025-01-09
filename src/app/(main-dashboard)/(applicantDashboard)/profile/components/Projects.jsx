import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Projects = () => {
  return (
    <section>
      <div className="flex justify-between">
        <h1>Projects</h1>
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
        <p className="text-[#727272] dark:text-gray-300 text-xs">
          Showcase your projects to the world and unlock the doors to your
          professional success!
        </p>
        <div className="mt-2">
          <Button variant="ghost" className="text-sm">
            Add Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
