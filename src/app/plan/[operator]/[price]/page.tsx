import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlanGrid } from '@/components/plans/PlanGrid';
import { plans } from '@/lib/data/plans';
import { getOperator, getOperatorBySlug } from '@/lib/data/operators';
import { computeMetrics, getSimilarPlans, getCheaperAlternatives, getHigherDataAlternatives } from '@/lib/data/engine';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldAlert, ArrowLeft, ExternalLink, Zap, Signal, MessageSquare, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { operator: operatorSlug, price } = await params;
  const operator = getOperatorBySlug(operatorSlug);
  if (!operator) return { title: 'Plan Not Found' };
  
  return {
    title: `${operator.name} ₹${price} Recharge Plan Details`,
    description: `Details for ${operator.name} ₹${price} recharge plan.`
  };
}

export default async function PlanDetailPage({ params }: { params: any }) {
  const { operator: operatorSlug, price } = await params;
  const operator = getOperatorBySlug(operatorSlug);
  
  if (!operator) {
    notFound();
  }

  const rawPlan = plans.find(p => p.operatorId === operator.id && p.price === parseInt(price));
  
  if (!rawPlan) {
    notFound();
  }

  const plan = computeMetrics(rawPlan);
  const similarPlans = getSimilarPlans(rawPlan.id).slice(0, 3);
  const cheaperPlans = getCheaperAlternatives(rawPlan.id).slice(0, 3);
  const higherDataPlans = getHigherDataAlternatives(rawPlan.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/plans" className="hover:text-primary transition-colors">Plans</Link>
          <span className="mx-2">›</span>
          <Link href={`/operators`} className="hover:text-primary transition-colors">{operator.name}</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 font-medium">₹{plan.price}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-2" style={{ borderColor: operator.color + '40' }}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Badge style={{ backgroundColor: operator.color }} className="text-white hover:opacity-90">
                    {operator.name}
                  </Badge>
                  {plan.badges.includes("POPULAR") && <Badge variant="secondary">Popular Plan</Badge>}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-2">₹{plan.price}</h1>
                    <p className="text-lg text-slate-600">{plan.validityDays} Days Validity</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-semibold">{(plan.dataTotalGb || 0) === -1 ? 'Truly Unlimited' : (plan.dataTotalGb || 0) === 0 ? 'No Data' : (plan.dataTotalGb || 0) > 100 ? `${(plan.dataTotalGb || 0)} GB Total` : `${(plan.dataTotalGb || 0)} GB/Day`}</p>
                    <p className="text-slate-500">Data Benefit</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 mb-1">Cost / Day</span>
                    <span className="font-medium">₹{(plan.costPerDay || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 mb-1">Cost / GB</span>
                    <span className="font-medium">{plan.costPerGb === 0 ? 'N/A' : `₹${(plan.costPerGb || 0).toFixed(2)}`}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 mb-1">Voice</span>
                    <span className="font-medium">{plan.voice}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 mb-1">SMS</span>
                    <span className="font-medium">{plan.smsPerDay}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-lg">Plan Benefits</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1.5"><Phone className="w-4 h-4" /> {plan.voice} Calls</Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1.5"><Signal className="w-4 h-4" /> {(plan.dataTotalGb || 0) === -1 ? 'Unlimited' : (plan.dataTotalGb || 0)} {(plan.dataTotalGb || 0) > 100 ? 'GB' : 'GB/Day'}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 py-1.5"><MessageSquare className="w-4 h-4" /> {plan.smsPerDay} SMS</Badge>
                    {plan.fiveG && <Badge variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-1.5 py-1.5"><Zap className="w-4 h-4" /> Unlimited 5G</Badge>}
                  </div>
                </div>

                {plan.ottBenefits && plan.ottBenefits.length > 0 && (
                  <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-lg">OTT Subscriptions included</h3>
                    <div className="flex flex-wrap gap-2">
                      {plan.ottBenefits.map((ott, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm">{ott}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 text-blue-900 p-4 rounded-lg flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Important Information</h4>
                    <p className="text-sm opacity-90">{plan.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Value Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <span className="text-5xl font-bold text-primary">{Math.round(plan.valueScore || 0)}</span>
                    <span className="text-2xl text-slate-400">/100</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-slate-600 mb-4">This score is calculated based on:</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Cost efficiency (₹/GB and ₹/Day)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Additional benefits like OTT</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 5G availability</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Overall validity duration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button className="w-full h-14 text-lg">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Recharge Now <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  You will be redirected to the official {operator.name} website.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {similarPlans.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Similar Plans You Might Like</h2>
            <PlanGrid plans={similarPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />
          </section>
        )}

        {cheaperPlans.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Cheaper Alternatives</h2>
            <PlanGrid plans={cheaperPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />
          </section>
        )}

        {higherDataPlans.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Plans with More Data</h2>
            <PlanGrid plans={higherDataPlans.map(computeMetrics)} compareIds={[]} onToggleCompare={()=>{}} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
