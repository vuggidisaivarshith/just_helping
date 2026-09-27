import { Plan, PlanWithMetrics, PlanFilters, SortOption, PlanBadge, FindMyPlanAnswers } from '@/lib/types';
import { plans } from './plans';
import { getOperator } from './operators';

// ─── Compute metrics for a single plan ───
export function computeMetrics(plan: Plan): PlanWithMetrics {
  const totalData = plan.dataTotalGb !== null
    ? plan.dataTotalGb
    : (plan.dataPerDayGb ? plan.dataPerDayGb * plan.validityDays : null);

  const costPerDay = plan.validityDays > 0 ? Math.round((plan.price / plan.validityDays) * 100) / 100 : null;
  const costPerGb = totalData && totalData > 0 ? Math.round((plan.price / totalData) * 100) / 100 : null;

  // ─── Transparent value score (0-100) ───
  let valueScore = 40;

  // Price efficiency (up to +20)
  if (costPerDay !== null) {
    if (costPerDay < 5) valueScore += 20;
    else if (costPerDay < 10) valueScore += 15;
    else if (costPerDay < 15) valueScore += 10;
    else if (costPerDay < 25) valueScore += 5;
  }

  // Data value (up to +15)
  if (costPerGb !== null) {
    if (costPerGb < 5) valueScore += 15;
    else if (costPerGb < 8) valueScore += 12;
    else if (costPerGb < 12) valueScore += 8;
    else if (costPerGb < 20) valueScore += 4;
  }

  // Validity bonus (up to +10)
  if (plan.validityDays >= 365) valueScore += 10;
  else if (plan.validityDays >= 180) valueScore += 7;
  else if (plan.validityDays >= 84) valueScore += 5;
  else if (plan.validityDays >= 28) valueScore += 3;

  // 5G bonus (up to +5)
  if (plan.unlimited5g) valueScore += 5;
  else if (plan.fiveG) valueScore += 2;

  // OTT bonus (up to +5)
  if (plan.ottBenefits && plan.ottBenefits.length >= 3) valueScore += 5;
  else if (plan.ottBenefits && plan.ottBenefits.length > 0) valueScore += 3;

  // Voice bonus (up to +3)
  if (plan.voice.toLowerCase().includes('unlimited')) valueScore += 3;

  // SMS bonus (up to +2)
  if (plan.smsPerDay && plan.smsPerDay >= 100) valueScore += 2;

  valueScore = Math.min(100, Math.max(0, valueScore));

  // ─── Badges ───
  const badges: PlanBadge[] = [];
  if (valueScore >= 85) badges.push('BEST_VALUE');
  if (plan.unlimited5g) badges.push('UNLIMITED_5G');
  if (plan.ottBenefits && plan.ottBenefits.length > 0) badges.push('OTT');
  if (plan.validityDays >= 180) badges.push('LONG_VALIDITY');

  const operator = getOperator(plan.operatorId);

  return {
    ...plan,
    operator: operator!,
    costPerDay,
    costPerGb,
    totalData,
    valueScore,
    badges,
  };
}

// ─── Pre-compute all metrics ───
const allPlansWithMetrics = plans.map(computeMetrics);

// Mark cheapest plans
const cheapestPrice = Math.min(...allPlansWithMetrics.map(p => p.price));
allPlansWithMetrics.forEach(p => {
  if (p.price === cheapestPrice && !p.badges.includes('CHEAPEST')) {
    p.badges.push('CHEAPEST');
  }
});

// Mark best data plans (highest total data per operator)
const operatorIds = [...new Set(allPlansWithMetrics.map(p => p.operatorId))];
operatorIds.forEach(opId => {
  const opPlans = allPlansWithMetrics.filter(p => p.operatorId === opId);
  const maxData = Math.max(...opPlans.map(p => p.totalData ?? 0));
  opPlans.forEach(p => {
    if (p.totalData === maxData && maxData > 0 && !p.badges.includes('BEST_DATA')) {
      p.badges.push('BEST_DATA');
    }
  });
});

