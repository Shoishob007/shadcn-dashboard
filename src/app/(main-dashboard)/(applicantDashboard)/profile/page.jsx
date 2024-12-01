import ProfileInfo from "./components/ProfileInfo";
import { Separator } from "@/components/ui/separator"
import ProfileInputFiled from "./components/ProfileInputFiled";


const ProfilePage = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">My Profile!</h1>
        <section className="mt-10 bg-white shadow-lg p-6">
          <ProfileInfo />
          <Separator className='my-[30px] bg-[#f3f3f3]' />
          <ProfileInputFiled/>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
