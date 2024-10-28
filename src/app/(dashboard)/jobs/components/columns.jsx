/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { jobData as data } from "../components/jobData";
 
export const jobColumns = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Job Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const backgroundColor =
        status === "open"
          ? "bg-green-100 p-1 rounded-lg"
          : status === "closed"
          ? "bg-red-100 p-1 rounded-lg"
          : "";
      const textColor =
        status === "open"
          ? "text-green-600 p-1 rounded-lg"
          : status === "closed"
          ? "text-red-600 p-1 rounded-lg"
          : "";
      return (
        <div
          className={`text-center capitalize ${textColor} ${backgroundColor} font-semibold`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "salary",
    header: () => <div className="text-center">Salary</div>,
    cell: ({ row }) => {
      const salary = row.getValue("salary");
      return <div className={`text-center font-medium`}>{salary}</div>;
    },
  },
  {
    accessorKey: "applications",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Applications
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize font-medium">
        {row.getValue("applications")}
      </div>
    ),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Deadline
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
    accessorKey: "postedOn",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Posted On
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("postedOn");
      return (
        <div className="text-center">{date.toLocaleDateString("en-US")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;
      const [jobData, setJobData] = React.useState(data);
 
      const handleEditClick = () => {
        const selected = jobData.find((item) => item.id === job.id);
        console.log("Selected : ", selected);
        setSelectedJob({ ...selected });
        setIsDialogOpen(true);
      };
 
      const [isDialogOpen, setIsDialogOpen] = React.useState(false);
      const [selectedJob, setSelectedJob] = React.useState(null);
 
      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSelectedJob((prevJob) => ({
          ...prevJob,
          [name]: value,
        }));
      };
 
      const handleFormSubmit = () => {
        const updatedData = data.map((job) =>
          job.id === selectedJob.id ? selectedJob : job
        );
        setJobData(updatedData);
        console.log("Updated Data : ", updatedData);
        setIsDialogOpen(false);
      };
 
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(job.id)}
              >
                Copy job ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Applicants</DropdownMenuItem>
              <DropdownMenuItem onClick={handleEditClick}>
                Edit Job
              </DropdownMenuItem>
              <DropdownMenuItem>Delete Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
 
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Job Details</DialogTitle>
                <DialogDescription>
                  Update the job information below.
                </DialogDescription>
              </DialogHeader>
              {selectedJob && (
                <div className="space-y-4">
                  <Input
                    label="Job Title"
                    name="title"
                    value={selectedJob.title}
                    onChange={handleFormChange}
                  />
                  <Input
                    label="Status"
                    name="status"
                    value={selectedJob.status}
                    onChange={handleFormChange}
                  />
                  <Input
                    label="Salary"
                    name="salary"
                    type="number"
                    value={selectedJob.salary}
                    onChange={handleFormChange}
                  />
                </div>
              )}
              <DialogFooter>
                <Button onClick={handleFormSubmit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];