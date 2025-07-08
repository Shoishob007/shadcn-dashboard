"use client";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Bookmark } from "lucide-react";
import { useState } from "react";

const JobCard = () => {
  const job = {
    company: "TechHive Ltd.",
    logo: "T",
    logoColor: "bg-gray-200 text-white",
    timeAgo: "2 days ago",
    title: "Frontend Developer (React.js)",
    tags: ["React", "JavaScript", "Tailwind CSS", "REST API"],
    salary: "$1000 - $1500",
    location: "Dhaka, Bangladesh",
    saved: false,
  };

  const {
    company,
    logo,
    logoColor,
    timeAgo,
    title,
    tags,
    salary,
    location,
    saved: initialSaved,
  } = job;

  const [saved, setSaved] = useState(initialSaved);

  const handleSaveToggle = () => {
    setSaved(!saved);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4 bg-gray-100" />

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4 bg-gray-100" />

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4 bg-gray-100" />

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <CardContent className="p-6">
          {/* Header with logo and save button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${logoColor}`}
              >
                {logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company}</h3>
                <p className="text-sm text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className={`h-8 px-3 text-sm ${
                saved
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {saved ? (
                <>
                  <Bookmark className="w-3 h-3 mr-1 fill-current" />
                  onsite
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3 mr-1" />
                  remote
                </>
              )}
            </Button>
          </div>

          {/* Job title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-normal px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4 bg-gray-100" />

          {/* Footer with salary, location and apply button */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">{salary}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Apply now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCard;
