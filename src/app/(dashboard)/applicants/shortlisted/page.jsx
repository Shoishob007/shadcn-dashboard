/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
// import { data as importedData } from "../components/data";
import { columns } from "../components/columns";

export const applicantsData = [
  {
    id: "m5gr84i9",
    jobTitle: "Full-Stack Engineer",
    applicantName: "Shoishob Al-Baki",
    applicantEmail: "shoishob@hotmail.com",
    status: "Shortlisted",
    CVScore: 50,
    deadline: new Date("2024-11-01"),
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

export default function ShortListedApplicants() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const data = applicantsData.filter((d) => d.status === "Shortlisted");

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
    <div className="w-full bg-white py-2 px-2 rounded-lg shadow-md h-full items-center">
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
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
