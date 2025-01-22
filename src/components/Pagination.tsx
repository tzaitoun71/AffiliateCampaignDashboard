interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded-lg shadow-md text-lg transition-all duration-200 
              ${currentPage === index + 1 ? "bg-blue-600 text-white font-semibold" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              md:px-4 md:py-2 md:text-lg
              sm:px-3 sm:py-1 sm:text-sm`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  