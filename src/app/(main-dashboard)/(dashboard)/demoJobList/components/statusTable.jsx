// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { ArrowUpDown, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const columns = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "applicant",
//     header: "Applicant",
//     cell: ({ row }) => {
//       const applicant = row.original;
//       return (
//         <div className="flex items-center gap-3">
//           <Avatar className="h-8 w-8">
//             <AvatarImage
//               src={applicant.applicant?.pictureUrl}
//               alt={applicant.name}
//             />
//             <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div className="flex flex-col">
//             <span className="font-medium">{applicant.name}</span>
//             <span className="text-xs text-muted-foreground">
//               {applicant.experiences?.[0]?.position || "N/A"}
//             </span>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "education",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Education
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const education = row.original.education;
//       return (
//         <div className="max-w-[250px]">
//           {education && education.length > 0 ? (
//             <ul className="list-disc list-inside text-xs">
//               {education.map((edu, index) => (
//                 <li key={index}>
//                   {edu.degree}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-xs text-gray-500">No data available</p>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "experience",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Experience
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const experiences = row.original.experiences;
//       return (
//         <div className="max-w-[250px]">
//           {experiences && experiences.length > 0 ? (
//             <ul className="list-disc list-inside text-xs">
//               {experiences.map((experience, index) => (
//                 <li key={index}>
//                   {experience.position} at {experience.companyName}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-xs text-gray-500">No data available</p>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "certifications",
//     header: "Certifications",
//     cell: ({ row }) => row.original.certifications?.length || 0,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.status;
//       return (
//         <div
//           className={`px-2 py-1 rounded-full text-xs font-semibold inline-block
//           ${
//             status === "shortlisted"
//               ? "bg-yellow-100 text-yellow-600"
//               : status === "hired"
//               ? "bg-emerald-100 text-emerald-600"
//               : status === "rejected"
//               ? "bg-red-100 text-red-600"
//               : "bg-blue-100 text-blue-600"
//           }`}
//         >
//           {status
//             ? status.charAt(0).toUpperCase() + status.slice(1)
//             : "Applied"}
//         </div>
//       );
//     },
//   },
// ];

// export default function ApplicantsTable({
//   currentPaginatedApplicants,
//   calculateTotalExperience,
// }) {
//   const [sorting, setSorting] = React.useState([]);
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const data = React.useMemo(
//     () =>
//       currentPaginatedApplicants.map((applicant) => ({
//         ...applicant,
//         totalExperience: calculateTotalExperience(applicant.experiences),
//       })),
//     [currentPaginatedApplicants, calculateTotalExperience]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//       <div className="flex items-center py-4 ">
//         <Input
//           placeholder="Filter by name..."
//           value={table.getColumn("applicant")?.getFilterValue() ?? ""}
//           onChange={(event) =>
//             table.getColumn("applicant")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className={`even:bg-gray-50 odd:dark:bg-gray-700 odd:bg-white even:dark:bg-gray-800`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
