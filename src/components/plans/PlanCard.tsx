"use client";

import Link from "next/link";
import { Star, Wifi, Smartphone } from "lucide-react";
import type { PlanWithMetrics } from "@/lib/types";

interface PlanCardProps {
  plan: PlanWithMetrics;
  onCompare: (id: string) => void;
  isCompareSelected: boolean;
}

export function PlanCard({ plan, onCompare, isCompareSelected }: PlanCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col font-[family-name:var(--font-inter)] dark:bg-[#0B1020] dark:border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div 
          className="px-3 py-1 text-white text-xs font-bold rounded-full"
          style={{ backgroundColor: plan.operator.color }}
        >
          {plan.operator.displayName}
        </div>
        {plan.badges && plan.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 max-w-[50%] justify-end">
            {plan.badges.map((badge) => (
              <span key={badge} className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded whitespace-nowrap">
                {badge.replace('_', ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-[family-name:var(--font-manrope)] font-bold text-[#0B1020] dark:text-white">₹{plan.price}</span>
          <span className="text-sm text-gray-500 mb-1">/ {plan.validityDays} days</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-semibold">{plan.dataPerDayGb ? `${plan.dataPerDayGb}GB/day` : plan.totalData ? `${plan.totalData}GB total` : 'No Data'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-semibold">{plan.voice}</p>
          </div>
        </div>
        <div className="col-span-2 flex flex-wrap gap-2 text-xs">
          {plan.unlimited5g && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">Unlimited 5G</span>}
          {!plan.unlimited5g && plan.fiveG && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">5G Data</span>}
          {plan.ottBenefits && plan.ottBenefits.map((ott) => (
            <span key={ott} className="bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100">{ott}</span>
          ))}
        </div>
      </div>

      <div className="bg-[#F7F8FC] dark:bg-gray-900 rounded-lg p-3 mb-4 flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <div>
          <span className="block text-[10px] uppercase tracking-wider">Cost/Day</span>
          <span className="font-semibold text-[#0B1020] dark:text-white">{plan.costPerDay !== null ? `₹${plan.costPerDay.toFixed(2)}` : '-'}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider">Cost/GB</span>
          <span className="font-semibold text-[#0B1020] dark:text-white">{plan.costPerGb !== null ? `₹${plan.costPerGb.toFixed(2)}` : '-'}</span>
        </div>
        {plan.valueScore !== null && (
          <div>
            <span className="block text-[10px] uppercase tracking-wider">Value</span>
            <span className="font-semibold text-green-600 flex items-center gap-1">
              {plan.valueScore.toFixed(0)} <Star className="w-3 h-3 fill-current" />
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex gap-2">
          <button 
            onClick={() => onCompare(plan.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              isCompareSelected 
                ? "bg-blue-50 border-blue-200 text-[#2563EB]" 
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            {isCompareSelected ? "Added" : "Compare"}
          </button>
          <Link href={`/plan/${plan.operator.slug}/${plan.price}`} className="flex-1">
            <button className="w-full py-2 rounded-lg text-sm font-semibold bg-gray-100 text-[#0B1020] hover:bg-gray-200 transition-colors">
              Details
            </button>
          </Link>
        </div>
        <a href={plan.rechargeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <button className="w-full py-2 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors">
            Recharge Now
          </button>
        </a>
        <p className="text-[10px] text-center text-gray-400 mt-1">Verified: {new Date(plan.lastVerifiedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default PlanCard;
