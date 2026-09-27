import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RechargeCompare India – Compare Jio, Airtel, Vi & BSNL Recharge Plans",
  description:
    "India's Recharge Comparison Engine. Compare prepaid plans from Jio, Airtel, Vi and BSNL by price, data, validity, 5G, OTT and benefits. Find the cheapest plan, best data value, and more.",
  keywords: [
    "recharge plans",
    "Jio plans",
    "Airtel plans",
    "Vi plans",
    "BSNL plans",
    "prepaid recharge",
    "compare recharge plans",
    "5G plans",
    "OTT plans",
    "cheapest recharge",
    "best data plan India",
  ],
  openGraph: {
    title: "RechargeCompare India – Compare. Choose. Recharge Smarter.",
    description:
      "Compare prepaid recharge plans from Jio, Airtel, Vi and BSNL. Find the best plan for your budget.",
    type: "website",
    locale: "en_IN",
    siteName: "RechargeCompare India",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
