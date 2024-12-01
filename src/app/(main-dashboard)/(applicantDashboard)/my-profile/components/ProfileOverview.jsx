import AboutInfoSection from "./AboutInfoSection";
import Socials from "./Socials";
import { TopSkills } from "./TopSkills";

const ProfileOverview = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Top Skills container */}
      <div className=" bg-white shadow rounded-md">
        <h1 className="text-lg font-medium pt-[21px] px-[26.5px] pb-[17px] text-[#312a2a]">
          Top Skills
        </h1>
        <div className="px-[26.5px] pb-[26.5px]">
          <TopSkills />
        </div>
      </div>
      {/* About container */}
      <div>
        <AboutInfoSection />
      </div>
      {/* Socials container */}
      <div className="">
        <Socials />
      </div>
    </section>
  );
};

export default ProfileOverview;
