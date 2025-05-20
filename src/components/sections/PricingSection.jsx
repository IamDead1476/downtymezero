import React, { useState } from 'react';

export default function PricingSection() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg text-gray-600">Choose the perfect plan for you</p>
        <h2 className="text-4xl font-bold mb-4">Pricing plan</h2>
        <p className="text-gray-500 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Toggle Buttons */}
        <div className="inline-flex border-2 border-[#eb2556] rounded-md mb-10 overflow-hidden">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 font-medium transition-colors ${
              billing === 'monthly'
                ? 'bg-[#eb2556] text-white'
                : 'bg-white text-[#eb2556]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 font-medium transition-colors ${
              billing === 'yearly'
                ? 'bg-[#eb2556] text-white'
                : 'bg-white text-[#eb2556]'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          {/* Basic Plan */}
          <div className="border p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic plan</h3>
              <p className="text-3xl font-bold mb-2">
                {billing === 'monthly' ? '$9.99/month' : '$99/year'}
              </p>
              <p className="text-sm text-gray-500 mb-4">Save 16%</p>
              <ul className="text-left space-y-2 text-sm mb-6">
                <li>✓ 10 Monitors</li>
                <li>✓ Email Alerts</li>
                <li>✓ Basic Support</li>
              </ul>
            </div>
            <button className="mt-auto bg-[#eb2556] text-white font-medium px-4 py-2 rounded hover:scale-105 hover:bg-[#d41d4a] transition-transform duration-200">
              Get Started
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-[#ccc5d8] p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Business plan</h3>
              <p className="text-3xl font-bold mb-2">
                {billing === 'monthly' ? '$29/mo' : '$299/year'}
              </p>
              <p className="text-sm text-gray-800 mb-4">
                or {billing === 'monthly' ? '$299 yearly' : '$29 monthly'}
              </p>
              <ul className="text-left space-y-2 text-sm mb-6">
                <li>✓ 100 Monitors</li>
                <li>✓ Priority Email Alerts</li>
                <li>✓ Team Sharing</li>
              </ul>
            </div>
            <button className="mt-auto bg-[#eb2556] text-white font-medium px-4 py-2 rounded hover:scale-105 hover:bg-[#d41d4a] transition-transform duration-200">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#bfb5cd] p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Enterprise plan</h3>
              <p className="text-3xl font-bold mb-2">
                {billing === 'monthly' ? '$49/mo' : '$499/year'}
              </p>
              <p className="text-sm text-gray-800 mb-4">
                or {billing === 'monthly' ? '$499 yearly' : '$49 monthly'}
              </p>
              <ul className="text-left space-y-2 text-sm mb-6">
                <li>✓ Unlimited Monitors</li>
                <li>✓ SMS + Email Alerts</li>
                <li>✓ Dedicated Support</li>
              </ul>
            </div>
            <button className="mt-auto bg-[#eb2556] text-white font-medium px-4 py-2 rounded hover:scale-105 hover:bg-[#d41d4a] transition-transform duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
