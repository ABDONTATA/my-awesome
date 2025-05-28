import { Button } from "@/components/ui/button";
import bgImg from "@/assets/BackGroundImages/bgImg.jpg";

export function HeroSection() {
  return (
   <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Luxury background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        {/* Removed grey overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Discover Your <span className="text-luxury-gold">Signature Style</span>
        </h1>
        <p className="text-lg md:text-xl mb-10">
          A refined selection of essentials that balance elegance, comfort, and minimal design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-4 text-lg btn-luxury">
            Shop Now
          </Button>
          <Button
            variant="outline"
            className="px-8 py-4 text-lg border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10"
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
