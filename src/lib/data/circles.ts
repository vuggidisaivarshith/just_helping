import { type Circle } from "../types";

export const circles: Circle[] = [
  { id: "all-india", name: "All India", slug: "all-india", state: "All", region: "National", status: "active" },
  { id: "andhra-pradesh-telangana", name: "Andhra Pradesh & Telangana", slug: "andhra-pradesh-telangana", state: "Andhra Pradesh / Telangana", region: "South", status: "active" },
  { id: "assam", name: "Assam", slug: "assam", state: "Assam", region: "North East", status: "active" },
  { id: "bihar-jharkhand", name: "Bihar & Jharkhand", slug: "bihar-jharkhand", state: "Bihar / Jharkhand", region: "East", status: "active" },
  { id: "delhi", name: "Delhi", slug: "delhi", state: "Delhi", region: "North", status: "active" },
  { id: "gujarat", name: "Gujarat", slug: "gujarat", state: "Gujarat", region: "West", status: "active" },
  { id: "himachal-pradesh", name: "Himachal Pradesh", slug: "himachal-pradesh", state: "Himachal Pradesh", region: "North", status: "active" },
  { id: "haryana", name: "Haryana", slug: "haryana", state: "Haryana", region: "North", status: "active" },
  { id: "jammu-kashmir", name: "Jammu & Kashmir", slug: "jammu-kashmir", state: "Jammu & Kashmir", region: "North", status: "active" },
  { id: "karnataka", name: "Karnataka", slug: "karnataka", state: "Karnataka", region: "South", status: "active" },
  { id: "kerala", name: "Kerala", slug: "kerala", state: "Kerala", region: "South", status: "active" },
  { id: "kolkata", name: "Kolkata", slug: "kolkata", state: "West Bengal", region: "East", status: "active" },
  { id: "madhya-pradesh-chhattisgarh", name: "Madhya Pradesh & Chhattisgarh", slug: "madhya-pradesh-chhattisgarh", state: "Madhya Pradesh / Chhattisgarh", region: "Central", status: "active" },
  { id: "maharashtra-goa", name: "Maharashtra & Goa", slug: "maharashtra-goa", state: "Maharashtra / Goa", region: "West", status: "active" },
  { id: "mumbai", name: "Mumbai", slug: "mumbai", state: "Maharashtra", region: "West", status: "active" },
  { id: "north-east", name: "North East", slug: "north-east", state: "North East States", region: "North East", status: "active" },
  { id: "odisha", name: "Odisha", slug: "odisha", state: "Odisha", region: "East", status: "active" },
  { id: "punjab", name: "Punjab", slug: "punjab", state: "Punjab", region: "North", status: "active" },
  { id: "rajasthan", name: "Rajasthan", slug: "rajasthan", state: "Rajasthan", region: "North", status: "active" },
  { id: "tamil-nadu", name: "Tamil Nadu", slug: "tamil-nadu", state: "Tamil Nadu", region: "South", status: "active" },
  { id: "up-east", name: "Uttar Pradesh East", slug: "up-east", state: "Uttar Pradesh", region: "North", status: "active" },
  { id: "up-west", name: "Uttar Pradesh West", slug: "up-west", state: "Uttar Pradesh", region: "North", status: "active" },
  { id: "uttarakhand", name: "Uttarakhand", slug: "uttarakhand", state: "Uttarakhand", region: "North", status: "active" },
  { id: "west-bengal", name: "West Bengal", slug: "west-bengal", state: "West Bengal", region: "East", status: "active" },
];

export function getCircle(id: string): Circle | undefined {
  return circles.find((c) => c.id === id);
}

export function getCircleBySlug(slug: string): Circle | undefined {
  return circles.find((c) => c.slug === slug);
}
