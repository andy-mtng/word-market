import { useState, useEffect } from "react";

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationBar = ({ currentPage, totalPages, onPageChange }: PaginationBarProps) => {
    const range = 5;

    const generatePageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - range);
        let endPage = Math.min(totalPages, currentPage + range);
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        if (startPage > 1) {
            console.log("unshift");
            pages.unshift("...");
        }
        if (endPage < totalPages) {
            pages.push("...");
        }
        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="pagination my-8">
            {pageNumbers.map((page, index) => (
                <button
                    className="mr-1 h-9 w-9 rounded-sm border border-gray-200 font-semibold"
                    key={index}
                    onClick={() => {
                        onPageChange(page as number);
                    }}
                    disabled={(page as number) === currentPage}
                >
                    {typeof page === "number" ? page : <span>{page}</span>}
                </button>
            ))}
        </div>
    );
};

export default PaginationBar;
