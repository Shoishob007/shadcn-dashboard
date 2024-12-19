"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function ToggleTabsExample() {
  const [activeTab, setActiveTab] = useState("applied");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">My Applications</h1>

      {/* Toggle Group as Tabs */}
      <ToggleGroup
        type="single"
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex gap-4 mb-6"
      >
        <ToggleGroupItem
          value="applied"
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === "applied"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Applied
        </ToggleGroupItem>
        <ToggleGroupItem
          value="shortlisted"
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === "shortlisted"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Shortlisted
        </ToggleGroupItem>
        <ToggleGroupItem
          value="rejected"
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === "rejected"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Rejected
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "applied" && (
          <p>List of applied jobs will be displayed here.</p>
        )}
        {activeTab === "shortlisted" && (
          <p>List of shortlisted jobs will be displayed here.</p>
        )}
        {activeTab === "rejected" && (
          <p>List of rejected jobs will be displayed here.</p>
        )}
      </div>
    </div>
  );
}
