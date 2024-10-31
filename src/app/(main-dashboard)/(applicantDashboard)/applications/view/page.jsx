/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import companyLogo from '../../../../../../public/assests/dummy-logo.png';

import FormatTitle from "@/components/TitleFormatter";
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Briefcase,
  ChevronDown,
  Loader,
  MoreHorizontal,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const data = [
  {
    id: "1",
    title: "Backend Developer",
    company: "ABC Limited",
    designation: "Junior Backend Developer",
    salary: 40000,
    status: "applied",
    role: "Backend",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
    jobRequirements:
      "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
    employmentType: "full-time",
    salaryRange: "35,000 - 45,000 BDT",
  },
  {
    id: "2",
    title: "Full-Stack Developer",
    company: "FintechHub",
    designation: "Junior Full-Stack Engineer",
    salary: 30000,
    status: "rejected",
    role: "fullstack",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Take part in designing and implementing full-stack web applications. Collaborate with frontend and backend teams to deliver efficient, reliable solutions using modern web development frameworks and tools in a fast-paced environment.",
    jobRequirements:
      "Strong skills in JavaScript, React.js, Node.js, and database management. Understanding of RESTful APIs and version control systems.",
    employmentType: "contractual",
    salaryRange: "25,000 - 35,000 BDT",
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "CDE Company",
    designation: "Junior Frontend Engineer",
    salary: 20000,
    status: "shortlisted",
    role: "frontend",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Develop responsive and user-friendly interfaces using modern JavaScript frameworks. Work closely with backend developers to integrate APIs and ensure smooth user experiences. A great opportunity to refine frontend skills and creativity.",
    jobRequirements:
      "Experience in React.js, JavaScript, HTML5, CSS3, and API integration. Familiarity with frontend frameworks like Tailwind CSS is a plus.",
    employmentType: "full-time",
    salaryRange: "18,000 - 25,000 BDT",
  },
  {
    id: "4",
    title: "QA Engineer",
    company: "FintechHub",
    designation: "Senior QA Engineer",
    salary: 70000,
    status: "applied",
    role: "QA",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Lead the quality assurance process for software products, identifying and fixing bugs through rigorous testing. Collaborate with developers to improve code quality, ensuring releases meet high standards of reliability and performance.",
    jobRequirements:
      "Experience with software testing, bug tracking tools, and automation frameworks. Strong analytical skills for troubleshooting and quality improvement.",
    employmentType: "full-time",
    salaryRange: "65,000 - 75,000 BDT",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "ABC Company",
    designation: "Junior Backend Engineer",
    salary: 30000,
    status: "shortlisted",
    role: "Backend",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Assist in the development and maintenance of backend systems, ensuring robust API functionality and data processing. Collaborate with the frontend team to support seamless communication between the client and server in scalable applications.",
    jobRequirements:
      "Proficiency in backend frameworks like Node.js and Express, along with database technologies like MongoDB. Ability to write efficient server-side logic.",
    employmentType: "part-time",
    salaryRange: "28,000 - 35,000 BDT",
  },
  {
    id: "6",
    title: "Backend Engineer",
    company: "ABC Company",
    designation: "Junior Backend Engineer",
    salary: 30000,
    status: "applied",
    role: "Backend",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Assist in the development and maintenance of backend systems, ensuring robust API functionality and data processing. Collaborate with the frontend team to support seamless communication between the client and server in scalable applications.",
    jobRequirements:
      "Proficiency in backend frameworks like Node.js and Express, along with database technologies like MongoDB. Ability to write efficient server-side logic.",
    employmentType: "part-time",
    salaryRange: "28,000 - 35,000 BDT",
  },
  {
    id: "7",
    title: "Backend Engineer",
    company: "ABC Company",
    designation: "Junior Backend Engineer",
    salary: 30000,
    status: "applied",
    role: "Backend",
    deadline: new Date("2024-12-31"),
    postedOn: new Date("2024-10-15"),
    description:
      "Assist in the development and maintenance of backend systems, ensuring robust API functionality and data processing. Collaborate with the frontend team to support seamless communication between the client and server in scalable applications.",
    jobRequirements:
      "Proficiency in backend frameworks like Node.js and Express, along with database technologies like MongoDB. Ability to write efficient server-side logic.",
    employmentType: "part-time",
    salaryRange: "28,000 - 35,000 BDT",
  },
];

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
      <div className="text-center capitalize">
        {row.getValue("designation")}
      </div>
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
      <div className="text-center">{row.getValue("role")}</div>
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
          ? "text-fuchsia-600"
          : status === "shortlisted"
            ? "text-green-700" 
            : status === 'rejected' ? "text-red-600"
            : "text-yellow-600";
      return (
      <div className={`${backgroundColor} ${textColor} p-1 rounded-lg text-center capitalize font-medium`}>
        {row.getValue("status")}
      </div>
    )},
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;

      const [open, setOpen] = useState(false);
      const [jobDetails, setJobDetails] = useState(null);
      const handleViewDetails = (id) => {
        const jobDetailsData = data.find((d) => d.id === id);
        setJobDetails(jobDetailsData);
        setOpen(true);
      };
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(job.id)}
              >
                Copy job ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(job.id)}>
                View Details
              </DropdownMenuItem>
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
                  <section className="mt-3">
                    {jobDetails && (
                      <>
                        <div className="flex items-center gap-2">
                          <Image
                            src={companyLogo}
                            width={40}
                            alt="Company Logo"
                          />
                          <div>
                            <h1 className="text-black font-semibold">
                              {jobDetails.title}
                            </h1>
                            <h2 className="text-xs">{jobDetails.company}</h2>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 mt-2">
                                <span>
                                  {" "}
                                  <Briefcase className="w-4" />{" "}
                                </span>
                                <h3 className="capitalize text-black">
                                  {jobDetails.employmentType}
                                </h3>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                <span>
                                  <Loader className="w-4" />
                                </span>
                                <h3 className="capitalize text-black">
                                  {jobDetails.status}
                                </h3>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                <span>
                                  {" "}
                                  <Tag className="w-4" />{" "}
                                </span>
                                <h3 className="capitalize text-black">
                                  {jobDetails.salaryRange} Monthly
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h1 className="text-black font-medium">
                            Job Description
                          </h1>
                          <p className="text-xs mt-1">
                            {jobDetails.description}
                          </p>
                        </div>
                        <div className="mt-3">
                          <h1 className="text-black font-medium">
                            Requirements
                          </h1>
                          <p className="text-xs mt-1">
                            {jobDetails.jobRequirements}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <h1>Designation:</h1>{" "}
                            <span className="text-black">
                              {jobDetails.designation}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <h1>Role:</h1>{" "}
                            <span className="text-black capitalize">
                              {jobDetails.role}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h1 className="text-black font-medium">Deadline</h1>
                          <p className="text-xs mt-1">
                            {jobDetails.deadline?.toLocaleDateString()}
                          </p>
                        </div>
                      </>
                    )}
                  </section>
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

const viewApplications = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
       <PageTitle title={pageTitle} className={"pb-4 ml-2"} />

      {/* My applications table */}
      <section className="">
        <div className="w-full bg-white py-2 px-6 rounded-lg shadow-md h-full items-center">
          <div className="flex items-center justify-center py-4 ">
            <Input
              placeholder="Filter jobs..."
              value={table.getColumn("title")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-center text-xs"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default viewApplications;
