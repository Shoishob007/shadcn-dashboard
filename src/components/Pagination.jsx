import React from "react";
import { Button } from "@/components/ui/button";

const OurPagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const visiblePages = [];
    const range = 2;

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) visiblePages.push(i + 1);
    } else {
      if (currentPage <= 2) {
        visiblePages.push(0, 1, 2, 3, "...", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        visiblePages.push(0, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        visiblePages.push(0, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
      }
    }
    return visiblePages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };
  

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </Button>

      {/* Pagination Buttons */}
      {pageNumbers.map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "solid" : "ghost"}
          size="sm"
          onClick={() => handlePageClick(page)}
          className={page === "..." ? "text-gray-500" : ""}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default OurPagination;
