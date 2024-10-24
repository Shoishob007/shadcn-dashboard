"use client";

import { data as importedData } from "@/components/DataManagement";
import PageTitle from "@/components/PageTitle";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Briefcase, Loader, MoreHorizontal, Tag } from "lucide-react";
import { useState } from "react";



// TODO: This table will show the upcoming interview list with details

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
      cell: ({ row }) => (
        <div className="text-center capitalize font-medium">
          {row.getValue("status")}
        </div>
      ),
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
                  <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(job.id)}
                  >
                  Copy job ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleViewDetails(job.id)}>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Job</DropdownMenuItem>
                  <DropdownMenuItem>Delete Job</DropdownMenuItem>
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
                          {
                              jobDetails && (
                                  <>
                                      <div className="flex items-center gap-2">
                                          <Image
                                              src={companyLogo}
                                              width={40}
                                          />
                                          <div>
                                              <h1 className="text-black font-semibold">{jobDetails.title}</h1>
                                              <h2 className="text-xs">{jobDetails.company}</h2>
                                              <div className="flex items-center gap-3">
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span > <Briefcase className="text-[6px]" /> </span>
                                                      <h3 className="capitalize text-black">{jobDetails.employmentType}</h3>
                                                  </div>
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span className="text-[6px]"><Loader /></span>
                                                      <h3 className="capitalize text-black">{jobDetails.status}</h3>
                                                  </div>
                                                  <div className="flex items-center gap-1 mt-2">
                                                      <span > <Tag className="text-[6px]" /> </span>
                                                      <h3 className="capitalize text-black">{jobDetails.salaryRange} Monthly</h3>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Job Description</h1>
                                          <p className="text-xs mt-1">{jobDetails.description}</p>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Requirements</h1>
                                          <p className="text-xs mt-1">{jobDetails.jobRequirements}</p>
                                      </div>
                                      <div className="mt-3 flex items-center justify-between">
                                          <div className="flex items-center gap-1">
                                              <h1>Designation:</h1> <span className="text-black">{jobDetails.designation}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                          <h1>Role:</h1> <span className="text-black capitalize">{jobDetails.role}</span>
                                          </div>
                                      </div>
                                      <div className="mt-3">
                                          <h1 className="text-black font-medium">Deadline</h1>
                                          <p className="text-xs mt-1">{jobDetails.deadline?.toLocaleDateString()}</p>
                                      </div>
                                      
                                  </>
                              )
                          }
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

const UpcomingInterviews = () => {
    
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    

    const data = importedData.filter(d => d.status === 'applied');


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
        <>
            <PageTitle title={'Upcoming interviews'} />
            <section>
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
            </section>
        </>
    );
};

export default UpcomingInterviews;