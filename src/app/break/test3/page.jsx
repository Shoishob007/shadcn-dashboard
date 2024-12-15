import AboutMe from "./components/AboutMe";

const ProfileAbout = () => {
  return (
    <div>
      <h1 className="text-sm font-semibold text-gray-800 mb-1.5">About Me</h1>
      <p className="text-xs text-gray-600">
        Maximum 1000 characters can be added
      </p>
      <div>
        <AboutMe />
      </div>
    </div>
  );
};

export default ProfileAbout;
