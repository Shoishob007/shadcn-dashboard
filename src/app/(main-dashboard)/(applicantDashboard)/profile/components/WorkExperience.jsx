import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const WorkExperience = () => {
  return (
    <section>
      <div className="flex justify-between">
        <h1>Work Experience</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
      <div>
        <p className="text-[#727272] dark:text-gray-300 text-xs">
          Highlight your work experience to showcase your skills and build a
          strong foundation for future opportunities!
        </p>
        <div className="mt-2">
          <Button variant="ghost" className="text-sm">
            Add Work Experience
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
