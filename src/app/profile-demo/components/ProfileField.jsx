"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProfileField = ({ data }) => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const { id } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/designations`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const designationRes = await response.json();
        const fetchedDesignations = designationRes.docs.map((d) => ({
          id: d.id,
          title: d.title,
        }));
        setDesignations(fetchedDesignations);
      } catch (error) {
        console.error("Error fetching designations: ", error.message);
      }
    };
    getDesignations();
  }, [accessToken]);

  const onSubmit = async (value) => {
    const profileInfo = {
      name: value.name,
      phone: value.phone,
      email: value.email,
      bloodGroup: value.bloodGroup,
      address: value.address,
      designation: selectedDesignation?.id,
    };
    console.log("Designation: ", profileInfo);
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
      console.log("Profile Response: ", profileResponse);
      if (profileResponse?.doc?.id) {
        toast({
          title: "Success",
          description: profileResponse?.message,
          variant: "ourSuccess",
        });
      }
    } catch (error) {
      console.error("Error updating profile info: ", error.message);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              defaultValue={data?.name}
              className="mt-2.5"
              {...register("name")}
            />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mt-2.5 w-full">
                  {selectedDesignation
                    ? selectedDesignation.title
                    : "Select Designation"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search designation..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {designations.map((designation) => (
                        <CommandItem
                          key={designation.id}
                          onSelect={() => {
                            setSelectedDesignation(designation);
                            setOpen(false);
                          }}
                        >
                          {designation.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              defaultValue={data?.phone}
              className="mt-2.5"
              {...register("phone")}
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={data?.email}
              className="mt-2.5"
              {...register("email")}
            />
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Input
              id="bloodGroup"
              type="text"
              defaultValue={data?.bloodGroup}
              className="mt-2.5"
              {...register("bloodGroup")}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              defaultValue={data?.address}
              className="mt-2.5"
              {...register("address")}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileField;
