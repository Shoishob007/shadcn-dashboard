"use client";
import { data } from "@/components/DataManagement";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Banknote } from "lucide-react";
import { useState } from "react";



const JobPostings = () => {
    const [showFrontPos, setShowFrontPos] = useState(true)
    const [showBackendPos, setShowBackendPos] = useState(false)
    const [showFullPos, setShowFullPos] = useState(false);
    
    
    return (
        <div>
            <PageTitle title={'Recent Job Postings'} />
            {/* Your preference for job */}
            <section>
                <form className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-5">
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Your Location</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Location</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                
                                >
                                Dhaka
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                
                                >
                                Chittagong
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                
                                >
                                Sylhet
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Your position</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Position</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                checked={showFrontPos}
                                onCheckedChange={setShowFrontPos}
                                >
                                Frontend Developer
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={showBackendPos}
                                onCheckedChange={setShowBackendPos}
                                >
                                Backend Developer
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={showFullPos}
                                onCheckedChange={setShowFullPos}
                                >
                                Full Stack Developer
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Your Role</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Role</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                
                                >
                                Frontend
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                
                                >
                                Backend
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                
                                >
                                Full Stack
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </form>
            </section>

            {/* Show Recent job postings for preferences */}
            <section className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4 ">
                {
                    data.map((d, index) => (
                        <Card className='px-1 pt-4 border hover:border-gray-950 cursor-pointer transition-all'>
                            <CardContent>
                                <div>
                                    <h1 className="font-semibold mb-1">{d.designation}</h1>
                                    <h3 className="text-gray-500">{d.company}</h3>  
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center">
                                            <span className="text-gray-500"><Banknote /></span>
                                            <p className="ml-1">{d.salary} BDT</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-gray-500">Role:</span>
                                            <p className="ml-1">{d.role}</p>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button>Details</Button>
                            </CardFooter>
                        </Card>
                ))
                }
            </section>
        </div>
    );
};

export default JobPostings;