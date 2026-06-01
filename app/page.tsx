"use client";

import { useCallback, useState } from "react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import PrintPing from "@/components/PrintPing";
import Training from "@/components/Training";
import { ServicePackage } from "@/lib/packages";

export default function Home() {
  const [printerCount, setPrinterCount] = useState(3);
  const [isFleetPricing, setIsFleetPricing] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [prefillSubject, setPrefillSubject] = useState("General Enquiry");
  const [prefillPrinters, setPrefillPrinters] = useState(3);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleQuote = () => {
    setPrefillSubject("General Enquiry");
    scrollToSection("contact");
  };

  const handlePackages = () => {
    scrollToSection("packages");
  };

  const handlePrinterCountChange = (count: number, fleet: boolean) => {
    setPrinterCount(count);
    setIsFleetPricing(fleet);
    setPrefillPrinters(count);
    if (fleet) {
      setPrefillSubject("Fleet Pricing");
    }
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedPackageId(pkg.id);
    setPrefillSubject(pkg.name);
    setPrefillPrinters(printerCount);
    scrollToSection("contact");
  };

  const handleHighlightPackage = (id: string) => {
    setSelectedPackageId(id);
  };

  const handlePrintPing = () => {
    setPrefillSubject("PrintPing Enquiry");
    scrollToSection("contact");
  };

  return (
    <div className="relative">
      <Navbar onNavigate={scrollToSection} onQuote={handleQuote} />
      <main>
        <Hero onPackages={handlePackages} onQuote={handleQuote} />
        <Packages
          printerCount={printerCount}
          isFleetPricing={isFleetPricing}
          selectedPackageId={selectedPackageId}
          onPrinterCountChange={handlePrinterCountChange}
          onHighlightPackage={handleHighlightPackage}
          onSelectPackage={handleSelectPackage}
        />
        <PrintPing onEnquiry={handlePrintPing} />
        <Training />
        <HowItWorks />
        <ContactForm
          prefillSubject={prefillSubject}
          prefillPrinters={prefillPrinters}
        />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
