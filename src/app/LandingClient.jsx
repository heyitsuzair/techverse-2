"use client";

import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import WhyBooksExchange from "./WhyBooksExchange";
import FeaturedBooks from "./FeaturedBooks";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <WhyBooksExchange />
      <FeaturedBooks />
      <CTASection />
      <Footer />
    </div>
  );
}
