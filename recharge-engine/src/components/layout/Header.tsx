"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // Should be hooked up to next-themes

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-[#F7F8FC] text-[#0B1020] dark:bg-[#0B1020] dark:text-[#F7F8FC] transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-manrope font-bold text-2xl text-[#2563EB]">
            RechargeCompare
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-inter text-sm font-medium">
            <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <Link href="/plans" className="hover:text-[#2563EB] transition-colors">Plans</Link>
            <Link href="/compare" className="hover:text-[#2563EB] transition-colors">Compare</Link>
            <Link href="/find-my-plan" className="hover:text-[#2563EB] transition-colors">Find My Plan</Link>
            <Link href="/operators" className="hover:text-[#2563EB] transition-colors">Operators</Link>
            <Link href="/about" className="hover:text-[#2563EB] transition-colors">About</Link>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-[#2563EB]">
              Select Circle <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown would go here */}
          </div>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#F7F8FC] dark:bg-[#0B1020] border-b border-gray-100 p-4 shadow-lg flex flex-col gap-4 font-inter text-base">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/plans" onClick={() => setIsOpen(false)}>Plans</Link>
          <Link href="/compare" onClick={() => setIsOpen(false)}>Compare</Link>
          <Link href="/find-my-plan" onClick={() => setIsOpen(false)}>Find My Plan</Link>
          <Link href="/operators" onClick={() => setIsOpen(false)}>Operators</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
