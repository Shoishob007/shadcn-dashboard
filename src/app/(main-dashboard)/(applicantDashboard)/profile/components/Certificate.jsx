import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Certificate = () => {
  return (
    <div>
      <div className="flex justify-between mb-[14px]">
        <h1>Certificate</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
