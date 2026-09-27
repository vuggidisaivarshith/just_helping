import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OperatorCards() {
  const operators = [
    { name: "Jio", color: "bg-[#1A73E8]", plans: 45, startPrice: 149 },
    { name: "Airtel", color: "bg-[#E4002B]", plans: 42, startPrice: 155 },
    { name: "Vi", color: "bg-[#9B1B85]", plans: 38, startPrice: 155 },
    { name: "BSNL", color: "bg-[#F7941D]", plans: 25, startPrice: 107 },
  ];

  return (
    <section className="py-16 bg-[#F7F8FC] dark:bg-[#0B1020]">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold text-[#0B1020] dark:text-white">Browse by Operator</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
          {operators.map((op, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <div className={`h-2 w-full ${op.color}`} />
              <div className="p-6">
                <h3 className="text-2xl font-manrope font-bold mb-1">{op.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{op.plans}+ Plans available</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starts From</p>
                    <p className="text-lg font-bold">₹{op.startPrice}</p>
                  </div>
                  <Link href={`/plans?operator=${op.name}`}>
                    <button className="text-sm font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                      View Plans <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OperatorCards;
