"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

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

import PageTitle from "@/components/PageTitle.jsx";
import OurPagination from "@/components/Pagination.jsx";
import FormatTitle from "@/components/TitleFormatter.js";
import { usePathname, useRouter } from "next/navigation.js";
import { jobColumns as columns } from "../../components/columns.jsx";
import { useSession } from "next-auth/react";
// import { jobData } from "../../components/jobData.js";

const ITEMS_PER_PAGE = 10;

export default function JobsData() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);
  const router = useRouter();
  const tableColumns = columns(router);
  const { data: session } = useSession();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobData(
          data.docs.map((job) => ({
            id: job.id,
            title: job.title || "",
            position: job.designation?.title || "",
            salary: job.salary,
            status: "open",
            applications: 50,
            deadline: new Date(job.deadline) || new Date("2024-12-30"),
            postedOn: new Date(job.createdAt),
          }))
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [accessToken]);

  const data = useMemo(() => {
    return jobData.filter((d) => d.status === "open");
  }, [jobData]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount: Math.ceil(data.length / ITEMS_PER_PAGE),
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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  const handleFilter = useCallback(
    (event) => {
      table.getColumn("title")?.setFilterValue(event.target.value);
    },
    [table]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <PageTitle title={pageTitle} className={"pb-4 ml-2"} />

      <div className="w-full bg-white dark:bg-gray-800 py-2 px-6 rounded-lg shadow-md h-full items-center">
        <div className="flex items-center justify-center py-4 ">
          <Input
            placeholder="Filter jobs..."
            value={table.getColumn("title")?.getFilterValue() || ""}
            onChange={handleFilter}
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
          <div className="flex-1 text-sm text-muted-foreground dark:text-gray-200">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <OurPagination table={table} />
          </div>
        </div>
      </div>
    </>
  );
}
