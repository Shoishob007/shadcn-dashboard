import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import profileImg from "../../../../public/assests/profile-pic.jpg";
const ProfileHeader = ({ profileData = [] }) => {
  console.log("profile Basic Details: ", profileData);

  // Destructuring applicant object
  const {
    email = "Not Available",
    id,
    phone = "123 456 789",
    address = "420 City Path, AU 123-456",
  } = profileData?.applicant || [];

  return (
    <div>
      {profileData?.map((data) => (
        <div key={data.id} className="flex gap-4">
          <Image
            src={profileImg}
            alt="photo"
            width={163}
            height={163}
            className="rounded-2xl border-4 border-white object-cover profile-img"
          />
          <div>
            <h1 className="text-xl font-semibold">{data?.name}</h1>
            <h4 className="mb-3 text-sm">
              {data?.designation === null
                ? "Frontend Designer"
                : data?.designation}
            </h4>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-sm">
                <span>
                  <Mail size={15} />
                </span>
                <span>{data?.applicant?.email}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>
                  <Phone size={15} />
                </span>
                <span>{data?.phone === null ? phone : data?.phone}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>
                  <MapPin size={15} />
                </span>
                <span>{data?.address === null ? address : data?.address}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm max-w-[560px] text-gray-400">
                A creative and detail-oriented Frontend Developer with a strong
                focus on user experience and design aesthetics. Dedicated to
                crafting visually appealing, responsive, and user-friendly
                interfaces that enhance engagement. 
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileHeader;
