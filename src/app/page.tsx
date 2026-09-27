import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePageClient from "./HomePageClient";
import { plans } from "@/lib/data/plans";
import { computeMetrics } from "@/lib/data/engine";

export default function HomePage() {
  const featuredPlans = plans
    .map(p => computeMetrics(p))
    .sort((a, b) => (b.valueScore || 0) - (a.valueScore || 0))
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HomePageClient featuredPlans={featuredPlans} />
      </main>
      <Footer />
    </div>
  );
}
