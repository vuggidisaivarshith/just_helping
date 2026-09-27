"use client";

import { PlanCard } from "./PlanCard";
import type { PlanWithMetrics } from "@/lib/types";

interface PlanGridProps {
  plans: PlanWithMetrics[];
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

export function PlanGrid({ plans, compareIds, onToggleCompare }: PlanGridProps) {
  if (!plans || plans.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-manrope font-bold text-gray-800 dark:text-gray-200 mb-2">No plans found</h3>
        <p className="text-gray-500 max-w-md">Try adjusting your filters or search terms to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
        Showing {plans.length} plans
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plans.map(plan => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            onCompare={onToggleCompare} 
            isCompareSelected={compareIds.includes(plan.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default PlanGrid;
