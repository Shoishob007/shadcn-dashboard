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
  const [selectedService, setSelectedService] = useState("All");
  const [orderDate, setOrderDate] = useState("");

  const services = ["All", "Free Package", "Standard Package"]

  const data = [
    {
      id: 1,
      quotation: "20240609-28",
      date: "2024-06-09",
      service: "Free Package",
      amount: "0 BDT",
      invoice: "14175 EDT",
    },
    {
      id: 2,
      quotation: "20241114-53",
      date: "2024-11-14",
      service: "Standard Package",
      amount: "14175 BDT",
      invoice: "14175 EDT",
    },
  ];

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const selectedDate = new Date(orderDate);
    const today = new Date();

    return (
      (selectedService === "All" || item.service === selectedService) &&
      (!orderDate || (itemDate >= selectedDate && itemDate <= today))
    );
  });

  return (
    <div className="p-4">

      {/* Filters */}
      <div className="flex flex-row gap-4 mb-6 justify-end">
        {/* Service Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-1/4 flex items-center justify-between hover:bg-white dark:border-gray-500"
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
      <Table className="w-full text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <thead className="bg-gray-800 dark:bg-gray-300 text-gray-200 dark:text-gray-800">
          <tr>
            <th className="p-2">SL</th>
            <th>Quotation No.</th>
            <th>Order Date</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Invoice No.</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <tr key={item.id} className="border-b text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="p-2 text-center">{idx + 1}</td>
                <td className="text-center">{item.quotation}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.service}</td>
                <td className="text-center">{item.amount}</td>
                <td className="text-center">{item.invoice}</td>
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
