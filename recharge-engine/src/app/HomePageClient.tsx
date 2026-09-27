"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FindMyPlanWidget from "@/components/home/FindMyPlanWidget";
import QuickCategories from "@/components/home/QuickCategories";
import OperatorCards from "@/components/home/OperatorCards";
import PlanCard from "@/components/plans/PlanCard";
import ComparisonTray from "@/components/compare/ComparisonTray";
import { PlanWithMetrics } from "@/lib/types";

export default function HomePageClient({ featuredPlans }: { featuredPlans: PlanWithMetrics[] }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const handleCompareToggle = (planId: string) => {
    setCompareIds(prev => 
      prev.includes(planId) ? prev.filter(id => id !== planId) : [...prev, planId].slice(0, 3)
    );
  };

  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <FindMyPlanWidget />
        <QuickCategories />
        <OperatorCards />
        
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Best Value Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                isCompareSelected={compareIds.includes(plan.id)}
                onCompare={() => handleCompareToggle(plan.id)}
              />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Plans</h3>
              <p className="text-gray-600">Find the perfect recharge plan based on your usage and budget.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Compare Side-by-Side</h3>
              <p className="text-gray-600">Select up to 3 plans to compare their benefits and value score.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Recharge on Official Site</h3>
              <p className="text-gray-600">Get redirected to the operator's official website for a secure recharge.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { q: "Is RechargeCompare free to use?", a: "Yes, our platform is completely free. We help you find the best plan without any hidden charges." },
              { q: "Do you process payments?", a: "No, we redirect you to the official operator website or trusted payment gateways to complete your recharge securely." },
              { q: "How are the Value Scores calculated?", a: "Our proprietary algorithm considers data allowance, validity, and price to give you an objective value rating." },
              { q: "Are the plan details accurate?", a: "We update our database daily to ensure you have the latest information on all recharge plans." },
              { q: "Can I compare plans from different operators?", a: "Yes! You can compare up to 3 plans from any operator side-by-side." },
              { q: "Do you show postpaid plans?", a: "Currently, we only focus on prepaid recharge plans across all major Indian operators." },
              { q: "How do I find a plan for my specific needs?", a: "Use our 'Find My Plan' widget to answer a few quick questions and get personalized recommendations." },
              { q: "Which operators are supported?", a: "We support all major Indian operators including Jio, Airtel, Vi, and BSNL." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-lg shadow-sm border border-gray-100">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180 text-gray-500">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-2 p-5 pt-0">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="text-center text-sm text-gray-500 py-8 border-t border-gray-200">
          <p>Disclaimer: Plan details and pricing are subject to change by the respective operators. We recommend verifying the details on the operator's official website before recharging. We are not responsible for any discrepancies or failed recharges.</p>
        </section>
      </div>

      <ComparisonTray 
        plans={compareIds.map(id => featuredPlans.find(p => p.id === id)).filter(Boolean) as PlanWithMetrics[]} 
        onRemove={(id: string) => handleCompareToggle(id)}
        onClear={() => setCompareIds([])}
      />
    </>
  );
}
