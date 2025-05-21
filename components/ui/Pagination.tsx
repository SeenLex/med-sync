import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`inline-flex items-center justify-center h-8 w-8 rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;
        const isCurrentPage = pageNumber === currentPage;
        
        return (
          <button
            key={i}
            onClick={() => onPageChange(pageNumber)}
            className={`inline-flex items-center justify-center h-8 w-8 rounded ${
              isCurrentPage
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center justify-center h-8 w-8 rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
