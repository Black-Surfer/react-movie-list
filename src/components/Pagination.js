import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mx-1 border rounded-lg disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-4 py-2">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className="px-4 py-2 mx-1 border rounded-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
