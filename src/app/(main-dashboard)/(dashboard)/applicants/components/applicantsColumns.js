/* eslint-disable react-hooks/rules-of-hooks */
import { ArrowUpDown, Check, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplicantDetailsPopover } from "./ApplicantDetailsPopover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusSelect } from "./StatusSelect.jsx";


export const columns = (router) => {

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: "jobTitle",
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
        <div className="text-center capitalize">{row.getValue("jobTitle")}</div>
      ),
    },
    {
      accessorKey: "applicantName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const applicantData = row.original;

        return (
          <div className="text-center capitalize">
            <Dialog>
              <DialogTrigger asChild>
                <span className="hover:underline hover:cursor-pointer hover:text-blue-500">
                  {applicantData.applicantName}
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-base">Profile Details</DialogTitle><hr className="dark:bg-gray-200" />
                </DialogHeader>
                <ApplicantDetailsPopover applicant={applicantData} />
                <DialogFooter>
                  <Button type="submit" size="sm">Download CV</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
    {
      accessorKey: "applicantEmail",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("applicantEmail")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <StatusSelect router={router} />,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const backgroundColor =
          status === "hired"
            ? "bg-green-100"
            : status === "applied"
              ? "bg-fuchsia-100"
              : "bg-yellow-100";
        const textColor =
          status === "hired"
            ? "text-green-700"
            : status === "applied"
              ? "text-fuchsia-700"
              : "text-yellow-600";
        return (
          <div className={`text-center capitalize ${textColor} ${backgroundColor} p-1 rounded-lg font-semibold`}>
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "CVScore",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CV Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("CVScore")}</div>
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
      accessorKey: "interviewSchedule",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Interview
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const date = row.getValue("interviewSchedule");
        return (
          <div className="text-center">
            {status === "applied" || !date ? "N/A" : date.toLocaleDateString("en-US")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const job = row.original;
        const { toast } = useToast();

        const handleShortlist = () => {
          toast({
            title: "Success",
            description: "Applicant shortlisted!",
            variant: "ourSuccess",
          });
        };

        return (
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
                Copy applicant ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Applicant</DropdownMenuItem>
              <DropdownMenuItem>Download CV</DropdownMenuItem>
              <DropdownMenuItem onClick={handleShortlist}>
                Shortlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};