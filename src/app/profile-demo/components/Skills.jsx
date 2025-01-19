import { Pencil } from "lucide-react";

const Skills = () => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">Skills</h1>
            <p className="text-sm text-muted-foreground">
              The Skills section is your opportunity to share your skills.
            </p>
          </div>
          <div className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
            <span className="">
              <Pencil size={15} />
            </span>
          </div>
        </div>

        {/* skills content */}
        <div>
          <h1>Skills Content</h1>
        </div>
      </div>
    </section>
  );
};

export default Skills;
