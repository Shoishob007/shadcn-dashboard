"use client";

import { InlineWidget } from "react-calendly";

const CalendlyForm = () => {
  return (
    <div className="custom-calendly-container">
      <InlineWidget
        url="https://calendly.com/shoishob554"
        styles={{
          height: "580px",
          minWidth: "320px",
        }}
      />
    </div>
  );
};

export default CalendlyForm;