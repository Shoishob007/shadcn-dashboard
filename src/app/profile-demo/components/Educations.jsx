"use client";
import { Pencil, X, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateEducation from "./UpdateEducation";
import { useSession } from "next-auth/react";

const Educations = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [fosData, setFosData] = useState([]);
    const { data: session } = useSession();
    const accessToken = session?.access_token;

  // Fetch Degree Levels & Fields of Study (FOS)
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const [degreeRes, fosRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);
        const degreeData = await degreeRes.json();
        const fosData = await fosRes.json();
        setDegreeLevels(degreeData?.docs || []);
        setFosData(fosData?.docs || []);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducationData();
  }, []);

  // Load Data from Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem("educationData");
    if (storedData) {
      setEducationData(JSON.parse(storedData));
    }
  }, [isEditing]); // যখন এডিটিং শেষ হবে, তখন আপডেট হবে

  // ID থেকে টাইটেল খুঁজে বের করা
  const getDegreeTitle = (id) =>
    degreeLevels.find((d) => d.id === id)?.title || "Degree Level not selected";

  const getFOSTitle = (id) =>
    fosData.find((fos) => fos.id === id)?.title ||
    "Field of Study not selected";

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200 shadow-md p-6">
      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <GraduationCap
                className="text-gray-600 dark:text-gray-300"
                size={22}
              />
              Educations
            </h1>
            <div
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <span>{isEditing ? <X size={15} /> : <Pencil size={15} />}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The Education section is your opportunity to share your academic
            background.
          </p>
        </div>

        {/* Degree Level & Field of Study Title List */}
        <div className="mt-6">
          {isEditing ? (
            <UpdateEducation />
          ) : educationData ? (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {getDegreeTitle(educationData.degreeLevel)}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getFOSTitle(educationData.fieldOfStudy)}
              </p>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-4">
              No education details added yet.
            </div>
          )}
        </div>

        {/* All Degree Levels List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Available Degrees:
          </h3>
          <ul className="mt-2 space-y-2">
            {degreeLevels.length > 0 ? (
              degreeLevels.map((degree) => (
                <li
                  key={degree.id}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  - {degree.title}
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No degree levels found.
              </p>
            )}
          </ul>
        </div>

        {/* All Fields of Study List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Available Fields of Study:
          </h3>
          <ul className="mt-2 space-y-2">
            {fosData.length > 0 ? (
              fosData.map((fos) => (
                <li
                  key={fos.id}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  - {fos.title}
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No fields of study found.
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Educations;
