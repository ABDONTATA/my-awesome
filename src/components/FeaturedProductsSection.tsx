
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isVisible, setIsVisible] = useState(false);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const PRODUCTS_PER_VIEW = 4; // Desktop default

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Elegance Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      price: 4999,
      category: "Watches",
      isNew: true,
    },
    {
      id: 2,
      name: "Sapphire Teardrop Pendant",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      price: 2499,
      category: "Jewelry",
    },
    {
      id: 3,
      name: "Leather Weekend Duffle",
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      price: 1299,
      category: "Accessories",
      isNew: true,
    },
    {
      id: 4,
      name: "Gold Twisted Bracelet",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
      price: 1899,
      category: "Jewelry",
    },
    {
      id: 5,
      name: "Midnight Essence Perfume",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569",
      price: 399,
      category: "Fragrances",
    },
    {
      id: 6,
      name: "Vintage Chronograph",
      image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a",
      price: 3699,
      category: "Watches",
      isNew: true,
    },
    {
      id: 7,
      name: "Silk Evening Scarf",
      image: "https://images.unsplash.com/photo-1585914924626-15adac1e6402",
      price: 299,
      category: "Accessories",
    },
    {
      id: 8,
      name: "Emerald Drop Earrings",
      image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76",
      price: 2199,
      category: "Jewelry",
    },
  ];

  const scrollToNext = () => {
    if (!sliderRef.current) return;
    const nextIndex = Math.min(currentIndex + 1, featuredProducts.length - PRODUCTS_PER_VIEW);
    setCurrentIndex(nextIndex);
  };

  const scrollToPrev = () => {
    if (!sliderRef.current) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };
  
  // Determine visible products based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return PRODUCTS_PER_VIEW;
    
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 4; // Desktop
  };
  
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex justify-between items-center mb-12 opacity-0 transform -translate-y-10",
            isVisible && "opacity-100 transform translate-y-0 transition-all duration-500"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-luxury-gold">Products</span>
          </h2>
          <div className="hidden md:flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToPrev}
              disabled={currentIndex === 0}
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 disabled:opacity-50"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToNext}
              disabled={currentIndex >= featuredProducts.length - getVisibleCount()}
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        {/* Desktop & Tablet Slider */}
        <div className="hidden sm:block overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / getVisibleCount())}%)`,
            }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "min-w-[25%] sm:min-w-[50%] lg:min-w-[25%] p-3 opacity-0 transform translate-y-10",
                  isVisible && "opacity-100 translate-y-0 transition-all duration-700",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Grid */}
        <div className="sm:hidden grid grid-cols-1 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "opacity-0 transform translate-y-10",
                isVisible && "opacity-100 translate-y-0 transition-all duration-700",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div
          className={cn(
            "flex justify-center mt-12 opacity-0 transform translate-y-10",
            isVisible && "opacity-100 transform translate-y-0 transition-all duration-700"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <Button className="btn-luxury">View All Products</Button>
        </div>
      </div>
    </section>
  );
}
