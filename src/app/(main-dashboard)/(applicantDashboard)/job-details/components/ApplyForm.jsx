"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ApplicantResumeUpload from "./ApplicantResumeUpload";

const ApplyForm = ({ setAppliedStatus, appliedStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Uploaded File:", data.resume[0]);
    console.log(data);
    reset();
    setIsOpen(false);
    setHasApplied(true);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Applied Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
  };

  const pathname = usePathname();
  const jobDetailsPageFixed = pathname.includes('/job-details');

  return (
    <div className="mt-[30px] flex items-center justify-end ">
      <Dialog onOpenChange={setIsOpen} open={isOpen} className="">
        <DialogTrigger>
          <div className={jobDetailsPageFixed ? "fixed bottom-8 right-40" : "fixed bottom-8 right-14"}>
            {hasApplied ? (
              <Button disabled={hasApplied}>Applied</Button>
            ) : (
              <>
                <Button>
                  Apply Now
                  <SendHorizontal size={16} />
                </Button>
              </>
            )}
          </div>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="px-6 pt-3 ">Apply Job</DialogTitle>
              <DialogDescription>
                <div className="p-6 space-y-5">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block mb-1.5 text-[12px] dark:text-gray-200"
                    >
                      Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-sm text-red-500">
                        Name is required
                      </span>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="block mb-1.5 text-[12px] dark:text-gray-200"
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500">
                        Email is required
                      </span>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="contact"
                      className="block mb-1.5 text-[12px] dark:text-gray-200"
                    >
                      Contact Number
                    </Label>
                    <PhoneInput
                      country="bd"
                      value={getValues("contact")}
                      onChange={(value) => setValue("contact", value)}
                      inputProps={{
                        name: "contact",
                        required: true,
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      inputStyle={{
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                      buttonStyle={{
                        width: "45px",
                      }}
                    />
                    {errors.contact && (
                      <span className="text-sm text-red-500">
                        Contact number is required
                      </span>
                    )}
                  </div>

                  <ApplicantResumeUpload register={register} />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">
                Apply Now
                <SendHorizontal size={16} />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyForm;
