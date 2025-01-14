import profileLogo from '../../../../../../public/assests/profile-pic.jpg';
import Image from "next/image";

const ProfileOverview = () => {
  return (
    <div className=" p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        {/* Profile Section */}
        <div className="flex gap-4 items-center mb-6">
          {/* Profile Picture */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={profileLogo}
              alt="Profile Picture"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          {/* Name and Title */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">
              Frontend Developer | 2 Years Experience
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="mailto:johndoe@example.com"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            📧 Email
          </a>
          <a
            href="https://linkedin.com/in/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            🔗 LinkedIn
          </a>
          <a
            href="https://johndoeportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            🌐 Portfolio
          </a>
        </div>

        {/* Short Bio */}
        <p className="text-sm text-gray-700 mb-4">
          Passionate frontend developer skilled in building responsive web
          applications using modern technologies. Eager to learn and innovate.
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">15</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">2</p>
            <p className="text-sm text-gray-500">Years Experience</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">5</p>
            <p className="text-sm text-gray-500">Certifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
