import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

const JobFilter = () => {
    const [filters, setFilters] = useState({
        category: "",
        location: "",
        employmentType: [],
        jobType: [],
        jobRole: [],
        fieldOfStudy: [],
        degreeLevel: [],
    });

    const handleCheckboxChange = (key, value) => {
        setFilters((prev) => {
            const currentValues = prev[key];
            if (currentValues.includes(value)) {
                return {
                    ...prev,
                    [key]: currentValues.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prev,
                    [key]: [...currentValues, value],
                };
            }
        });
    };

    const handleSelectChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleReset = () => {
        setFilters({
            category: "",
            location: "",
            employmentType: [],
            jobType: [],
            jobRole: [],
            fieldOfStudy: [],
            degreeLevel: [],
        });
    };
    

    const handleApplyFilters = () => {
        console.log("Applied Filters:", filters);
    };

    const employeeType = [
        { id: "Full Time", label: "Full Time" },
        { id: "Part Time", label: "Part Time" },
        { id: "Contractual", label: "Contractual" },
        { id: "Freelance", label: "Freelance" },
        { id: "Hourly Basis", label: "Hourly Basis" },
    ];
    const jobTypes = [
        { id: "onsite", label: "On-site" },
        { id: "remote", label: "Remote" },
        { id: "hybrid", label: "Hybrid" },
    ];
    const jobRole = [
        { id: "Frontend", label: "Frontend Developer" },
        { id: "Backend", label: "Backend Developer" },
        { id: "Full Stack", label: "Full Stack Developer" },
        { id: "QA", label: "QA Engineer" },
    ];
    const fieldOfStudy = [
        { id: "cse", label: "CSE" },
        { id: "eee", label: "EEE" },
        { id: "ete", label: "ETE" },
        { id: "bba", label: "BBA" },
    ];
    const degreeLevel = [
        { id: "M.Sc", label: "M.Sc" },
        { id: "B.Sc", label: "B.Sc" },
        { id: "A Level", label: "A Level" },
        { id: "O Level", label: "O Level" },
    ];

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="outline">
                    <span>
                        <Filter />
                    </span>
                    Filter
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Find Your Perfect Match</SheetTitle>
                    <SheetDescription>
                        Quickly find jobs by filtering status, location, salary, or experience to match your preferences.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-5">
                    {/* Categories */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Categories</h3>
                        <Select
                            onValueChange={(value) => handleSelectChange("category", value)}
                        >
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="software">Software Development</SelectItem>
                                    <SelectItem value="design">Web Design</SelectItem>
                                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Location</h3>
                        <Select
                            onValueChange={(value) => handleSelectChange("location", value)}
                        >
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="new_york">New York</SelectItem>
                                    <SelectItem value="canada">Canada</SelectItem>
                                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Employment Type */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Employment Type</h3>
                        <div className="space-y-3">
                        {employeeType.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={type.id}
                                    checked={filters.employmentType.includes(type.id)}  // Connect to state
                                    onCheckedChange={() => handleCheckboxChange("employmentType", type.id)}
                                />
                                <label htmlFor={type.id} className="text-sm">
                                    {type.label}
                                </label>
                            </div>
                        ))}

                        </div>
                    </div>

                    {/* Job Type */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Job Type</h3>
                        <div className="space-y-3">
                            {jobTypes.map((type) => (
                                <div key={type.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={type.id}
                                        checked={filters.jobType.includes(type.id)}  // Connect to state
                                        onCheckedChange={() => handleCheckboxChange("jobType", type.id)}
                                    />
                                    <label htmlFor={type.id} className="text-sm">
                                        {type.label}
                                    </label>
                                </div>
                            ))}

                        </div>
                    </div>

                     {/* Job Role */}
                     <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Job Role</h3>
                        <div className="space-y-3">
                            {
                                jobRole.map((role) => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <Checkbox id={role.id} checked={filters.jobRole.includes(role.id)} onCheckedChange={() => handleCheckboxChange('jobRole', role.id)} />
                                        <label
                                            htmlFor={role.id}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-2"
                                        >
                                            {role.label}
                                        </label>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    {/* Field of Study */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Field of Study</h3>
                        <div className="space-y-3">
                            {
                                fieldOfStudy.map((study) => (
                                    <div key={study.id} className="flex items-center space-x-2">
                                        <Checkbox id={study.id} checked={filters.fieldOfStudy.includes(study.id)} onCheckedChange={() => handleCheckboxChange('fieldOfStudy', study.id)} />
                                        <label
                                            htmlFor={study.id}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-2"
                                        >
                                            {study.label}
                                        </label>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    {/* Degree Level */}
                    <div className="mt-5">
                        <h3 className="text-sm font-medium mb-2">Degree Level</h3>
                        <div className="space-y-3">
                            {
                                degreeLevel.map((degree) => (
                                    <div key={degree.id} className="flex items-center space-x-2">
                                        <Checkbox id={degree.id} checked={filters.degreeLevel.includes(degree.id)} onCheckedChange={() => handleCheckboxChange('degreeLevel', degree.id)} />
                                        <label
                                            htmlFor={degree.id}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-2"
                                        >
                                            {degree.label}
                                        </label>
                                    </div>
                                ))
                            }

                        </div>
                    </div>


                    <div className="mt-5 flex items-center gap-2 justify-end">
                        <Button variant="outline" onClick={handleReset}>
                            <RotateCcw /> Reset
                        </Button>
                        <Button onClick={handleApplyFilters}>
                            <Filter /> Apply Filter
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default JobFilter;
