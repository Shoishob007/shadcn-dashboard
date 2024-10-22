"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const data = [
  {
    id: "m5gr84i9",
    jobTitle: "Full-Stack Engineer",
    applicantName: "Shoishob Al-Baki",
    applicantEmail: "shoishob@hotmail.com",
    status: "Applied",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
    postedOn: new Date("2024-10-15"),
    interviewSchedule: new Date("2024-11-10"),
  },
  {
    id: "3u1reuv4",
    jobTitle: "Software Engineer",
    applicantName: "Ataullah",
    applicantEmail: "ataullah@gmail.com",
    status: "Hired",
    CVScore: 65,
    deadline: new Date("2024-11-05"),
    interviewSchedule: new Date("2024-11-14"),
  },
  {
    id: "derv1ws0",
    jobTitle: "Human Resources Manager",
    applicantName: "Shoikot Arfin",
    applicantEmail: "arfin@outlook.com",
    status: "Shortlisted",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
    interviewSchedule: new Date("2024-11-10"),
  },
  {
    id: "5kma53ae",
    jobTitle: "Marketing Manager",
    applicantName: "Shoishob Al-Baki",
    applicantEmail: "shoishob@hotmain.com",
    status: "Applied",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
    interviewSchedule: new Date("2024-11-10"),
  },
  {
    id: "bhqecj4p",
    jobTitle: "QA Engineer",
    applicantName: "Ashfaq Tanzim",
    applicantEmail: "ashfaq@gmail.com",
    status: "Hired",
    CVScore: 60,
    deadline: new Date("2024-10-01"),
    interviewSchedule: new Date("2024-10-10"),
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

    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue("applicantName")}
      </div>
    ),
  },
  {
    accessorKey: "applicantEmail",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("applicantEmail")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("status")}</div>
    ),
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
        <div className="text-center font-medium">Deadline</div>
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
        Interview Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("interviewSchedule");
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
      const { toast } = useToast();

      const handleShortlist = () => {
        /* Here goes the logic for shortlisting */
        toast({
          title: "Success",
          description: "Applicant shortlisted!",
          variant: "success",
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
            <DropdownMenuItem onClick={() => handleShortlist()}>
              Shortlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function JobsData() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="w-full bg-white py-2 px-4 rounded-lg shadow-md h-full items-center">
      <div className="flex items-center justify-center py-4 ">
        <Input
          placeholder="Filter applicant..."
          value={table.getColumn("applicantName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("applicantName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 h-4 w-4" />
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

      <div className="rounded-lg border overflow-x-auto">
        <Table className="max-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="p-0">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center p-0">
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
                    <TableCell key={cell.id} className="text-center text-xs">
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
  );
}
