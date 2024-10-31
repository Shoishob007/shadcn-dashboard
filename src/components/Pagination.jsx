import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const OurPagination = ({ table }) => {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="!text-sm text-gray-500"
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => table.setPageIndex(index)}
              isActive={index === currentPage}
              className="!text-sm text-gray-500"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="!text-sm text-gray-500"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default OurPagination;
