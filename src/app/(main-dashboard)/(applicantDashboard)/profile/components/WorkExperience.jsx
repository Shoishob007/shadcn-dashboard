import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const WorkExperience = () => {
  return (
    <section>
      <div className="flex justify-between mb-[14px]">
        <h1>Work Experience</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
    </section>
  );
};

export default WorkExperience;
