import { Button } from "@/components/ui/button";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import bgImg from "@/assets/BackGroundImages/bgImg.jpg";
import bgImg2 from "@/assets/BackGroundImages/bgImg2.jpg";
import bgImg3 from "@/assets/BackGroundImages/bgImg3.jpg";

export function HeroSection() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} 
          interval={4000}
        >
          <div data-src={bgImg as unknown as string} />
          <div data-src={bgImg2 as unknown as string} />
          <div data-src={bgImg3 as unknown as string} />
        </AutoplaySlider>
      </div>

      <div className="relative z-10 max-w-4xl text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Discover Your{" "}
          <span className="text-luxury-gold">Signature Style</span>
        </h1>
        <p className="text-lg md:text-xl mb-10">
          A refined selection of essentials that balance elegance, comfort, and
          minimal design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-4 text-lg btn-luxury">Shop Now</Button>
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
