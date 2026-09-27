import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Search, Zap, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-slate-50 py-20 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">About RechargeCompare India</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We help Indian mobile users find the best recharge plan by making comparison simple, transparent, and completely unbiased.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto space-y-20">
            
            <section className="text-center">
              <h2 className="text-3xl font-bold mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Search & Filter</h3>
                  <p className="text-slate-600">Find plans tailored to your needs across all major telecom operators in India.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Compare Benefits</h3>
                  <p className="text-slate-600">Compare data, validity, calling benefits, and OTT subscriptions side-by-side.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Recharge Smartly</h3>
                  <p className="text-slate-600">Click to recharge securely on the official operator website.</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-50 p-8 md:p-12 rounded-3xl">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-6">Our Data Quality Commitment</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We know how frustrating it is to find a plan online only to discover the price has changed or the benefits are different. That's why we built a robust engine that regularly checks and validates plan data from official operator sources.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Our platform automatically flags outdated information and ensures you are always looking at the most current tariffs for Jio, Airtel, Vi, and BSNL.
                  </p>
                </div>
                <div className="flex-1">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8 text-center flex flex-col items-center">
                      <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
                      <h4 className="text-xl font-bold mb-2">Unbiased & Transparent</h4>
                      <p className="text-sm text-slate-500">We don't take commissions to promote specific plans. Our recommendations are purely based on mathematical value and your preferences.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="text-sm text-slate-500 border-t border-slate-200 pt-12">
              <h4 className="font-semibold text-slate-700 mb-2">Disclaimer</h4>
              <p>
                While we strive to keep all plan details 100% accurate and up-to-date, telecom operators frequently change their tariffs without prior notice. The plans displayed on RechargeCompare India are for informational purposes. Please verify the exact details, validity, and terms on the respective operator's official website or app before making a payment. We are an independent comparison platform and are not affiliated with any telecom operator.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
