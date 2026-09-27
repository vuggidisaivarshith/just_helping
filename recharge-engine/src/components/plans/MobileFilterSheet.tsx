"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import type { PlanFilters } from "@/lib/types";

interface MobileFilterSheetProps {
  filters: PlanFilters;
  onChange: (filters: PlanFilters) => void;
  planCount: number;
}

export function MobileFilterSheet({ filters, onChange, planCount }: MobileFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<PlanFilters>(filters);

  const applyFilters = () => {
    onChange(tempFilters);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-[#2563EB] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <Filter className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="w-[85%] max-w-md bg-white dark:bg-[#0B1020] h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-manrope font-bold text-lg">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              <FilterSidebar 
                filters={tempFilters} 
                onChange={setTempFilters} 
                planCount={planCount} 
              />
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-4 bg-white dark:bg-[#0B1020] sticky bottom-0">
              <button 
                onClick={() => setTempFilters({} as PlanFilters)}
                className="flex-1 py-3 text-sm font-semibold border border-gray-200 rounded-xl"
              >
                Clear All
              </button>
              <button 
                onClick={applyFilters}
                className="flex-1 py-3 text-sm font-semibold bg-[#2563EB] text-white rounded-xl"
              >
                Apply ({planCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileFilterSheet;
