"use client";

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

import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ApplicantResumeUpload from "./ApplicantResumeUpload";

const ApplyForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const {
    register,
    handleSubmit,
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
    router.push("/");
  };

  return (
    <div className="mt-[30px] flex items-center justify-end">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger>
          <div className="">
            {hasApplied ? (
              <>
                <button
                  disabled={hasApplied}
                  className="flex items-center gap-2 px-5 py-3 rounded bg-[#00ca99] hover:bg-[#212121] duration-300 text-white font-medium outline-none border-none"
                >
                  Applied
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2 px-5 py-3 rounded bg-[#00ca99] hover:bg-[#212121] duration-300 text-white font-medium outline-none border-none">
                  Apply Now{" "}
                  <span>
                    <SendHorizontal size={18} />
                  </span>
                </button>
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
                    <Label htmlFor="name" className="block mb-1.5 text-[12px]">
                      Name
                    </Label>
                    <input
                      type="text"
                      className="w-full bg-[#f5f5f5] border border-[##f5f5f5] px-4 py-2 rounded-lg"
                      placeholder="Name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block mb-1.5 text-[12px]">
                      Email
                    </Label>
                    <input
                      type="email"
                      className="w-full bg-[#f5f5f5] border border-[##f5f5f5] px-4 py-2 rounded-lg"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact"
                      className="block mb-1.5 text-[12px]"
                    >
                      Contact Number
                    </Label>
                    <input
                      type="text"
                      className="w-full bg-[#f5f5f5] border border-[##f5f5f5] px-4 py-2 rounded-lg"
                      placeholder="Contact Number"
                      {...register("contact", { required: true })}
                    />
                  </div>
                  <ApplicantResumeUpload register={register} />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                type="submit"
                className="mt-2 flex items-center gap-1 px-4 py-2.5 rounded bg-[#00ca99] hover:bg-[#212121] duration-300 text-white font-medium outline-none border-none"
              >
                Apply Now{" "}
                <span>
                  <SendHorizontal size={18} />
                </span>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyForm;
