import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

const UpdateProjects = () => {
  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div>
        <div className="mb-4 space-y-2">
          <label htmlFor="projectName" className="block text-xs">
            Project Name <span className="text-red-500">*</span>
          </label>
          <Input type="text" placeholder="Project name" />
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-xs ">
            Project Type <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 flex gap-4">
            <button className="py-2 px-4 border rounded-md text-xs font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              Full Time
            </button>
            <button className="py-2 px-4 border rounded-md text-xs font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              Part Time
            </button>
            <button className="py-2 px-4 border rounded-md text-xs font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              Freelance
            </button>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-xs">Project Duration</label>
          <div className="mt-1 flex items-center gap-4">
            <Input
              type="date"
              className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <Input
              type="date"
              className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-2 flex items-center justify-end">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Ongoing</span>
            </label>
          </div>
        </div>

        <div className="mb-4 space-y-2.5">
          <label htmlFor="projectDescription" className="block text-xs">
            Project Description
          </label>
          <Textarea
            id="projectDescription"
            rows="6"
            placeholder="Detail the project you worked on..."
          ></Textarea>
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-xs">Link this Project</label>
          <Input type="text" />
        </div>
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button className="px-4 py-2">
          <Check /> Save
        </Button>
      </div>
    </section>
  );
};

export default UpdateProjects;
