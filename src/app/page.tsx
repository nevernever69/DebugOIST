import { SpotlightNewDemo } from "@/components/HomePage";
import { LogoCarouselDemo } from "@/components/Carousel";
import { Footer } from "@/components/FotterPage";
import { GridBackgroundDemo } from "@/components/GlowingCardPage";
import { TestimonialsSectionDemo } from "@/components/TestimonialsCard";

export default function LandingPage() {
    return (
      <div>
        <SpotlightNewDemo />
        <GridBackgroundDemo />
        <LogoCarouselDemo />
        <TestimonialsSectionDemo />
        <Footer />
      </div>
    );
  }
  