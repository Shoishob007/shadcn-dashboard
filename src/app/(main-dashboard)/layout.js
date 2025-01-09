"use client";

export default function MainDashboardLayout({ children }) {
  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
