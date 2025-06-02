import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProductsSection } from "@/pages/ProductsFolder/FeaturedProductsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Admin/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      toast("Welcome to LUXE", {
        description: "Discover our exclusive collection of luxury products.",
      });
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <BenefitsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
