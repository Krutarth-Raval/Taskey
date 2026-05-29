import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

function Dropdown({
    value,
    options,
    onChange,
    isOpen,
    onToggle,
    className = "w-full sm:w-48"
}) {
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onToggle(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    const activeOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => onToggle(!isOpen)}
                className="w-full flex items-center justify-between px-5 md:px-6 py-3 md:py-4 bg-transparent border-2 border-border rounded-xl text-sm md:text-base font-bold text-text-primary hover:border-foreground focus:border-foreground transition-colors"
            >
                <span className="uppercase tracking-widest">{activeOption ? activeOption.label : ''}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-xl shadow-2xl flex flex-col p-2 gap-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    onToggle(false);
                                }}
                                className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${
                                    isSelected
                                        ? 'bg-foreground text-background'
                                        : 'hover:bg-border text-text-secondary hover:text-foreground'
                                }`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
