import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Resume = () => {
  return (
    <section>
      <div className="flex justify-between">
        <h1>Resume</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
      <div>
        <p className="text-[#727272] text-xs">
          Add your resume to present your qualifications and make a lasting
          impression on potential employers!
        </p>
        <div className="mt-2">
          <Button variant="ghost" className="text-sm">
            Add Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Resume;
