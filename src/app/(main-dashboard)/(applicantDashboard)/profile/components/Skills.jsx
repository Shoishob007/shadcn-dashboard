import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Skills = ({ profileInfo }) => {
  return (
    <section>
      <div className="flex justify-between mb-[14px]">
        <h1>Skills</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
      <div>
        {profileInfo.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-4">
              {item.skills.map((skill) => {
                return (
                  <div className="" key={skill.id}>
                    <span className="border border-[#383838] px-3 py-1.5 text-sm text-[#383838] rounded-[30px]">
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
