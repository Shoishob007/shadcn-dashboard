"use client"

import { ToggleGroup } from "@/components/ui/toggle-group";
import { useState } from "react";

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState("applied");

  const handleToggleChange = (value) => {
    setSelectedTab(value);
  };

  return (
    <div>
      <div className="my-applications">
        <h1 className="text-xl font-bold mb-4">My Applications</h1>
        <ToggleGroup
          options={[
            { label: "Applied", value: "applied" },
            { label: "Shortlisted", value: "shortlisted" },
            { label: "Rejected", value: "rejected" },
          ]}
            selectedValue={selectedTab}
            onChange={handleToggleChange}
        />

        <div className="content mt-4">
          {selectedTab === "applied" && <h1>Applied</h1>}
          {selectedTab === "shortlisted" && <h1>Shortlisted</h1>}
          {selectedTab === "rejected" && <h1>Rejected</h1>}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
