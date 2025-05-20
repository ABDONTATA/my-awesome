
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
          alt="Luxury Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 opacity-0",
              isVisible && "animate-slide-up"
            )}
            style={{ animationDelay: "200ms" }}
          >
            Discover our <span className="text-luxury-gold">bts shope</span>
          </h1>
          
          <p 
            className={cn(
              "text-xl text-luxury-gray mb-8 max-w-lg opacity-0",
              isVisible && "animate-slide-up"
            )}
            style={{ animationDelay: "400ms" }}
          >
            Indulge in our exclusive collection of premium products crafted with exceptional attention to detail and uncompromising quality.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center gap-4 opacity-0",
              isVisible && "animate-slide-up"
            )}
            style={{ animationDelay: "600ms" }}
          >
            <Button className="btn-luxury w-full sm:w-auto text-lg">Ceck Collection</Button>
            <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 w-full sm:w-auto text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
