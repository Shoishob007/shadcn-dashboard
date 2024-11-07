"use client";

import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { columns } from "./components/upcomingInterviewColumns";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import OurPagination from "@/components/Pagination";

export const shortlisted = [
  {
    id: "1",
    title: "Backend Developer",
    company: "ABC Limited",
    designation: "Junior Backend Developer",
    salary: 40000,
    status: "applied",
    role: "Backend",
    deadline: new Date("2024-11-30"),
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
    deadline: new Date("2024-11-25"),
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
    deadline: new Date("2024-12-29"),
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
    deadline: new Date("2024-12-10"),
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
    deadline: new Date("2024-12-05"),
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
    title: "Backend Developer",
    company: "FGH Limited",
    designation: "Junior Backend Developer",
    salary: 40000,
    status: "shortlisted",
    role: "Backend",
    deadline: new Date("2024-11-30"),
    postedOn: new Date("2024-10-15"),
    description:
      "Join our dynamic backend team to build, maintain, and optimize scalable APIs and server-side applications. Work closely with frontend teams to ensure smooth data flow and system performance in a collaborative environment.",
    jobRequirements:
      "Proficiency in Node.js, Express, MongoDB, REST APIs. Experience with database management and server-side logic.",
    employmentType: "full-time",
    salaryRange: "35,000 - 45,000 BDT",
  },
  {
    id: "7",
    title: "Full-Stack Developer",
    company: "FintechHub",
    designation: "Junior Full-Stack Engineer",
    salary: 30000,
    status: "shortlisted",
    role: "fullstack",
    deadline: new Date("2024-11-25"),
    postedOn: new Date("2024-10-15"),
    description:
      "Take part in designing and implementing full-stack web applications. Collaborate with frontend and backend teams to deliver efficient, reliable solutions using modern web development frameworks and tools in a fast-paced environment.",
    jobRequirements:
      "Strong skills in JavaScript, React.js, Node.js, and database management. Understanding of RESTful APIs and version control systems.",
    employmentType: "contractual",
    salaryRange: "25,000 - 35,000 BDT",
  },
  {
    id: "8",
    title: "Frontend Developer",
    company: "CDE Company",
    designation: "Junior Frontend Engineer",
    salary: 20000,
    status: "shortlisted",
    role: "frontend",
    deadline: new Date("2024-12-29"),
    postedOn: new Date("2024-10-15"),
    description:
      "Develop responsive and user-friendly interfaces using modern JavaScript frameworks. Work closely with backend developers to integrate APIs and ensure smooth user experiences. A great opportunity to refine frontend skills and creativity.",
    jobRequirements:
      "Experience in React.js, JavaScript, HTML5, CSS3, and API integration. Familiarity with frontend frameworks like Tailwind CSS is a plus.",
    employmentType: "full-time",
    salaryRange: "18,000 - 25,000 BDT",
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "FintechHub",
    designation: "Senior QA Engineer",
    salary: 70000,
    status: "shortlisted",
    role: "QA",
    deadline: new Date("2024-12-10"),
    postedOn: new Date("2024-10-15"),
    description:
      "Lead the quality assurance process for software products, identifying and fixing bugs through rigorous testing. Collaborate with developers to improve code quality, ensuring releases meet high standards of reliability and performance.",
    jobRequirements:
      "Experience with software testing, bug tracking tools, and automation frameworks. Strong analytical skills for troubleshooting and quality improvement.",
    employmentType: "full-time",
    salaryRange: "65,000 - 75,000 BDT",
  },
  {
    id: "10",
    title: "Backend Engineer",
    company: "XYZ Company",
    designation: "Junior Backend Engineer",
    salary: 30000,
    status: "shortlisted",
    role: "Backend",
    deadline: new Date("2024-12-05"),
    postedOn: new Date("2024-10-15"),
    description:
      "Assist in the development and maintenance of backend systems, ensuring robust API functionality and data processing. Collaborate with the frontend team to support seamless communication between the client and server in scalable applications.",
    jobRequirements:
      "Proficiency in backend frameworks like Node.js and Express, along with database technologies like MongoDB. Ability to write efficient server-side logic.",
    employmentType: "part-time",
    salaryRange: "28,000 - 35,000 BDT",
  },
];

const ITEMS_PER_PAGE = 5;

const UpcomingInterview = () => {
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const data = useMemo(() => {
    return shortlisted.filter((d) => d.status === "shortlisted");
  }, []);

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
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: ITEMS_PER_PAGE,
        pageIndex: 0,
      },
    },
  });

  return (
    <div>
      {" "}
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
      {/* upcoming interview content */}
      <section className="">
        <div className="w-full bg-white dark:bg-gray-800 py-2 px-6 rounded-lg shadow-md h-full items-center">
          <div className="flex items-center justify-center py-4 ">
            <Input
              placeholder="Filter jobs..."
              value={table.getColumn("title")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm dark:border-gray-200"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto dark:border-gray-200"
                >
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
            <div className="flex-1 text-sm text-muted-foreground dark:text-gray-200">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <OurPagination table={table} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingInterview;
