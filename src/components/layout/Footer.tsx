import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-[#0B1020] dark:bg-[#0B1020] dark:border-gray-800 dark:text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-inter mb-8">
          <div>
            <h3 className="font-manrope font-bold text-lg mb-4 text-[#2563EB]">Operators</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/plans/jio" className="hover:text-[#1A73E8]">Jio Plans</Link></li>
              <li><Link href="/plans/airtel" className="hover:text-[#E4002B]">Airtel Plans</Link></li>
              <li><Link href="/plans/vi" className="hover:text-[#9B1B85]">Vi Plans</Link></li>
              <li><Link href="/plans/bsnl" className="hover:text-[#F7941D]">BSNL Plans</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/plans?category=5g" className="hover:text-[#2563EB]">5G Plans</Link></li>
              <li><Link href="/plans?category=ott" className="hover:text-[#2563EB]">OTT Plans</Link></li>
              <li><Link href="/plans?category=data" className="hover:text-[#2563EB]">Data Packs</Link></li>
              <li><Link href="/plans?category=annual" className="hover:text-[#2563EB]">Annual Plans</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-lg mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/calculator" className="hover:text-[#2563EB]">Cost/GB Calculator</Link></li>
              <li><Link href="/find-my-plan" className="hover:text-[#2563EB]">Plan Finder</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-manrope font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#2563EB]">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2563EB]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#2563EB]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 text-xs text-gray-500 text-center">
          <p className="mb-2">Disclaimer: Plan details are sourced from respective operator websites and are subject to change. Please verify on the official operator website before recharging.</p>
          <p>&copy; {new Date().getFullYear()} RechargeCompare India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
