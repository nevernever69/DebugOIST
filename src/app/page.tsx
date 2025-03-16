import { SpotlightNewDemo } from "@/components/HomePage";
import { LogoCarouselDemo } from "@/components/Carousel";
import { Footer } from "@/components/FotterPage";
import { GridBackgroundDemo } from "@/components/GlowingCardPage";

export default function LandingPage() {
    return (
      <div>
        <SpotlightNewDemo />
        <GridBackgroundDemo />
        <LogoCarouselDemo />
        <Footer />
      </div>
    );
  }
  