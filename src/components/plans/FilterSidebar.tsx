"use client";

import type { PlanFilters } from "@/lib/types";
import { Filter, X } from "lucide-react";

interface FilterSidebarProps {
  filters: PlanFilters;
  onChange: (filters: PlanFilters) => void;
  planCount: number;
}

export function FilterSidebar({ filters, onChange, planCount }: FilterSidebarProps) {
  const handleOperatorToggle = (op: string) => {
    const operators = filters.operators || [];
    const newOps = operators.includes(op) 
      ? operators.filter(o => o !== op)
      : [...operators, op];
    onChange({ ...filters, operators: newOps });
  };

  const clearFilters = () => {
    onChange({} as PlanFilters);
  };

  return (
    <div className="w-full md:w-64 shrink-0 font-inter">
      <div className="sticky top-24 bg-white dark:bg-[#0B1020] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          <h2 className="font-manrope font-bold flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h2>
          <button onClick={clearFilters} className="text-xs text-[#2563EB] font-semibold hover:underline">
            Clear all
          </button>
        </div>

        <div className="space-y-6">
          {/* Operators */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Operators</h3>
            <div className="space-y-2">
              {['Jio', 'Airtel', 'Vi', 'BSNL'].map(op => (
                <label key={op} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.operators?.includes(op) || false}
                    onChange={() => handleOperatorToggle(op)}
                    className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  {op}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                value={filters.minPrice || ''}
                onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) || null })}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
              <span className="text-gray-400">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={filters.maxPrice || ''}
                onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) || null })}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Validity */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Validity</h3>
            <div className="flex flex-wrap gap-2">
              {[28, 56, 84, 365].map(days => (
                <button
                  key={days}
                  onClick={() => onChange({ ...filters, minValidity: days })}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    filters.minValidity === days 
                      ? 'bg-blue-50 border-blue-200 text-[#2563EB]' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Features</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.unlimited5g || false}
                  onChange={(e) => onChange({ ...filters, unlimited5g: e.target.checked || null })}
                  className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                Unlimited 5G
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.hasOtt || false}
                  onChange={(e) => onChange({ ...filters, hasOtt: e.target.checked || null })}
                  className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                OTT Benefits
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
