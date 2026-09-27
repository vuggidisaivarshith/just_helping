import { type Operator } from "../types";

export const operators: Operator[] = [
  {
    id: "jio",
    name: "Reliance Jio",
    slug: "jio",
    displayName: "Jio",
    logo: "/operators/jio.svg",
    color: "#1A73E8",
    colorLight: "#E8F0FE",
    website: "https://www.jio.com",
    rechargeUrl: "https://www.jio.com/selfcare/recharge/",
    supportUrl: "https://www.jio.com/help",
    status: "active",
  },
  {
    id: "airtel",
    name: "Bharti Airtel",
    slug: "airtel",
    displayName: "Airtel",
    logo: "/operators/airtel.svg",
    color: "#E4002B",
    colorLight: "#FDE8EC",
    website: "https://www.airtel.in",
    rechargeUrl: "https://www.airtel.in/recharge-online",
    supportUrl: "https://www.airtel.in/help",
    status: "active",
  },
  {
    id: "vi",
    name: "Vodafone Idea",
    slug: "vi",
    displayName: "Vi",
    logo: "/operators/vi.svg",
    color: "#9B1B85",
    colorLight: "#F5E6F2",
    website: "https://www.myvi.in",
    rechargeUrl: "https://www.myvi.in/recharge",
    supportUrl: "https://www.myvi.in/help",
    status: "active",
  },
  {
    id: "bsnl",
    name: "BSNL",
    slug: "bsnl",
    displayName: "BSNL",
    logo: "/operators/bsnl.svg",
    color: "#F7941D",
    colorLight: "#FEF3E2",
    website: "https://www.bsnl.co.in",
    rechargeUrl: "https://portal.bsnl.in/",
    supportUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/contact_us.html",
    status: "active",
  },
];

export function getOperator(id: string): Operator | undefined {
  return operators.find((o) => o.id === id);
}

export function getOperatorBySlug(slug: string): Operator | undefined {
  return operators.find((o) => o.slug === slug);
}
