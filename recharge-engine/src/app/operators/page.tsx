import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { operators } from '@/lib/data/operators';
import { getPlanStats } from '@/lib/data/engine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wifi, Shield, Smartphone } from 'lucide-react';

export default function OperatorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Telecom Operators</h1>
            <p className="text-xl text-slate-600">
              Browse plans from India's top telecom providers. We cover all major networks to help you find the best value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {operators.map(operator => {
              const stats = getPlanStats();
              
              return (
                <Card key={operator.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
                  <div className="h-3 w-full" style={{ backgroundColor: operator.color }}></div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-3xl font-bold">{operator.name}</h2>
                      <div className="bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-600">
                        {stats.totalPlans} Plans
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-8 min-h-[48px]">
                      {operator.id === 'jio' ? "India's largest 4G & 5G network with truly unlimited plans." :
                       operator.id === 'airtel' ? "Premium network quality with great international roaming options." :
                       operator.id === 'vi' ? "Hero unlimited benefits including nighttime data and weekend rollover." :
                       "Government-owned network offering the most affordable long-term validity."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                        <div className="text-xl font-bold text-slate-900">₹{stats.minPrice}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-500 mb-1">Premium plans up to</div>
                        <div className="text-xl font-bold text-slate-900">₹{stats.maxPrice}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <h4 className="font-medium text-sm text-slate-500 uppercase tracking-wider">Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-slate-700">
                          <Wifi className="w-4 h-4 mr-3 text-slate-400" />
                          {operator.id === 'bsnl' ? '3G/4G Coverage' : '4G & 5G Coverage'}
                        </li>
                        <li className="flex items-center text-slate-700">
                          <Smartphone className="w-4 h-4 mr-3 text-slate-400" />
                          Prepaid Recharges
                        </li>
                        <li className="flex items-center text-slate-700">
                          <Shield className="w-4 h-4 mr-3 text-slate-400" />
                          Official Partner Links
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full h-12 text-md" style={{ backgroundColor: operator.color }} >
                      <Link href={`/plans?operator=${operator.id}`}>
                        View All {operator.name} Plans <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
