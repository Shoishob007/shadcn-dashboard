"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // PhoneInput styles import
import applicantPhoto from "../../../../../../../public/assests/applicant.png";

const BasicDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-5">
        Basic Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center">
          <Image
            src={applicantPhoto}
            width={140}
            height={140}
            alt="applicant photo"
            className="rounded-full"
          />
          <div className="w-full">
            <div className="flex gap-5">
              <div className="w-full md:w-1/2 space-y-1">
                <label className="mb-2.5 text-xs" htmlFor="firstname">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder=""
                  defaultValue="Emam"
                  {...register("firstname", { required: true })}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-1">
                <label className="mb-2.5 text-xs" htmlFor="lastname">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder=""
                  defaultValue="Khalid Jion"
                  {...register("lastname", { required: true })}
                />
              </div>
            </div>
            <div className="space-y-1 mt-1">
              <label className="mb-2.5 text-xs" htmlFor="username">
                Username
              </label>
              <Input
                type="text"
                placeholder=""
                defaultValue="emamjion88"
                {...register("username", { required: true })}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-1 mt-1">
            <label className="mb-2.5 text-xs" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              placeholder=""
              defaultValue="emamjion@gmail.com"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-1 mt-3">
            <label className="mb-2.5 text-xs" htmlFor="mobile">
              Mobile
            </label>
            <PhoneInput
              country="bd"
              value={getValues("contact")}
              onChange={(value) => setValue("contact", value)}
              inputProps={{
                name: "contact",
                required: true,
                autoFocus: true,
              }}
              containerStyle={{
                width: "100%",
              }}
              inputStyle={{
                border: "1px solid #e5e5e5",
                width: "100%",
              }}
              buttonStyle={{
                width: "45px",
              }}
            />
            {errors.contact && (
              <p className="text-red-500 text-xs">Contact is required</p>
            )}
          </div>
          <div className="space-y-1 mt-1">
            <label className="mb-2.5 text-xs" htmlFor="location">
              Location
            </label>
            <Input
              type="text"
              placeholder=""
              defaultValue=""
              {...register("location", { required: true })}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-5">
          <Button type="submit" className="px-4 py-2">
            <Check />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
