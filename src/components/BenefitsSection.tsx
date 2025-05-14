
import React, { useEffect, useState } from "react";
import { Truck, CreditCard, Package, ShieldCheck } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function Benefit({ icon, title, description, delay }: BenefitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "flex flex-col items-center text-center p-6 luxury-card rounded-xl opacity-0 transform translate-y-10",
        isVisible && "opacity-100 translate-y-0 transition-all duration-700"
      )}
    >
      <div className="w-16 h-16 rounded-full bg-luxury-purple/10 flex items-center justify-center mb-4">
        <div className="text-luxury-gold">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-luxury-gray">{description}</p>
    </div>
  );
}

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Shipping",
      description: "Free worldwide shipping on all orders over $100. Delivered with care in premium packaging.",
      delay: 0,
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Multiple payment options with bank-level security and encryption for your peace of mind.",
      delay: 200,
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Crafted with exceptional materials and meticulous attention to every fine detail.",
      delay: 400,
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Satisfaction Guarantee",
      description: "Not completely satisfied? Return within 30 days for a full refund. No questions asked.",
      delay: 600,
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose <span className="text-luxury-gold">LUXE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Benefit 
              key={index} 
              icon={benefit.icon} 
              title={benefit.title} 
              description={benefit.description} 
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
