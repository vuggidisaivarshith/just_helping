import { SearchBar } from "@/components/plans/SearchBar";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#F7F8FC] dark:bg-[#0B1020]">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-manrope text-4xl md:text-6xl font-extrabold text-[#0B1020] dark:text-white mb-6 tracking-tight">
          Find the right recharge plan <br className="hidden md:block" />
          <span className="text-[#2563EB]">in seconds.</span>
        </h1>
        <p className="font-inter text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Compare the best mobile prepaid plans across Jio, Airtel, Vi, and BSNL. Discover hidden benefits, calculate true data value, and save money.
        </p>
        
        <div className="flex justify-center mb-8">
          {/* Using a placeholder for SearchBar to handle it simply in this static file, typically would pass a function for routing */}
          <div className="w-full max-w-2xl text-left">
            <SearchBar onSearch={() => {}} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-500 font-inter">
          <span>Popular:</span>
          <a href="/plans?price=299" className="hover:text-[#2563EB] transition-colors">₹299</a>
          <a href="/plans?data=2" className="hover:text-[#2563EB] transition-colors">2GB/Day</a>
          <a href="/plans?validity=84" className="hover:text-[#2563EB] transition-colors">84 Days</a>
          <a href="/plans?category=5g" className="hover:text-[#2563EB] transition-colors">Unlimited 5G</a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
