"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
}

export function CustomSelect({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  className
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    options.find(opt => opt.value === value) || null
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onValueChange(option.value);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 disabled:cursor-not-allowed disabled:opacity-50",
          isOpen && "ring-2 ring-green-600 border-green-600"
        )}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Content */}
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center py-2 px-3 text-sm outline-none transition-colors hover:bg-green-100 focus:bg-green-100",
                  selectedOption?.value === option.value && "bg-green-50 text-green-900 font-medium"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
