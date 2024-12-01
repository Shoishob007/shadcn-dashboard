import { Separator } from "@/components/ui/separator";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";

const ProfileDemo = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold">My Profile!!</h1>
      <section className="mt-6 bg-white p-4 shadow-lg rounded-md">
        {/* Profile Header */}
        <ProfileHeader />
        <section className="my-8">
          <Separator />
        </section>
        <section>
          <ProfileTabs />
        </section>
      </section>
    </div>
  );
};

export default ProfileDemo;
