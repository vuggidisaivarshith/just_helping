import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 mb-8">
            At RechargeCompare India, we respect your privacy. This policy outlines how we handle your data when you use our platform.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We do not require you to create an account to use our basic comparison services. When you use our site, we may collect anonymous usage data through cookies and standard web analytics tools to improve our service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Information</h2>
          <p className="mb-4">
            Any usage data collected is used solely to analyze site traffic, improve user experience, and ensure the platform runs smoothly.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Third-Party Links</h2>
          <p className="mb-4">
            Our platform contains links to official telecom operator websites (e.g., Jio, Airtel, Vi, BSNL). Once you click these links to proceed with a recharge, you leave our site. We are not responsible for the privacy practices or content of these third-party websites. Please review their respective privacy policies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Updates to this Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. Any changes will be posted on this page.
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
