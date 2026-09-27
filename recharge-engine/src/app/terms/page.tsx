import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 mb-8">
            Please read these terms carefully before using RechargeCompare India. By accessing our platform, you agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Nature of Service</h2>
          <p className="mb-4">
            RechargeCompare India is an independent informational platform designed to help users compare mobile recharge plans from various telecom operators in India. We do not process payments, nor do we directly sell recharge plans.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Accuracy of Information</h2>
          <p className="mb-4">
            While we make every effort to ensure the plan details, prices, and benefits displayed on our site are accurate and up-to-date, telecom operators frequently update their tariffs. We do not guarantee the absolute accuracy of the data. Users are strongly advised to verify the exact plan details on the official operator website before making any payment.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. External Links</h2>
          <p className="mb-4">
            Our service provides outbound links to telecom operator websites to facilitate your recharge process. We are not affiliated with these operators, and we hold no liability for any transaction failures, billing issues, or disputes that may occur on their platforms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            RechargeCompare India shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of our platform or reliance on the information provided herein.
          </p>

          <p className="text-sm text-slate-500 mt-12 pt-8 border-t border-slate-200">
            Last updated: October 2023
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
