"use client";
import { data } from "@/components/DataManagement";
import PageTitle from "@/components/PageTitle";
import SearchComponent from "@/components/SearchComponent";
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


const JobSearch = () => {
    const [showCSEJob, setShowCSEJob] = useState(true)
    const [showEEEJob, setShowEEEJob] = useState(false)
    const [showItJob, setShowItJob] = useState(false)
    const [showBBAJob, setShowBBAJob] = useState(false)
    
    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };
    return (
        <div>
            <PageTitle title={'Search for Jobs'} />

            {/* Jobs search - filter and search */}
            <section className="mt-4 flex items-center justify-between">
                {/* Searchbar */}
                <div>
                    <SearchComponent onSearch={handleSearch} />
                </div>
                
                {/* Dropdown */}
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Button variant="outline">Category</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showCSEJob}
                                onCheckedChange={setShowCSEJob}
                                >
                                CSE
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showItJob}
                                onCheckedChange={setShowItJob}
                                >
                                IT
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showBBAJob}
                                onCheckedChange={setShowBBAJob}
                                >
                                BBA
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showEEEJob}
                                onCheckedChange={setShowEEEJob}
                                >
                                EEE
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </section>

            {/* Jobs part */}
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

export default JobSearch;