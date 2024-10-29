"use client";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
    );
}
