"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/plans/FilterSidebar";
import MobileFilterSheet from "@/components/plans/MobileFilterSheet";
import PlanGrid from "@/components/plans/PlanGrid";
import SearchBar from "@/components/plans/SearchBar";
import SortSelector from "@/components/plans/SortSelector";
import ComparisonTray from "@/components/compare/ComparisonTray";
import { plans } from "@/lib/data/plans";
import { filterPlans, sortPlans, searchPlans, computeMetrics } from "@/lib/data/engine";
import { PlanFilters, SortOption } from "@/lib/types";

function PlansPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL
  const initialFilters: PlanFilters = {
    operators: searchParams.getAll("operator"),
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
    category: (searchParams.getAll("category")[0] as any) || null,
    hasVoice: null,
    hasSms: null,
    search: searchParams.get("q") || ""
  };

  const initialSort = (searchParams.get("sort") as SortOption) || "recommended";
  const initialSearch = searchParams.get("q") || "";

  const [filters, setFilters] = useState<PlanFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const PLANS_PER_PAGE = 24;

  // Update URL when filters/sort/search change
  useEffect(() => {
    const params = new URLSearchParams();
    filters.operators?.forEach(op => params.append("operator", op));
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

    router.replace(`/plans?${params.toString()}`, { scroll: false });
  }, [filters, sort, searchQuery, router]);

  // Compute and process plans
  let processedPlans = filterPlans({ ...filters, search: searchQuery });
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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Recharge Plans</h1>
            <p className="text-gray-500 mt-1">
              Showing {processedPlans.length} plans • Last updated today
            </p>
          </div>
          
          <div className="flex w-full md:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <SearchBar initialValue={searchQuery} onSearch={setSearchQuery} />
            <div className="flex items-center gap-3">
              <MobileFilterSheet filters={filters} onChange={setFilters} planCount={processedPlans.length} />
              <SortSelector value={sort} onChange={setSort} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} planCount={processedPlans.length} />
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
                    setFilters({operators:[],circleId:null,minPrice:null,maxPrice:null,minValidity:null,maxValidity:null,minData:null,minDataPerDay:null,fiveG:null,unlimited5g:null,hasOtt:null,category:null,hasVoice:null,hasSms:null,search:""});
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
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

export default function PlansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PlansPageContent />
    </Suspense>
  );
}

