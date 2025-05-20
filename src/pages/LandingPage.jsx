import React from 'react';
import HeaderHeroSection from '../components/sections/HeaderHeroSection'; // adjust path as needed
import FeaturesSection from '../components/sections/FeaturesSection';
import PricingSection from '../components/sections/PricingSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';

export default function LandingPage() {
  return (
    <div>
      <HeaderHeroSection />
      {/* Add more sections like <FeaturesSection />, etc. */}
      <FeaturesSection />
      <PricingSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
