import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderHeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="w-60 h-18 rounded-lg flex items-center justify-center ">
          <img src="src/assets/logo-transparent.png" alt="Logo"/>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <a href="#" className="hover:text-pink-600">Home</a>
          <a href="#" className="hover:text-pink-600">Features</a>
          <a href="#" className="hover:text-pink-600">Pricing</a>
          <a href="#" className="hover:text-pink-600">Contact</a>
          <Link
            to="/login"
            className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 font-medium"
          >
            Login
          </Link>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-8 pb-4 space-y-4 text-lg font-medium">
          <a href="#" className="block hover:text-pink-600">Home</a>
          <a href="#" className="block hover:text-pink-600">Features</a>
          <a href="#" className="block hover:text-pink-600">Pricing</a>
          <a href="#" className="block hover:text-pink-600">Contact</a>
          <Link
            to="/login"
            className="block bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 font-medium w-fit"
          >
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Simple Uptime Monitor with Email Alerts
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
          Monitor your website's uptime and receive email alerts whenever it
          goes down. Stay informed and keep your online presence reliable.
        </p>
        <div className="flex justify-center space-x-4 flex-wrap">
          <button className="bg-rose-600 text-white font-semibold px-6 py-3 rounded-md">
            Get Started
          </button>
          <button className="border border-rose-600 text-rose-600 font-semibold px-6 py-3 rounded-md">
            Secondary action
          </button>
        </div>

        {/* Auto-scrolling image carousel */}
        <div className="overflow-hidden w-full mt-12">
          <div className="flex gap-6 w-max animate-carousel">
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src={`https://placehold.co/300x180?text=Image+${i + 1}`}
                alt={`Slide ${i + 1}`}
                className="rounded-lg shadow-lg w-[300px] h-[180px] object-cover"
              />
            ))}
          </div>

          <style>{`
            @keyframes carousel {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            .animate-carousel {
              animation: carousel 20s linear infinite;
            }
          `}</style>
        </div>
      </section>
    </div>
  );
}
