"use client";

import React, { useState, useMemo } from "react";

// ---------------------------------------------------------------------------
// Sample plan data (will come from PostgreSQL API in production)
// ---------------------------------------------------------------------------
interface Plan {
  id: string;
  operator: string;
  operatorColor: string;
  circle: string;
  price: number;
  validity_days: number;
  data_per_day: number | null;
  data_total: number | null;
  data_type: string;
  voice_type: string;
  sms_per_day: number | null;
  five_g: boolean;
  unlimited_5g: boolean;
  ott: string[];
  category: string;
  last_verified: string;
}

const SAMPLE_PLANS: Plan[] = [
  // Jio
  { id: "jio-1", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 19, validity_days: 1, data_per_day: null, data_total: 1, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "jio-2", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 29, validity_days: 2, data_per_day: null, data_total: 2, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "jio-3", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 49, validity_days: 1, data_per_day: null, data_total: 25, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: true, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "jio-4", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 175, validity_days: 28, data_per_day: null, data_total: 10, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: false, ott: ["JioHotstar"], category: "OTT", last_verified: "2026-09-27" },
  { id: "jio-5", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 349, validity_days: 28, data_per_day: 2, data_total: 56, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: true, ott: ["JioHotstar"], category: "COMBO", last_verified: "2026-09-27" },
  { id: "jio-6", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 219, validity_days: 30, data_per_day: null, data_total: 30, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "jio-7", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 359, validity_days: 30, data_per_day: null, data_total: 50, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: true, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "jio-8", operator: "Jio", operatorColor: "#1A73E8", circle: "all", price: 3599, validity_days: 365, data_per_day: 2, data_total: 730, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: true, ott: ["JioHotstar"], category: "ANNUAL", last_verified: "2026-09-27" },
  // Airtel
  { id: "air-1", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 22, validity_days: 1, data_per_day: null, data_total: 1, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "air-2", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 26, validity_days: 1, data_per_day: null, data_total: 1.5, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "air-3", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 33, validity_days: 1, data_per_day: null, data_total: 2, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "air-4", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 77, validity_days: 7, data_per_day: null, data_total: 5, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "air-5", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 200, validity_days: 28, data_per_day: null, data_total: 30, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "air-6", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 349, validity_days: 28, data_per_day: 1.5, data_total: 42, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: true, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "air-7", operator: "Airtel", operatorColor: "#E4002B", circle: "andhra-pradesh", price: 279, validity_days: 30, data_per_day: null, data_total: 30, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  // Vi
  { id: "vi-1", operator: "Vi", operatorColor: "#9B1B85", circle: "all", price: 22, validity_days: 1, data_per_day: null, data_total: 1, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "vi-2", operator: "Vi", operatorColor: "#9B1B85", circle: "all", price: 33, validity_days: 1, data_per_day: null, data_total: 2, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "vi-3", operator: "Vi", operatorColor: "#9B1B85", circle: "all", price: 48, validity_days: 7, data_per_day: null, data_total: 6, data_type: "FIXED", voice_type: "none", sms_per_day: null, five_g: false, unlimited_5g: false, ott: [], category: "DATA", last_verified: "2026-09-27" },
  { id: "vi-4", operator: "Vi", operatorColor: "#9B1B85", circle: "all", price: 139, validity_days: 28, data_per_day: null, data_total: 12, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "vi-5", operator: "Vi", operatorColor: "#9B1B85", circle: "all", price: 349, validity_days: 28, data_per_day: 1.5, data_total: 42, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: true, unlimited_5g: true, ott: ["SonyLIV"], category: "COMBO", last_verified: "2026-09-27" },
  // BSNL
  { id: "bsnl-1", operator: "BSNL", operatorColor: "#F7941D", circle: "all", price: 49, validity_days: 30, data_per_day: null, data_total: 10, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "bsnl-2", operator: "BSNL", operatorColor: "#F7941D", circle: "all", price: 141, validity_days: 30, data_per_day: 1.5, data_total: 45, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "bsnl-3", operator: "BSNL", operatorColor: "#F7941D", circle: "all", price: 347, validity_days: 30, data_per_day: 2, data_total: 60, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "COMBO", last_verified: "2026-09-27" },
  { id: "bsnl-4", operator: "BSNL", operatorColor: "#F7941D", circle: "all", price: 1499, validity_days: 300, data_per_day: null, data_total: 32, data_type: "FIXED", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "ANNUAL", last_verified: "2026-09-27" },
  { id: "bsnl-5", operator: "BSNL", operatorColor: "#F7941D", circle: "all", price: 1551, validity_days: 365, data_per_day: 2, data_total: 730, data_type: "DAILY", voice_type: "unlimited", sms_per_day: 100, five_g: false, unlimited_5g: false, ott: [], category: "ANNUAL", last_verified: "2026-09-27" },
];

const CIRCLES = [
  "All India",
  "Andhra Pradesh",
  "Assam",
  "Bihar & Jharkhand",
  "Chennai",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Kolkata",
  "Maharashtra & Goa",
  "MP & Chhattisgarh",
  "Mumbai",
  "North East",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "UP East",
  "UP West",
  "West Bengal",
];

const OPERATORS = ["Jio", "Airtel", "Vi", "BSNL"];

const POPULAR_SEARCHES = [
  { label: "₹299 Plans", filter: { maxPrice: 299 } },
  { label: "1.5 GB/day", filter: { minDataPerDay: 1.5 } },
  { label: "2 GB/day", filter: { minDataPerDay: 2 } },
  { label: "Unlimited 5G", filter: { unlimited5g: true } },
  { label: "Annual Plans", filter: { category: "ANNUAL" } },
  { label: "Data Packs", filter: { category: "DATA" } },
  { label: "OTT Plans", filter: { category: "OTT" } },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function costPerDay(price: number, days: number) {
  return (price / days).toFixed(2);
}
function costPerGB(price: number, totalGB: number | null) {
  if (!totalGB || totalGB === 0) return "–";
  return (price / totalGB).toFixed(2);
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function PlanCard({
  plan,
  isCompareSelected,
  onToggleCompare,
}: {
  plan: Plan;
  isCompareSelected: boolean;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: plan.operatorColor }}
          >
            {plan.operator}
          </span>
          <div className="flex gap-1.5">
            {plan.five_g && (
              <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                5G
              </span>
            )}
            {plan.unlimited_5g && (
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                ∞ 5G
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-3xl font-extrabold text-[#0B1020] mb-1">
          ₹{plan.price}
        </div>

        {/* Data & Validity */}
        <div className="text-gray-700 font-medium mb-3">
          {plan.data_per_day
            ? `${plan.data_per_day} GB/day`
            : plan.data_total
              ? `${plan.data_total} GB`
              : "No data"}
          <span className="mx-1.5 text-gray-300">•</span>
          {plan.validity_days} {plan.validity_days === 1 ? "Day" : "Days"}
        </div>

        {/* Benefits */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          {plan.voice_type === "unlimited" && (
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span> Unlimited Calls
            </div>
          )}
          {plan.sms_per_day && (
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span> {plan.sms_per_day}{" "}
              SMS/day
            </div>
          )}
          {plan.ott.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span> {plan.ott.join(", ")}
            </div>
          )}
        </div>

        {/* Cost metrics */}
        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          <span>₹{costPerDay(plan.price, plan.validity_days)}/day</span>
          <span>₹{costPerGB(plan.price, plan.data_total)}/GB</span>
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="text-[10px] text-gray-400 mb-3">
          ✓ Verified {plan.last_verified}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleCompare(plan.id)}
            className={`flex-1 text-sm font-medium py-2 rounded-lg border transition-colors ${
              isCompareSelected
                ? "bg-[#2563EB] text-white border-[#2563EB]"
                : "bg-white text-[#2563EB] border-[#2563EB] hover:bg-blue-50"
            }`}
          >
            {isCompareSelected ? "✓ Added" : "Compare"}
          </button>
          <button className="flex-1 text-sm font-medium py-2 rounded-lg bg-[#0B1020] text-white hover:bg-gray-800 transition-colors">
            Recharge →
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonBar({
  plans,
  onRemove,
  onClear,
}: {
  plans: Plan[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  if (plans.length === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Compare ({plans.length}/4):
          </span>
          {plans.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 whitespace-nowrap"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.operatorColor }}
              />
              <span className="text-sm font-medium">
                {p.operator} ₹{p.price}
              </span>
              <button
                onClick={() => onRemove(p.id)}
                className="text-gray-400 hover:text-red-500 ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Clear
          </button>
          <button className="text-sm font-bold bg-[#2563EB] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function Home() {
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedCircle, setSelectedCircle] = useState("All India");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minDataPerDay, setMinDataPerDay] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [unlimited5gOnly, setUnlimited5gOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price_asc");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- filter ---
  const filteredPlans = useMemo(() => {
    let result = [...SAMPLE_PLANS];

    if (selectedOperators.length > 0) {
      result = result.filter((p) => selectedOperators.includes(p.operator));
    }
    if (maxPrice !== null) {
      result = result.filter((p) => p.price <= maxPrice);
    }
    if (minDataPerDay !== null) {
      result = result.filter(
        (p) => p.data_per_day !== null && p.data_per_day >= minDataPerDay
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (unlimited5gOnly) {
      result = result.filter((p) => p.unlimited_5g);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.operator.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          `₹${p.price}`.includes(q) ||
          (p.data_per_day && `${p.data_per_day}gb`.includes(q.replace(/\s/g, ""))) ||
          (p.ott && p.ott.some((o) => o.toLowerCase().includes(q)))
      );
    }

    // --- sort ---
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "data_desc":
        result.sort((a, b) => (b.data_total ?? 0) - (a.data_total ?? 0));
        break;
      case "validity_desc":
        result.sort((a, b) => b.validity_days - a.validity_days);
        break;
      case "cost_per_gb":
        result.sort((a, b) => {
          const aGb = a.data_total ? a.price / a.data_total : Infinity;
          const bGb = b.data_total ? b.price / b.data_total : Infinity;
          return aGb - bGb;
        });
        break;
      case "cost_per_day":
        result.sort(
          (a, b) => a.price / a.validity_days - b.price / b.validity_days
        );
        break;
    }
    return result;
  }, [
    selectedOperators,
    maxPrice,
    minDataPerDay,
    selectedCategory,
    unlimited5gOnly,
    sortBy,
    searchQuery,
  ]);

  function toggleOperator(op: string) {
    setSelectedOperators((prev) =>
      prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op]
    );
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }

  function applyPopularSearch(filter: Record<string, unknown>) {
    // Reset everything first
    setSelectedOperators([]);
    setMaxPrice(null);
    setMinDataPerDay(null);
    setSelectedCategory(null);
    setUnlimited5gOnly(false);
    setSearchQuery("");

    if ("maxPrice" in filter) setMaxPrice(filter.maxPrice as number);
    if ("minDataPerDay" in filter)
      setMinDataPerDay(filter.minDataPerDay as number);
    if ("category" in filter) setSelectedCategory(filter.category as string);
    if ("unlimited5g" in filter) setUnlimited5gOnly(true);
  }

  const comparePlans = SAMPLE_PLANS.filter((p) => compareIds.includes(p.id));

  return (
    <div className="min-h-screen">
      {/* ─── Header ─── */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <span className="text-white font-bold text-sm">IR</span>
              </div>
              <span className="text-xl font-bold text-[#0B1020] font-[family-name:var(--font-manrope)]">
                India Recharge
              </span>
            </div>
            <nav className="hidden lg:flex items-center space-x-6">
              {[
                "Compare",
                "Plans",
                "Operators",
                "5G",
                "OTT",
                "Data Packs",
                "Voice & SMS",
                "Tools",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#2563EB] font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className="hidden sm:inline text-sm text-[#0B1020] font-medium hover:text-[#2563EB]">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-b from-white to-[#F7F8FC] pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1020] mb-3 font-[family-name:var(--font-manrope)]">
            Find the right recharge.
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Compare every major network in India. Jio · Airtel · Vi · BSNL
          </p>

          {/* Search bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Try: 2GB per day under 400..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
            />
            <select
              value={selectedCircle}
              onChange={(e) => setSelectedCircle(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
            >
              {CIRCLES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={() => {}}
              className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
            >
              SEARCH
            </button>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {POPULAR_SEARCHES.map((ps) => (
              <button
                key={ps.label}
                onClick={() => applyPopularSearch(ps.filter)}
                className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
              >
                {ps.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
        {/* Operator selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {OPERATORS.map((op) => {
            const colors: Record<string, string> = {
              Jio: "#1A73E8",
              Airtel: "#E4002B",
              Vi: "#9B1B85",
              BSNL: "#F7941D",
            };
            const active = selectedOperators.includes(op);
            return (
              <button
                key={op}
                onClick={() => toggleOperator(op)}
                className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${
                  active
                    ? "shadow-md"
                    : "bg-white border-gray-100 hover:border-gray-300"
                }`}
                style={
                  active
                    ? {
                        borderColor: colors[op],
                        backgroundColor: `${colors[op]}10`,
                        color: colors[op],
                      }
                    : { color: "#0B1020" }
                }
              >
                {op}
                <div className="text-xs font-normal text-gray-400 mt-1">
                  {SAMPLE_PLANS.filter((p) => p.operator === op).length} plans
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={selectedCategory ?? ""}
            onChange={(e) =>
              setSelectedCategory(e.target.value || null)
            }
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">All Categories</option>
            <option value="COMBO">Combo</option>
            <option value="DATA">Data Only</option>
            <option value="OTT">OTT</option>
            <option value="ANNUAL">Annual</option>
          </select>

          <select
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : null)
            }
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">Any Price</option>
            <option value="50">Under ₹50</option>
            <option value="100">Under ₹100</option>
            <option value="200">Under ₹200</option>
            <option value="300">Under ₹300</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
          </select>

          <select
            value={minDataPerDay ?? ""}
            onChange={(e) =>
              setMinDataPerDay(e.target.value ? Number(e.target.value) : null)
            }
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">Any Data</option>
            <option value="1">1+ GB/day</option>
            <option value="1.5">1.5+ GB/day</option>
            <option value="2">2+ GB/day</option>
            <option value="3">3+ GB/day</option>
          </select>

          <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={unlimited5gOnly}
              onChange={(e) => setUnlimited5gOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
            />
            Unlimited 5G
          </label>

          <div className="flex-1" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="data_desc">Data: High → Low</option>
            <option value="validity_desc">Validity: High → Low</option>
            <option value="cost_per_gb">₹/GB: Low → High</option>
            <option value="cost_per_day">₹/Day: Low → High</option>
          </select>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-4">
          Showing {filteredPlans.length} plan
          {filteredPlans.length !== 1 ? "s" : ""}
          {selectedOperators.length > 0 &&
            ` for ${selectedOperators.join(", ")}`}
          {maxPrice && ` under ₹${maxPrice}`}
        </div>

        {/* Plan grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCompareSelected={compareIds.includes(plan.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">📱</div>
            <div className="text-lg font-medium">No plans match your filters</div>
            <div className="text-sm mt-1">
              Try adjusting your search or filters
            </div>
            <button
              onClick={() => {
                setSelectedOperators([]);
                setMaxPrice(null);
                setMinDataPerDay(null);
                setSelectedCategory(null);
                setUnlimited5gOnly(false);
                setSearchQuery("");
              }}
              className="mt-4 text-sm text-[#2563EB] font-medium hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-[#0B1020] text-gray-400 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-3">Operators</h4>
              {OPERATORS.map((op) => (
                <div key={op} className="mb-1.5 hover:text-white cursor-pointer">
                  {op} Plans
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Categories</h4>
              {["5G Plans", "OTT Plans", "Data Packs", "Annual Plans", "International"].map(
                (c) => (
                  <div key={c} className="mb-1.5 hover:text-white cursor-pointer">
                    {c}
                  </div>
                )
              )}
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Tools</h4>
              {["Cost/GB Calculator", "Cost/Day Calculator", "Data Calculator", "Plan Finder"].map(
                (t) => (
                  <div key={t} className="mb-1.5 hover:text-white cursor-pointer">
                    {t}
                  </div>
                )
              )}
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">About</h4>
              {["About Us", "Contact", "Privacy Policy", "Terms"].map((a) => (
                <div key={a} className="mb-1.5 hover:text-white cursor-pointer">
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500 text-center">
            Plan data is a snapshot as of 27 Sep 2026 and may vary by circle. Always verify on the official operator website before recharging.
          </div>
        </div>
      </footer>

      {/* ─── Comparison Bar ─── */}
      <ComparisonBar
        plans={comparePlans}
        onRemove={(id) =>
          setCompareIds((prev) => prev.filter((i) => i !== id))
        }
        onClear={() => setCompareIds([])}
      />
    </div>
  );
}
