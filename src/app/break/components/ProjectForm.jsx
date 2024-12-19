const ProjectForm = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>

      {/* Project Name */}
      <div className="mb-4">
        <label
          htmlFor="projectName"
          className="block text-sm font-medium text-gray-700"
        >
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="projectName"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Project name"
        />
      </div>

      {/* Project Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Type <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex gap-4">
          <button className="py-2 px-4 border rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            Full Time
          </button>
          <button className="py-2 px-4 border rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            Part Time
          </button>
          <button className="py-2 px-4 border rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            Freelance
          </button>
        </div>
      </div>

      {/* Project Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Duration
        </label>
        <div className="mt-1 flex items-center gap-4">
          <input
            type="date"
            className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <input
            type="date"
            className="block w-1/2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-500 shadow-sm focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Ongoing</span>
          </label>
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <label
          htmlFor="projectDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Project Description
        </label>
        <textarea
          id="projectDescription"
          rows="4"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Detail the project you worked on..."
        ></textarea>
      </div>

      <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </div>
  );
};

export default ProjectForm;
