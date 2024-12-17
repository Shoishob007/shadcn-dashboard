"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Calendar, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BillingTable = () => {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [orderDate, setOrderDate] = useState("");

  const services = ["All", "SMS Package", "Hot Job Listing"]

  const data = [
    {
      id: 1,
      quotation: "20240609-28",
      date: "2024-06-09",
      service: "SMS Package",
      amount: "1000 BDT",
      status: "Unpaid",
      invoice: "14175 EDT",
    },
    {
      id: 2,
      quotation: "20241114-53",
      date: "2024-11-14",
      service: "Hot Job Listing",
      amount: "14175 BDT",
      status: "Unpaid",
      invoice: "14175 EDT",
    },
  ];

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const selectedDate = new Date(orderDate);
    const today = new Date();

    return (
      (selectedService === "All" || item.service === selectedService) &&
      (selectedStatus === "All" || item.status === selectedStatus) &&
      (!orderDate || (itemDate >= selectedDate && itemDate <= today))
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-semibold underline underline-offset-2 mb-4">
        My Billings
      </h2>

      {/* Filters */}
      <div className="flex flex-row gap-4 mb-6 justify-center">
        {/* Service Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-1/4 flex items-center justify-between hover:bg-white"
            >
              {selectedService === "All"
                ? "Filter by Service"
                : selectedService}
              <ChevronDown className="w-5 h-5 md:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {services.map((service) => (
              <DropdownMenuItem
                key={service}
                onSelect={() => setSelectedService(service)}
              >
                <div className="flex items-center justify-between w-full gap-4 text-sm">
                  <div>
                  {service}
                </div>
                </div>
                {selectedService === service && "✔"}

              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-1/4 flex items-center justify-between hover:bg-white"
            >
              {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {["All", "Unpaid", "Paid"].map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => setSelectedStatus(status)}
              >
                <div className="flex items-center justify-between w-full gap-4 text-sm">
                  <div>
                  {status}
                  </div>
                </div>
                {selectedStatus === status && "✔"}
                
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Order Date Filter */}
        <div className="relative w-full sm:w-1/4 ">
          <Input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 hover:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <Table className="w-full">
        <thead className="bg-gray-300 dark:bg-gray-900">
          <tr>
            <th className="p-2">SL</th>
            <th>Quotation No.</th>
            <th>Order Date</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Invoice No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <tr key={item.id} className="border-b text-sm">
                <td className="p-2 text-center">{idx + 1}</td>
                <td className="text-center">{item.quotation}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.service}</td>
                <td className="text-center">{item.amount}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">{item.invoice}</td>
                <td className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" hover:bg-gray-300 dark:hover:bg-gray-900 dark:border-gray-500 px-3 py-1 rounded-md"
                    onClick={() => router.push(`/demoBillings/billing-table/payment?amount=${item.amount}`)}
                  >
                    Go for payment
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BillingTable;
