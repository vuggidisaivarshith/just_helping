'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { findMyPlan } from '@/lib/data/engine';
import { computeMetrics } from '@/lib/data/engine';
import { PlanGrid } from '@/components/plans/PlanGrid';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operators } from '@/lib/data/operators';
import { FindMyPlanAnswers } from '@/lib/types';
import { ChevronRight, ChevronLeft, Check, Sparkles, AlertCircle, Search } from 'lucide-react';

const STEPS = [
  { id: 'operator', title: 'Which operator?' },
  { id: 'budget', title: 'What is your budget?' },
  { id: 'data', title: 'Daily data need?' },
  { id: 'validity', title: 'Preferred validity?' },
  { id: '5g', title: 'Do you need 5G?' },
  { id: 'ott', title: 'Do you need OTT apps?' },
  { id: 'priority', title: 'What is most important?' },
];

export default function FindMyPlanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FindMyPlanAnswers>>({});
  const [results, setResults] = useState<any[] | null>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      finish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const handleSkip = () => {
    handleNext();
  };

  const updateAnswer = (key: keyof FindMyPlanAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const finish = () => {
    const plansWithScores = findMyPlan(answers as FindMyPlanAnswers);
    setResults(plansWithScores);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${answers.operator === undefined ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`}
              onClick={() => { updateAnswer('operator', null); setTimeout(handleNext, 300); }}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <span className="font-semibold">Any Operator</span>
              </CardContent>
            </Card>
            {operators.map(op => (
              <Card 
                key={op.id}
                className={`cursor-pointer transition-all ${answers.operator === op.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50'}`}
                onClick={() => { updateAnswer('operator', op.id); setTimeout(handleNext, 300); }}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-12 h-12 rounded-full mb-3" style={{ backgroundColor: op.color }}></div>
                  <span className="font-semibold">{op.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="px-4 py-8">
            <h3 className="text-4xl font-bold text-center mb-12 text-primary">₹{answers.budget || 1000}</h3>
            <Slider
              value={[answers.budget || 1000]}
              onValueChange={(val: any) => updateAnswer('budget', (val[0] as number) as number)}
              max={4000}
              step={50}
              className="mb-8"
            />
            <div className="flex justify-between text-sm text-slate-500">
              <span>₹0</span>
              <span>₹4000</span>
            </div>
          </div>
        );
      case 2:
        const dataOpts = [
          { label: 'No Data', value: 0 },
          { label: '< 1GB', value: 0.5 },
          { label: '1GB', value: 1 },
          { label: '1.5GB', value: 1.5 },
          { label: '2GB', value: 2 },
          { label: '2.5GB', value: 2.5 },
          { label: '3GB+', value: 3 },
        ];
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataOpts.map(opt => (
              <Button
                key={opt.label}
                variant={answers.dataPerDay === opt.value ? 'default' : 'outline'}
                className="h-16 text-lg"
                onClick={() => { updateAnswer('dataPerDay', opt.value); setTimeout(handleNext, 300); }}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        );
      case 3:
        const valOpts = [
          { label: '1 Day', value: 1 },
          { label: '7 Days', value: 7 },
          { label: '28 Days', value: 28 },
          { label: '56 Days', value: 56 },
          { label: '84 Days', value: 84 },
          { label: '180+ Days', value: 180 },
          { label: '365 Days', value: 365 },
        ];
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {valOpts.map(opt => (
              <Button
                key={opt.label}
                variant={answers.validity === opt.value ? 'default' : 'outline'}
                className="h-16 text-lg"
                onClick={() => { updateAnswer('validity', opt.value); setTimeout(handleNext, 300); }}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <Card 
              className={`cursor-pointer transition-all ${answers.needs5g === true ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => { updateAnswer('needs5g', true); setTimeout(handleNext, 300); }}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <span className="text-3xl mb-4">🚀</span>
                <span className="font-semibold text-lg">Yes, I need 5G</span>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer transition-all ${answers.needs5g === false ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => { updateAnswer('needs5g', false); setTimeout(handleNext, 300); }}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <span className="text-3xl mb-4">📱</span>
                <span className="font-semibold text-lg">4G is fine</span>
              </CardContent>
            </Card>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <Card 
              className={`cursor-pointer transition-all ${answers.needsOtt === true ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => { updateAnswer('needsOtt', true); setTimeout(handleNext, 300); }}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <span className="text-3xl mb-4">🎬</span>
                <span className="font-semibold text-lg">Yes, I want OTT</span>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer transition-all ${answers.needsOtt === false ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => { updateAnswer('needsOtt', false); setTimeout(handleNext, 300); }}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <span className="text-3xl mb-4">✖️</span>
                <span className="font-semibold text-lg">No, not needed</span>
              </CardContent>
            </Card>
          </div>
        );
      case 6:
        const prioOpts: { label: string, value: NonNullable<FindMyPlanAnswers['priority']> }[] = [
          { label: 'Lowest Price', value: 'price' },
          { label: 'Maximum Data', value: 'data' },
          { label: 'Longest Validity', value: 'validity' },
          { label: 'Best Value (Lowest ₹/GB)', value: 'value' },
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {prioOpts.map(opt => (
              <Button
                key={opt.value}
                variant={answers.priority === opt.value ? 'default' : 'outline'}
                className="h-16 text-lg justify-start px-6"
                onClick={() => { updateAnswer('priority', opt.value); setTimeout(handleNext, 300); }}
              >
                {answers.priority === opt.value && <Check className="w-5 h-5 mr-3" />}
                {opt.label}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (results) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100 border-none px-4 py-1"><Sparkles className="w-4 h-4 mr-2"/> Matches Found</Badge>
            <h1 className="text-4xl font-bold mb-4">Your Perfect Plans</h1>
            <p className="text-slate-600 text-lg">
              Based on your preferences, here are the top recommendations tailored for you.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => { setResults(null); setCurrentStep(0); setAnswers({}); }}>
              Start Over
            </Button>
          </div>

          {results.length > 0 ? (
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 text-primary font-semibold mb-6">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center">1</span>
                  <h2 className="text-2xl text-slate-900">Top Match</h2>
                </div>
                <div className="max-w-md">
                  <PlanGrid plans={[computeMetrics(results[0].plan)]} compareIds={[]} onToggleCompare={() => {}} />
                </div>
                <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                  <p className="font-medium text-slate-700 mb-2">Why this plan matches:</p>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {results[0].reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>

              {results.length > 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Other Great Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.slice(1).map((r, i) => (
                      <div key={i} className="flex flex-col">
                        <PlanGrid plans={[computeMetrics(r.plan)]} compareIds={[]} onToggleCompare={() => {}} />
                        <div className="mt-4 bg-white p-4 rounded-lg border border-slate-200 text-sm flex-1">
                          <p className="font-medium text-slate-700 mb-2">Why this plan matches:</p>
                          <ul className="space-y-1 text-slate-600 list-disc list-inside">
                            {r.reasons.map((reason: string, idx: number) => <li key={idx}>{reason}</li>)}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No exact matches found</h2>
              <p className="text-slate-600 mb-6">Try adjusting your filters to see more results.</p>
              <Button onClick={() => { setResults(null); setCurrentStep(0); }}>Try Again</Button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="h-2 bg-slate-100 w-full">
            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Step {currentStep + 1} of {STEPS.length}</h2>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{STEPS[currentStep].title}</h1>
            </div>

            <div className="min-h-[300px] flex flex-col justify-center">
              {renderStep()}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleSkip}>
                  Skip
                </Button>
                {currentStep === STEPS.length - 1 ? (
                  <Button onClick={finish} className="px-8">
                    Find My Plan <Search className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="px-8">
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
