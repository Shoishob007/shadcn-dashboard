"use client"

import React, { useState } from "react";

// Sample job data
const initialJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "Epic Coders",
    type: "hourly",
    typeColor: "green",
    rate: 55,
    skills: ["UI", "UX", "photoshop"],
    extraSkills: 4,
    description:
      "We are looking for an experience UI and UX designer to work on our new projects...",
  },
  {
    id: 2,
    title: "Branding Expert",
    company: "Hubstaff",
    type: "part-time",
    typeColor: "yellow",
    rate: 32,
    skills: ["PHP", "android", "iOS"],
    extraSkills: 2,
    description:
      "Looking for an experienced person to help us with rebranding our business. We are interested in a...",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "TechNova",
    type: "full-time",
    typeColor: "blue",
    rate: 45,
    skills: ["React", "Tailwind", "TypeScript"],
    extraSkills: 3,
    description:
      "Seeking a talented frontend developer to join our team and help build responsive web applications...",
  },
];

const JobCard = ({ job }) => {
  const typeColorMap = {
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    red: "bg-red-400",
  };

  const typeColor = typeColorMap[job.typeColor] || "bg-gray-400";

  return (
    <div className="bg-white rounded-lg shadow-md flex-1 transition-all hover:shadow-lg flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <div
            className={`${typeColor} text-white text-sm font-medium py-1 px-3 rounded-full`}
          >
            {job.type}
          </div>
          <div className="text-gray-800 font-semibold">${job.rate} / hr</div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {job.title}
        </h2>

        <div className="flex items-center mb-4">
          <svg
            className="w-4 h-4 text-blue-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v2H7V5zm6 4H7v2h6V9zm-6 4h6v2H7v-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-blue-400 text-sm">{job.company}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
          {job.extraSkills > 0 && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              +{job.extraSkills}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-5 flex-grow">
          {job.description}
        </p>
      </div>

      <button className="text-gray-700 font-medium text-sm uppercase tracking-wider border-t w-full p-3 hover:text-blue-500 transition-colors mt-auto">
        VIEW JOB
      </button>
    </div>
  );
};

const DynamicJobCards = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: "hourly",
    typeColor: "green",
    rate: 0,
    skills: [],
    extraSkills: 0,
    description: "",
  });
  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setNewJob({
        ...newJob,
        skills: [...newJob.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleSubmit = () => {
    if (newJob.title && newJob.company && newJob.rate > 0) {
      setJobs([...jobs, { ...newJob, id: Date.now() }]);
      setNewJob({
        title: "",
        company: "",
        type: "hourly",
        typeColor: "green",
        rate: 0,
        skills: [],
        extraSkills: 0,
        description: "",
      });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showForm ? "Cancel" : "Add New Job"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. UI/UX Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={newJob.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Epic Coders"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  name="type"
                  value={newJob.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="hourly">Hourly</option>
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type Color
                </label>
                <select
                  name="typeColor"
                  value={newJob.typeColor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="rate"
                  value={newJob.rate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 55"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extra Skills
                </label>
                <input
                  type="number"
                  name="extraSkills"
                  value={newJob.extraSkills}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 4"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newJob.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="e.g. React"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md transition-colors"
                >
                  Add Skill
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded-md"
                placeholder="Brief job description..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Job
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicJobCards;
