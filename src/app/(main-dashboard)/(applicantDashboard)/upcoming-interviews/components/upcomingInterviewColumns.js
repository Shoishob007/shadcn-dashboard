/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Briefcase, Loader, MoreHorizontal, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import companyLogo from '../../../../../../public/assests/dummy-logo.png';
import { shortlisted as data } from "../page";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "company",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">Job Title</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "designation",
    header: () => <div className="text-center">Designation</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("designation")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("role")}
      </div>
    ),
  },
  {
    accessorKey: "salary",
    header: () => <div className="text-center">Salary</div>,
    cell: ({ row }) => {
      const salary = row.getValue("salary");
      return <div className="text-center font-medium">{salary}</div>;
    },
  },

  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="text-center font-medium">deadline</div>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("deadline");
      return (
        <div className="text-center">{date.toLocaleDateString("en-US")}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      const backgroundColor =
        status === "applied"
          ? "bg-fuchsia-100"
          : status === "shortlisted"
            ? "bg-green-100"
            : status === 'rejected' ? "bg-red-100"
              : "bg-yellow-100";
      const textColor =
        status === "applied"
          ? "text-fuchsia-700"
          : status === "shortlisted"
            ? "text-green-700"
            : status === 'rejected' ? "text-red-600"
              : "text-yellow-600";
      return (
        <div className={`text-center capitalize ${textColor} ${backgroundColor} p-1 rounded-lg font-semibold`}>
          {status}
        </div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;

      const [open, setOpen] = useState(false);
      const [jobDetails, setJobDetails] = useState(null);

      const handleViewDetails = (id) => {
        const jobDetailsData = data.find(d => d.id === id);
        setJobDetails(jobDetailsData);
        console.log(data);
        setOpen(true);
      }
      const closeDialog = () => setOpen(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(job.id)}
              >
                Copy job ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewDetails(job.id)}>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <></>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Job Details</DialogTitle>
                <DialogDescription>
                  <div className="mt-3">
                    {
                      jobDetails && (
                        <>
                          <div className="flex items-center gap-2">
                            <Image
                              src={companyLogo}
                              width={40}
                              alt="company-logo"
                            />
                            <div>
                              <h1 className="text-black font-semibold dark:text-gray-200">{jobDetails.title}</h1>
                              <h2 className="text-xs dark:text-gray-200">{jobDetails.company}</h2>
                              <div className="flex items-center gap-3 dark:text-gray-200">
                                <div className="flex items-center gap-1 mt-2 dark:text-gray-200">
                                  <span > <Briefcase className="w-4" /> </span>
                                  <h3 className="capitalize text-black dark:text-gray-200">{jobDetails.employmentType}</h3>
                                </div>
                                <div className="flex items-center gap-1 mt-2 dark:text-gray-200">
                                  <span><Loader className="w-4" /></span>
                                  <h3 className="capitalize text-black dark:text-gray-200">{jobDetails.status}</h3>
                                </div>
                                <div className="flex items-center gap-1 mt-2 dark:text-gray-200">
                                  <span > <Tag className="w-4" /> </span>
                                  <h3 className="capitalize text-black dark:text-gray-200">{jobDetails.salaryRange} Monthly</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h1 className="text-black font-medium dark:text-gray-200">Job Description</h1>
                            <p className="text-xs mt-1 dark:text-gray-200">{jobDetails.description}</p>
                          </div>
                          <div className="mt-3">
                            <h1 className="text-black font-medium dark:text-gray-200">Requirements</h1>
                            <p className="text-xs mt-1 dark:text-gray-200">{jobDetails.jobRequirements}</p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 dark:text-gray-200">
                              <h1>Designation:</h1> <span className="text-black dark:text-gray-200">{jobDetails.designation}</span>
                            </div>
                            <div className="flex items-center gap-1 dark:text-gray-200">
                              <h1>Role:</h1> <span className="text-black capitalize dark:text-gray-200">{jobDetails.role}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h1 className="text-black font-medium dark:text-gray-200">Deadline</h1>
                            <p className="text-xs mt-1 dark:text-gray-200">{jobDetails.deadline?.toLocaleDateString()}</p>
                          </div>

                        </>
                      )
                    }
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={closeDialog}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];