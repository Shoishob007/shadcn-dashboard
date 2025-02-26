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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const UpdateEducation = () => {
  const { data: session } = useSession();
  const accessToken = session?.access_token;
  const { control, handleSubmit, setValue } = useForm();
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [fosData, setFosData] = useState([]);
  const [openDegree, setOpenDegree] = useState(false);
  const [openFOS, setOpenFOS] = useState(false);

  // Fetch Degree Levels
  useEffect(() => {
    const fetchEducationData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const degreeLevelData = await response.json();
      setDegreeLevels(degreeLevelData?.docs || []);
    };
    fetchEducationData();
  }, []);

  // Fetch Field of Studies
  useEffect(() => {
    const fetchFOSData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const fosData = await response.json();
      setFosData(fosData?.docs || []);
    };
    fetchFOSData();
  }, []);

const onSubmit = async (data) => {
  console.log("Selected Data:", data);
  const degreeId = data?.degreeLevel;
  const fosId = data?.fieldOfStudy;

  // Fetch Degree Details
  const degreeResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels/${degreeId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const degreeData = await degreeResponse.json();

  // Fetch Field of Study Details
  const fosResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies/${fosId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const fosData = await fosResponse.json();

  // Store in localStorage
  const educationData = {
    degree: {
      id: degreeData?.id,
      title: degreeData?.title,
    },
    fieldOfStudy: {
      id: fosData?.id,
      title: fosData?.title,
    },
  };

  localStorage.setItem("educationData", JSON.stringify(educationData));

  toast({
    title: "Success",
    description: "Your education details have been saved successfully!",
    variant: "ourSuccess",
  });
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Degree Level Selection */}
        <div>
          <Label htmlFor="degreeLevel">Degree Level</Label>
          <Controller
            name="degreeLevel"
            control={control}
            render={({ field }) => (
              <Popover open={openDegree} onOpenChange={setOpenDegree}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mt-2.5 w-full">
                    {field.value
                      ? degreeLevels.find((d) => d.id === field.value)?.title
                      : "Select Degree Level"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search degree level..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {degreeLevels.map((degree) => (
                          <CommandItem
                            key={degree.id}
                            onSelect={() => {
                              setValue("degreeLevel", degree.id);
                              setOpenDegree(false);
                            }}
                          >
                            {degree.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Field of Study Selection */}
        <div>
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Controller
            name="fieldOfStudy"
            control={control}
            render={({ field }) => (
              <Popover open={openFOS} onOpenChange={setOpenFOS}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mt-2.5 w-full">
                    {field.value
                      ? fosData.find((fos) => fos.id === field.value)?.title
                      : "Select Field of Study"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search field of study..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {fosData.map((fos) => (
                          <CommandItem
                            key={fos.id}
                            onSelect={() => {
                              setValue("fieldOfStudy", fos.id);
                              setOpenFOS(false);
                            }}
                          >
                            {fos.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UpdateEducation;