// ─── Filter ───
export function filterPlans(filters: PlanFilters): PlanWithMetrics[] {
  return allPlansWithMetrics.filter(p => {
    if (filters.operators && filters.operators.length > 0 && !filters.operators.includes(p.operatorId)) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.maxPrice !== null && filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.minPrice !== null && filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.minData !== null && filters.minData !== undefined && (p.dataTotalGb ?? 0) < filters.minData) return false;
    if (filters.minDataPerDay !== null && filters.minDataPerDay !== undefined && (p.dataPerDayGb ?? 0) < filters.minDataPerDay) return false;
    if (filters.minValidity !== null && filters.minValidity !== undefined && p.validityDays < filters.minValidity) return false;
    if (filters.maxValidity !== null && filters.maxValidity !== undefined && p.validityDays > filters.maxValidity) return false;
    if (filters.fiveG === true && !p.fiveG) return false;
    if (filters.unlimited5g === true && !p.unlimited5g) return false;
    if (filters.hasOtt === true && (!p.ottBenefits || p.ottBenefits.length === 0)) return false;
    if (filters.hasVoice === true && !p.voice.toLowerCase().includes('unlimited')) return false;
    if (filters.hasSms === true && !p.smsPerDay) return false;
    if (filters.circleId && p.circleIds.length > 0 && !p.circleIds.includes(filters.circleId)) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.operatorId.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        `₹${p.price}`.includes(q) ||
        `${p.price}`.includes(q) ||
        (p.dataPerDayGb && `${p.dataPerDayGb}gb`.includes(q.replace(/\s/g, ''))) ||
        (p.ottBenefits && p.ottBenefits.some(o => o.toLowerCase().includes(q))) ||
        (p.voice && p.voice.toLowerCase().includes(q)) ||
        `${p.validityDays} days`.includes(q) ||
        `${p.validityDays}days`.includes(q.replace(/\s/g, ''));
      if (!matches) return false;
    }
    return true;
  });
}

// ─── Sort ───
export function sortPlans(plansList: PlanWithMetrics[], sort: SortOption): PlanWithMetrics[] {
  const sorted = [...plansList];
  return sorted.sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'cost_per_day': return (a.costPerDay ?? Infinity) - (b.costPerDay ?? Infinity);
      case 'cost_per_gb': return (a.costPerGb ?? Infinity) - (b.costPerGb ?? Infinity);
      case 'data_desc': return (b.totalData ?? 0) - (a.totalData ?? 0);
      case 'validity_desc': return b.validityDays - a.validityDays;
      case 'recommended': return (b.valueScore ?? 0) - (a.valueScore ?? 0);
      case 'newest': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'oldest': return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      default: return 0;
    }
  });
}

