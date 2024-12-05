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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Applied Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/job-search");
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
              <div className="max-w-5xl">
                <button className=" flex items-center gap-2.5 text-sm px-3 py-3 rounded bg-[#212121] hover:bg-[#212121] duration-300 text-white font-medium outline-none border-none">
                  Apply Now{" "}
                  <span>
                    <SendHorizontal size={16} />
                  </span>
                </button>
              </div>
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
                    <div className="flex">
                      <Select className="flex-[1]">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="+880" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="flex-[4]">
                        <input
                          type="text"
                          className="w-full bg-[#f5f5f5] border border-[##f5f5f5] px-4 py-2 rounded-lg"
                          placeholder="Contact Number"
                          {...register("contact", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <ApplicantResumeUpload register={register} />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                type="submit"
                className="mt-2 flex items-center gap-1 px-4 py-2.5 rounded bg-[#212121] hover:bg-[#151515] duration-300 text-white font-medium outline-none border-none"
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
