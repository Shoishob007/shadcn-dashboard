/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SquareChevronRight } from "lucide-react";

const OurPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const [activePage, setActivePage] = useState(currentPage);

  const getPageNumbers = () => {
    const visiblePages = [];
    const range = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      if (currentPage <= range + 1) {
        visiblePages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - range) {
        visiblePages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, "...", currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return visiblePages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page > 0 && page <= totalPages) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center p-1 bg-white dark:bg-gray-800 items-center space-x-2 mt-4 border w-fit mx-auto rounded-md">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        className="dark:hover:bg-gray-800"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Pagination Buttons */}
      {pageNumbers.map((page, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
          className={`${
            page === currentPage
              ? "font-bold text-lg transition-all duration-300 transform scale-110 dark:hover:bg-gray-800"
              : "font-medium text-sm transition-all duration-300 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        className="dark:hover:bg-gray-800"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5"/>
      </Button>
    </div>
  );
};

export default OurPagination;
