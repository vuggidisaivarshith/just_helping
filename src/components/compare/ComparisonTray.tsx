"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { PlanWithMetrics } from "@/lib/types";

interface ComparisonTrayProps {
  plans: PlanWithMetrics[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ComparisonTray({ plans, onRemove, onClear }: ComparisonTrayProps) {
  if (plans.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0B1020] border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-full duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-inter">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="bg-[#2563EB] text-white w-6 h-6 rounded-full flex items-center justify-center">
              {plans.length}
            </span>
            <span>Plans selected for comparison (Max 4)</span>
          </div>

          <div className="flex items-center gap-4 flex-1 overflow-x-auto pb-2 md:pb-0">
            {plans.map(plan => (
              <div key={plan.id} className="relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-w-[120px] flex-shrink-0">
                <button 
                  onClick={() => onRemove(plan.id)}
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 p-0.5 hover:bg-gray-100"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="text-xs font-bold">{plan.operator.displayName}</div>
                <div className="text-sm font-semibold">₹{plan.price}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={onClear}
              className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              Clear All
            </button>
            <Link href="/compare" className="flex-1 md:flex-none">
              <button 
                disabled={plans.length < 2}
                className="w-full px-6 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Compare Plans
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonTray;