// ─── Search (natural language) ───
export function searchPlans(query: string): PlanWithMetrics[] {
  const filters: PlanFilters = {
    operators: [],
    circleId: null,
    minPrice: null,
    maxPrice: null,
    minValidity: null,
    maxValidity: null,
    minData: null,
    minDataPerDay: null,
    fiveG: null,
    unlimited5g: null,
    hasOtt: null,
    category: null,
    hasVoice: null,
    hasSms: null,
    search: query,
  };

  // Parse natural language patterns
  const q = query.toLowerCase();

  // Operator detection
  if (q.includes('jio')) filters.operators = ['jio'];
  if (q.includes('airtel')) filters.operators = ['airtel'];
  if (q.includes('vi ') || q.includes('vi,') || q === 'vi') filters.operators = ['vi'];
  if (q.includes('bsnl')) filters.operators = ['bsnl'];

  // Price detection: "under 400", "below 300"
  const priceMatch = q.match(/(?:under|below|max|upto|up to|<)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (priceMatch) filters.maxPrice = parseInt(priceMatch[1]);

  // Data detection: "2gb", "2gb/day", "2 gb per day"
  const dataMatch = q.match(/(\d+(?:\.\d+)?)\s*gb\s*(?:\/|per\s*)?\s*day/i);
  if (dataMatch) filters.minDataPerDay = parseFloat(dataMatch[1]);

  // Validity detection: "28 days", "84 days"
  const validityMatch = q.match(/(\d+)\s*days?/i);
  if (validityMatch) filters.minValidity = parseInt(validityMatch[1]);

  // 5G detection
  if (q.includes('5g') || q.includes('unlimited 5g')) {
    filters.fiveG = true;
    if (q.includes('unlimited 5g')) filters.unlimited5g = true;
  }

  // OTT detection
  if (q.includes('ott') || q.includes('netflix') || q.includes('hotstar') || q.includes('prime') || q.includes('sony')) {
    filters.hasOtt = true;
  }

  // Annual detection
  if (q.includes('annual') || q.includes('yearly') || q.includes('365')) {
    filters.category = 'ANNUAL';
  }

  return sortPlans(filterPlans(filters), 'recommended');
}

// ─── By operator ───
export function getPlansForOperator(operatorId: string): PlanWithMetrics[] {
  return allPlansWithMetrics.filter(p => p.operatorId === operatorId);
}

// ─── By category ───
export function getPlansForCategory(category: string): PlanWithMetrics[] {
  return allPlansWithMetrics.filter(p => p.category === category);
}

// ─── Similar plans ───
export function getSimilarPlans(planId: string, limit: number = 4): PlanWithMetrics[] {
  const plan = allPlansWithMetrics.find(p => p.id === planId);
  if (!plan) return [];

  return allPlansWithMetrics
    .filter(p => p.id !== planId && Math.abs(p.price - plan.price) <= 100 && Math.abs(p.validityDays - plan.validityDays) <= 7)
    .sort((a, b) => Math.abs(a.price - plan.price) - Math.abs(b.price - plan.price))
    .slice(0, limit);
}

// ─── Cheaper alternatives ───
export function getCheaperAlternatives(planId: string, limit: number = 4): PlanWithMetrics[] {
  const plan = allPlansWithMetrics.find(p => p.id === planId);
  if (!plan) return [];

  return allPlansWithMetrics
    .filter(p => p.id !== planId && p.price < plan.price && p.validityDays >= plan.validityDays * 0.7)
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
}

// ─── Higher data alternatives ───
export function getHigherDataAlternatives(planId: string, limit: number = 4): PlanWithMetrics[] {
  const plan = allPlansWithMetrics.find(p => p.id === planId);
  if (!plan) return [];

  return allPlansWithMetrics
    .filter(p => p.id !== planId && (p.totalData ?? 0) > (plan.totalData ?? 0) && Math.abs(p.validityDays - plan.validityDays) <= 14)
    .sort((a, b) => (a.costPerGb ?? Infinity) - (b.costPerGb ?? Infinity))
    .slice(0, limit);
}

// ─── Stats ───
export function getPlanStats() {
  const totalPlans = allPlansWithMetrics.length;
  const byOperator = allPlansWithMetrics.reduce((acc, p) => {
    acc[p.operatorId] = (acc[p.operatorId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const minPrice = Math.min(...allPlansWithMetrics.map(p => p.price));
  const maxPrice = Math.max(...allPlansWithMetrics.map(p => p.price));

  return { totalPlans, byOperator, minPrice, maxPrice, lastUpdated: '2026-09-27' };
}

// ─── Find My Plan ───
export function findMyPlan(answers: FindMyPlanAnswers): PlanWithMetrics[] {
  let candidates = [...allPlansWithMetrics];

  if (answers.operator) {
    candidates = candidates.filter(p => p.operatorId === answers.operator);
  }

  if (answers.budget) {
    candidates = candidates.filter(p => p.price <= answers.budget!);
  }

  if (answers.dataPerDay) {
    candidates = candidates.filter(p => (p.dataPerDayGb ?? 0) >= answers.dataPerDay!);
  }

  if (answers.validity) {
    candidates = candidates.filter(p => p.validityDays >= answers.validity!);
  }

  if (answers.needs5g) {
    candidates = candidates.filter(p => p.fiveG);
  }

  if (answers.needsOtt) {
    candidates = candidates.filter(p => p.ottBenefits && p.ottBenefits.length > 0);
  }

  return sortPlans(candidates, 'recommended').slice(0, 10);
}

// ─── Get all plans with metrics ───
export function getAllPlans(): PlanWithMetrics[] {
  return allPlansWithMetrics;
}
