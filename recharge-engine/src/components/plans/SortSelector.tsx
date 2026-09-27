"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, SortOption } from "@/lib/types";

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="relative inline-block font-inter">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none bg-white dark:bg-[#0B1020] border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            Sort by: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}

export default SortSelector;
