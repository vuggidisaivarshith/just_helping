import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F8FC] font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#0B1020]">India Recharge</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-[#2563EB]">Compare</a>
              <a href="#" className="text-gray-600 hover:text-[#2563EB]">Plans</a>
              <a href="#" className="text-gray-600 hover:text-[#2563EB]">Operators</a>
              <a href="#" className="text-gray-600 hover:text-[#2563EB]">5G</a>
            </nav>
            <div className="flex items-center">
              <button className="text-[#0B1020] font-medium mr-4">Login</button>
              <button className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1020] mb-4">
            Find the right recharge.<br />
            <span className="text-[#2563EB]">Compare major networks in India.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Jio, Airtel, Vi, and BSNL - Over 400+ plans verified daily.
          </p>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 border border-gray-100">
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option>Budget (e.g. ₹300)</option>
              <option>Under ₹200</option>
              <option>₹200 - ₹400</option>
              <option>₹400 - ₹600</option>
              <option>Above ₹600</option>
            </select>
            
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option>Any Operator</option>
              <option>Jio</option>
              <option>Airtel</option>
              <option>Vi</option>
              <option>BSNL</option>
            </select>
            
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option>Select Circle</option>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Delhi NCR</option>
              <option>Mumbai</option>
            </select>

            <button className="bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              SEARCH
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map((operator) => (
            <div key={operator} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md cursor-pointer transition-shadow">
              <div className="font-bold text-xl text-[#0B1020]">{operator}</div>
              <div className="text-sm text-gray-500 mt-2">View Plans →</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
