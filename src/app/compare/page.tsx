'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ComparisonTable } from '@/components/compare/ComparisonTable';
import { plans, getPlanById } from '@/lib/data/plans';
import { computeMetrics } from '@/lib/data/engine';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const planIds = searchParams.get('plans')?.split(',').filter(Boolean) || [];
  
  const selectedPlans = planIds
    .map(id => getPlanById(id))
    .filter(Boolean)
    .map(p => computeMetrics(p!));

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Recharge Plans</h1>
          <p className="text-slate-600">See side-by-side details to find your best fit.</p>
        </div>
        
        {selectedPlans.length > 0 && (
          <div className="flex items-center gap-3">
            <Link href="/plans">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add More Plans
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Clear All
              </Button>
            </Link>
          </div>
        )}
      </div>

      {selectedPlans.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center max-w-2xl mx-auto">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No plans selected for comparison</h2>
          <p className="text-slate-600 mb-6">
            Go to the plans page and select up to 4 plans to compare their benefits side-by-side.
          </p>
          <Link href="/plans">
            <Button>Browse Plans</Button>
          </Link>
        </div>
      ) : (
        <ComparisonTable plans={selectedPlans} onRemove={(id) => {}} />
      )}
    </main>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Suspense fallback={<div className="flex-1 container mx-auto px-4 py-8">Loading...</div>}>
        <CompareContent />
      </Suspense>
      <Footer />
    </div>
  );
}
