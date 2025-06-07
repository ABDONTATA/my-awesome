import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/pages/ProductsFolder/ProductCard";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProduct } from "@/Contexts/ProductsProvider";
interface CategoryInfo  {
  name: string;
}

interface ProductView {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  isNew: boolean;
  inStock: boolean;
  category: CategoryInfo;
}
export function FeaturedProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isVisible, setIsVisible] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const PRODUCTS_PER_VIEW = 4; 

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const [featuredProducts, setFeaturedProducts] = useState<ProductView[]>([]);
  const {getProductsList} = useProduct()!;

  const scrollToNext = () => {
    if (!sliderRef.current) return;
    const nextIndex = Math.min(
      currentIndex + 1,
      featuredProducts.length - PRODUCTS_PER_VIEW
    );
    setCurrentIndex(nextIndex);
  };

  const scrollToPrev = () => {
    if (!sliderRef.current) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return PRODUCTS_PER_VIEW;

    if (window.innerWidth < 640) return 1; 
    if (window.innerWidth < 1024) return 2; 
    return 4; 
  };

  

  useEffect(() => {
  
        const addProducts = async () => {
        setFeaturedProducts(await getProductsList(true));
      };
      addProducts();
    
  }, []);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex justify-between items-center mb-12 opacity-0 transform -translate-y-10",
            isVisible &&
              "opacity-100 transform translate-y-0 transition-all duration-500"
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
              disabled={
                currentIndex >= featuredProducts.length - getVisibleCount()
              }
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

       
        <div className="hidden sm:block overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / getVisibleCount())
              }%)`,
            }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.productId}
                className={cn(
                  "min-w-[25%] sm:min-w-[50%] lg:min-w-[25%] p-3 opacity-0 transform translate-y-10",
                  isVisible &&
                    "opacity-100 translate-y-0 transition-all duration-700"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      
        <div className="sm:hidden grid grid-cols-1 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.productId}
              className={cn(
                "opacity-0 transform translate-y-10",
                isVisible &&
                  "opacity-100 translate-y-0 transition-all duration-700"
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
            isVisible &&
              "opacity-100 transform translate-y-0 transition-all duration-700"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <Button className="btn-luxury">View All Products</Button>
        </div>
      </div>
    </section>
  );
}