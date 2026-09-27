"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/plans/FilterSidebar";
import MobileFilterSheet from "@/components/plans/MobileFilterSheet";
import PlanGrid from "@/components/plans/PlanGrid";
import SearchBar from "@/components/plans/SearchBar";
import SortSelector from "@/components/plans/SortSelector";
import ComparisonTray from "@/components/compare/ComparisonTray";
import { getPlansForOperator } from "@/lib/data/engine";
import { getOperatorBySlug } from "@/lib/data/operators";
import { filterPlans, sortPlans, searchPlans, computeMetrics } from "@/lib/data/engine";
import { PlanFilters, SortOption } from "@/lib/types";

const CATEGORY_TABS = [
  "All",
  "Under ₹300",
  "Monthly",
  "Annual",
  "Unlimited 5G",
  "OTT",
  "Data Packs",
  "Best Value"
];

function OperatorPlansContent({ params }: { params: Promise<{ operator: string }> }) {
  const resolvedParams = use(params);
  const operatorSlug = resolvedParams.operator;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const operator = getOperatorBySlug(operatorSlug);

  const initialFilters: PlanFilters = {
    operators: [operator?.id || ""],
    circleId: null,
    minPrice: Number(searchParams.get("minPrice")) || null,
    maxPrice: Number(searchParams.get("maxPrice")) || null,
    minValidity: null,
    maxValidity: null,
    minData: null,
    minDataPerDay: null,
    fiveG: null,
    unlimited5g: null,
    hasOtt: null,
    category: (searchParams.get("category") as any) || null,
    hasVoice: null,
    hasSms: null,
    search: searchParams.get("q") || ""
  };

  const initialSort = (searchParams.get("sort") as SortOption) || "recommended";
  const initialSearch = searchParams.get("q") || "";
  const initialTab = searchParams.get("tab") || "All";

  const [filters, setFilters] = useState<PlanFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const PLANS_PER_PAGE = 24;

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minValidity) params.set("minValidity", filters.minValidity.toString());
    if (filters.maxValidity) params.set("maxValidity", filters.maxValidity.toString());
    if (filters.minDataPerDay) params.set("minDataPerDay", filters.minDataPerDay.toString());
    if (filters.fiveG) params.set("fiveG", "true");
    if (filters.unlimited5g) params.set("unlimited5g", "true");
    if (filters.hasOtt) params.set("hasOtt", "true");
    
    if (sort !== "recommended") params.set("sort", sort);
    if (searchQuery) params.set("q", searchQuery);
    if (activeTab !== "All") params.set("tab", activeTab);

    router.replace(`/plans/${operatorSlug}?${params.toString()}`, { scroll: false });
  }, [filters, sort, searchQuery, activeTab, router, operatorSlug]);

  if (!operator) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Operator Not Found</h1>
            <p className="text-gray-500 mb-8">We couldn't find the operator you're looking for.</p>
            <Link href="/plans" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              View All Plans
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const operatorPlans = getPlansForOperator(operator.id).map(p => computeMetrics(p));
  
  let tabFilteredPlans = operatorPlans;
  if (activeTab !== "All") {
    switch (activeTab) {
      case "Under ₹300":
        tabFilteredPlans = operatorPlans.filter(p => p.price < 300);
        break;
      case "Monthly":
        tabFilteredPlans = operatorPlans.filter(p => p.validityDays >= 24 && p.validityDays <= 35);
        break;
      case "Annual":
        tabFilteredPlans = operatorPlans.filter(p => p.validityDays >= 300);
        break;
      case "Unlimited 5G":
        tabFilteredPlans = operatorPlans.filter(p => p.unlimited5g);
        break;
      case "OTT":
        tabFilteredPlans = operatorPlans.filter(p => p.category === "OTT" || (p.ottBenefits && p.ottBenefits.length > 0));
        break;
      case "Data Packs":
        tabFilteredPlans = operatorPlans.filter(p => p.category === "DATA");
        break;
      case "Best Value":
        tabFilteredPlans = [...operatorPlans].sort((a, b) => (b.valueScore || 0) - (a.valueScore || 0)).slice(0, 20);
        break;
    }
  }

  const enforcedFilters = { ...filters, operators: [operator.id], search: searchQuery };
  let processedPlans = filterPlans(enforcedFilters);
  
  // also intersect with tabFilteredPlans
  processedPlans = processedPlans.filter(p => tabFilteredPlans.some(tp => tp.id === p.id));
  
  processedPlans = sortPlans(processedPlans, sort);

  const displayedPlans = processedPlans.slice(0, page * PLANS_PER_PAGE);
  const hasMore = displayedPlans.length < processedPlans.length;

  const handleCompareToggle = (id: string) => {
    setCompareIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id].slice(0, 3)
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="text-white py-12" style={{ backgroundColor: operator.color || '#3b82f6' }}>
          <div className="container mx-auto px-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{operator.name} Recharge Plans</h1>
            <p className="text-xl opacity-90">Compare {operatorPlans.length} plans and find the best value for your needs.</p>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setPage(1); }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <p className="text-gray-500 font-medium">
                Showing {processedPlans.length} plans
              </p>
            </div>
            
            <div className="flex w-full md:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <SearchBar initialValue={searchQuery} onSearch={setSearchQuery} />
              <div className="flex items-center gap-3">
                <MobileFilterSheet filters={enforcedFilters} onChange={setFilters} planCount={processedPlans.length} />
                <SortSelector value={sort} onChange={setSort} />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar 
                filters={enforcedFilters} 
                onChange={setFilters} 
                planCount={processedPlans.length}
              />
            </aside>
            
            <div className="flex-grow">
              {displayedPlans.length > 0 ? (
                <>
                  <PlanGrid 
                    plans={displayedPlans} 
                    compareIds={compareIds} 
                    onToggleCompare={handleCompareToggle} 
                  />
                  {hasMore && (
                    <div className="mt-8 text-center">
                      <button 
                        onClick={() => setPage(p => p + 1)}
                        className="px-6 py-2 bg-white border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        Load More Plans
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No plans found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                  <button 
                    onClick={() => {
                      setFilters({ operators: [operator.id] } as any);
                      setSearchQuery("");
                      setActiveTab("All");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ComparisonTray 
        plans={compareIds.map(id => processedPlans.find(p => p.id === id)).filter(Boolean) as any} 
        onRemove={(id: string) => handleCompareToggle(id)}
        onClear={() => setCompareIds([])}
      />
      
      <Footer />
    </div>
  );
}

export default function OperatorPlansPage({ params }: { params: Promise<{ operator: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OperatorPlansContent params={params} />
    </Suspense>
  );
}
