"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const ProfileField = ({ profileData, data }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const { id } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    // console.log(value);

    const profileInfo = {
      name: value.name,
      phone: value.phone,
      email: value.email,
      //   designation: value.designation,
      applicantBloodGroup: value.applicantBloodGroup,
    };
    console.log("profile info: ", profileInfo);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(profileInfo),
        }
      );
      const profileResponse = await response.json();
      console.log("profile response data: ", profileResponse);
    } catch (error) {
      console.log("Error in Profile info: ", error.message);
    }
  };
  //   console.log(id);
  //   console.log("Profile field : ", data);

  //   useEffect(() => {
  //     const setProfileData = async () => {
  //       const response = await fetch(
  //         `${NEXT_PUBLIC_API_URL}/api/applicants/${id}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //     };
  //     setProfileData();
  //   }, [id, accessToken]);
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              defaultValue="Emam Jion"
              className="mt-2.5"
              {...register("name")}
            />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              type="text"
              defaultValue="Frontend Designer"
              className="mt-2.5"
              {...register("designation")}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              defaultValue="123 456 789"
              className="mt-2.5"
              {...register("phone")}
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="demo@example.com"
              className="mt-2.5"
              {...register("email")}
            />
          </div>
          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              type="text"
              defaultValue="1 Year"
              className="mt-2.5"
              //   {...register("experiences")}
            />
          </div>
          <div>
            <Label htmlFor="blood-group">Blood Group</Label>
            <Input
              id="blood-group"
              type="text"
              defaultValue="B+"
              className="mt-2.5"
              {...register("applicantBloodGroup")}
            />
          </div>
          <div>
            <Label htmlFor="education">Highest Education</Label>
            <Input
              id="education"
              type="text"
              defaultValue="B.Sc"
              className="mt-2.5"
              //   {...register("educations")}
            />
          </div>
        </div>
        <div className="mt-6">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="w-full mt-2.5 px-5 py-4 rounded-lg border bg-[#f0f5f7] text-[#696969] text-sm"
            rows="5"
            defaultValue="A creative and detail-oriented Frontend Developer with a strong focus on user experience and design aesthetics. Dedicated to crafting visually appealing, responsive, and user-friendly interfaces that enhance engagement. Skilled in turning ideas into functional web solutions while maintaining a commitment to delivering quality and meeting project goals effectively."
          ></textarea>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileField;
