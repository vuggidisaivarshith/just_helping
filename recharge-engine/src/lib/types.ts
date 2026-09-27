// ─── Core domain types for the India Recharge Platform ───

export interface Operator {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  logo: string;
  color: string;
  colorLight: string;
  website: string;
  rechargeUrl: string;
  supportUrl: string;
  status: "active" | "inactive";
}

export interface Circle {
  id: string;
  name: string;
  slug: string;
  state: string;
  region: string;
  status: "active" | "inactive";
}

export type PlanCategory =
  | "UNLIMITED"
  | "DATA"
  | "TALKTIME"
  | "SMS"
  | "ANNUAL"
  | "LONG_VALIDITY"
  | "OTT"
  | "COMBO"
  | "TOPUP"
  | "INTERNATIONAL"
  | "SPECIAL";

export type DataType =
  | "FIXED"
  | "DAILY"
  | "UNLIMITED"
  | "NIGHT_UNLIMITED"
  | "5G_UNLIMITED"
  | "ADDON"
  | "NONE";

export type PlanStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "EXPIRED"
  | "NEEDS_VERIFICATION"
  | "SAMPLE";

export interface Plan {
  id: string;
  operatorId: string;
  name: string;
  category: PlanCategory;
  price: number;
  validityDays: number;
  dataTotalGb: number | null;
  dataPerDayGb: number | null;
  dataType: DataType;
  voice: string; // "Unlimited", "100 min", "Talktime", "None"
  smsPerDay: number | null;
  smsTotal: number | null;
  unlimited5g: boolean;
  fiveG: boolean;
  ottBenefits: string[];
  appBenefits: string[];
  additionalBenefits: string[];
  description: string;
  rechargeUrl: string;
  sourceUrl: string;
  circleIds: string[]; // empty = all circles
  status: PlanStatus;
  lastVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Computed values ───

export interface PlanWithMetrics extends Plan {
  operator: Operator;
  costPerDay: number | null;
  costPerGb: number | null;
  totalData: number | null;
  valueScore: number | null;
  badges: PlanBadge[];
}

export type PlanBadge =
  | "CHEAPEST"
  | "BEST_VALUE"
  | "BEST_DATA"
  | "LONG_VALIDITY"
  | "UNLIMITED_5G"
  | "OTT"
  | "POPULAR"
  | "NEW";

// ─── Filter / search ───

export interface PlanFilters {
  operators: string[];
  circleId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minValidity: number | null;
  maxValidity: number | null;
  minData: number | null;
  minDataPerDay: number | null;
  fiveG: boolean | null;
  unlimited5g: boolean | null;
  hasOtt: boolean | null;
  category: PlanCategory | null;
  hasVoice: boolean | null;
  hasSms: boolean | null;
  search: string;
}

export type SortOption =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "cost_per_day"
  | "cost_per_gb"
  | "data_desc"
  | "validity_desc"
  | "newest"
  | "oldest";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "cost_per_day", label: "₹/Day: Low → High" },
  { value: "cost_per_gb", label: "₹/GB: Low → High" },
  { value: "data_desc", label: "Data: High → Low" },
  { value: "validity_desc", label: "Validity: Longest" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

// ─── Comparison ───

export interface ComparisonState {
  planIds: string[];
}

// ─── Find My Plan wizard ───

export interface FindMyPlanAnswers {
  operator: string | null;
  budget: number | null;
  dataPerDay: number | null;
  validity: number | null;
  needs5g: boolean | null;
  needsOtt: boolean | null;
  priority: string | null;
}

// ─── Admin ───

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: unknown;
  newValue: unknown;
  timestamp: string;
}
