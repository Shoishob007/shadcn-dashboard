import { Pencil } from "lucide-react";

const Projects = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Projects</h1>
        <div className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
          <span className="">
            <Pencil size={15} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
