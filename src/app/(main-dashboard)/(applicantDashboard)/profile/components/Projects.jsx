import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Projects = () => {
  return (
    <section>
      <div className="flex justify-between">
        <h1>Projects</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
      <div>
        <p className="text-[#727272] text-xs">
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
