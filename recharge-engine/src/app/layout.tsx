import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
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
  title: "India Recharge – Compare Jio, Airtel, Vi & BSNL Plans",
  description:
    "India's Recharge Comparison Engine. Compare every major mobile network plan – filter by price, data, validity, 5G, OTT and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] bg-[#F7F8FC]">
        {children}
      </body>
    </html>
  );
}
