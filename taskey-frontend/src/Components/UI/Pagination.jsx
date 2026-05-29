import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 md:gap-6 mt-12">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 md:p-4 bg-transparent border-2 border-border rounded-full hover:border-foreground transition-colors disabled:opacity-30 disabled:hover:border-border disabled:cursor-not-allowed flex items-center justify-center"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <span className="font-bold text-xs md:text-sm text-text-secondary tracking-widest uppercase">
                PAGE {currentPage} OF {totalPages}
            </span>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-3 md:p-4 bg-transparent border-2 border-border rounded-full hover:border-foreground transition-colors disabled:opacity-30 disabled:hover:border-border disabled:cursor-not-allowed flex items-center justify-center"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        </div>
    );
}

export default Pagination;
