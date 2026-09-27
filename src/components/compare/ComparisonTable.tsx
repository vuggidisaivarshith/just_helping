"use client";

import { X, Check, Star } from "lucide-react";
import type { PlanWithMetrics } from "@/lib/types";

interface ComparisonTableProps {
  plans: PlanWithMetrics[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ plans, onRemove }: ComparisonTableProps) {
  if (plans.length === 0) return null;

  const rows = [
    { label: "Price", key: "price", format: (v: any) => `₹${v}` },
    { label: "Validity", key: "validityDays", format: (v: any) => `${v} days` },
    { label: "Data", key: "dataPerDayGb", format: (v: any, p: PlanWithMetrics) => v ? `${v}GB/day` : (p.totalData ? `${p.totalData}GB total` : 'None') },
    { label: "Voice", key: "voice" },
    { label: "SMS", key: "smsPerDay", format: (v: any, p: PlanWithMetrics) => v ? `${v}/day` : (p.smsTotal ? `${p.smsTotal} total` : 'None') },
    { label: "5G", key: "unlimited5g", format: (v: any, p: PlanWithMetrics) => v ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : (p.fiveG ? '5G Data' : '-') },
    { label: "OTT", key: "ottBenefits", format: (v: string[]) => v?.length ? v.join(", ") : "-" },
    { label: "Cost/Day", key: "costPerDay", format: (v: any) => v !== null ? `₹${v.toFixed(2)}` : '-' },
    { label: "Cost/GB", key: "costPerGb", format: (v: any) => v !== null ? `₹${v.toFixed(2)}` : '-' },
    { label: "Value Score", key: "valueScore", format: (v: any) => v !== null ? (
      <div className="flex items-center justify-center gap-1 text-green-600 font-semibold">
        {v?.toFixed(1)} <Star className="w-4 h-4 fill-current" />
      </div>
    ) : '-' },
  ];

  const getValue = (plan: PlanWithMetrics, path: string) => {
    return path.split('.').reduce((obj: any, key: string) => obj?.[key], plan);
  };

  return (
    <div className="w-full overflow-x-auto pb-8 font-inter">
      <table className="w-full min-w-[800px] border-collapse bg-white dark:bg-[#0B1020] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-100 dark:border-gray-800 text-left bg-gray-50 dark:bg-gray-900 w-48">Features</th>
            {plans.map(plan => (
              <th key={plan.id} className="p-4 border-b border-gray-100 dark:border-gray-800 relative text-center min-w-[200px]">
                <button 
                  onClick={() => onRemove(plan.id)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
                <div className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full mb-2" style={{ backgroundColor: plan.operator.color }}>
                  {plan.operator.displayName}
                </div>
                <div className="text-2xl font-manrope font-bold">₹{plan.price}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.key} className={i % 2 === 0 ? "bg-white dark:bg-[#0B1020]" : "bg-gray-50 dark:bg-gray-900"}>
              <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-semibold text-sm text-gray-600 dark:text-gray-300">
                {row.label}
              </td>
              {plans.map(plan => {
                const val = getValue(plan, row.key);
                return (
                  <td key={`${plan.id}-${row.key}`} className="p-4 border-b border-gray-100 dark:border-gray-800 text-center text-sm">
                    {row.format ? row.format(val, plan) : val}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td className="p-4"></td>
            {plans.map(plan => (
              <td key={`action-${plan.id}`} className="p-4 text-center">
                <a href={plan.rechargeUrl} target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-2 bg-[#2563EB] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Recharge
                  </button>
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
