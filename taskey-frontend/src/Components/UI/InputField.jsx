import React from 'react';

function InputField({
    id,
    type = "text",
    label,
    rightLabel = null,
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    icon: Icon = null
}) {
    return (
        <div className="space-y-2 group">
            <div className="flex justify-between items-center ml-1">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-medium text-text-primary transition-colors group-focus-within:text-foreground"
                    >
                        {label}
                    </label>
                )}
                {rightLabel}
            </div>
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full bg-background border border-border rounded-xl pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        Icon ? 'pl-10' : 'pl-4'
                    }`}
                    required={required}
                />
            </div>
        </div>
    );
}

export default InputField;
