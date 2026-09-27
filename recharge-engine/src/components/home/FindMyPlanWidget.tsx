"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function FindMyPlanWidget() {
  const router = useRouter();
  const [operator, setOperator] = useState("Any");
  const [budget, setBudget] = useState(300);
  const [data, setData] = useState("Any");

  const handleFind = () => {
    const params = new URLSearchParams();
    if (operator !== "Any") params.set("operator", operator);
    if (budget) params.set("maxPrice", budget.toString());
    if (data !== "Any") params.set("minData", data);
    
    router.push(`/plans?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm font-inter">
      <h3 className="font-manrope text-xl font-bold mb-6 text-[#0B1020] dark:text-white">Find My Plan</h3>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Operator</label>
          <select 
            value={operator} 
            onChange={e => setOperator(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"
          >
            <option value="Any">Any Operator</option>
            <option value="Jio">Jio</option>
            <option value="Airtel">Airtel</option>
            <option value="Vi">Vi</option>
            <option value="BSNL">BSNL</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Max Budget</label>
            <span className="text-sm font-bold text-[#2563EB]">₹{budget}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="4000" 
            step="50"
            value={budget} 
            onChange={e => setBudget(Number(e.target.value))}
            className="w-full accent-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Daily Data Needed</label>
          <select 
            value={data} 
            onChange={e => setData(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"
          >
            <option value="Any">Any</option>
            <option value="1">1 GB/Day</option>
            <option value="1.5">1.5 GB/Day</option>
            <option value="2">2 GB/Day</option>
            <option value="3">3+ GB/Day</option>
          </select>
        </div>

        <button 
          onClick={handleFind}
          className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-2"
        >
          <Search className="w-4 h-4" /> Find Matching Plans
        </button>
      </div>
    </div>
  );
}

export default FindMyPlanWidget;
