"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/break/test3?status=applied"
        className="block p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
      >
        <h2 className="text-lg font-semibold">All Applied</h2>
        <p>View all your applied jobs</p>
      </Link>

      <Link
        href="/my-application?status=shortlisted"
        className="block p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
      >
        <h2 className="text-lg font-semibold">Shortlisted</h2>
        <p>View jobs where you are shortlisted</p>
      </Link>

      <Link
        href="/my-application?status=rejected"
        className="block p-4 border rounded-md bg-gray-200 hover:bg-gray-300"
      >
        <h2 className="text-lg font-semibold">Rejected</h2>
        <p>View rejected job applications</p>
      </Link>
    </div>
  );
};

export default HomePage;
