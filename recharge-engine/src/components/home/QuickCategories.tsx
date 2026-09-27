import Link from "next/link";
import { ArrowRight, Smartphone, Wifi, Globe, Star } from "lucide-react";

export function QuickCategories() {
  const categories = [
    { name: "Under ₹200", href: "/plans?maxPrice=200", icon: Smartphone },
    { name: "Under ₹300", href: "/plans?maxPrice=300", icon: Smartphone },
    { name: "Monthly", href: "/plans?validity=28", icon: Globe },
    { name: "Annual", href: "/plans?validity=365", icon: Globe },
    { name: "Unlimited 5G", href: "/plans?category=5g", icon: Wifi },
    { name: "OTT Plans", href: "/plans?category=ott", icon: Star },
    { name: "Data Packs", href: "/plans?category=data", icon: Wifi },
    { name: "Long Validity", href: "/plans?minValidity=84", icon: Globe },
    { name: "Cheapest Plans", href: "/plans?sort=price_asc", icon: Smartphone },
    { name: "Best Data Value", href: "/plans?sort=value_desc", icon: Star },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0B1020]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold text-[#0B1020] dark:text-white">Quick Categories</h2>
          <Link href="/plans" className="text-[#2563EB] text-sm font-semibold hover:underline flex items-center gap-1 font-inter">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href}>
              <div className="group border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer bg-gray-50 dark:bg-gray-900">
                <cat.icon className="w-6 h-6 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                <span className="font-inter text-sm font-semibold text-center text-gray-700 dark:text-gray-200">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickCategories;
