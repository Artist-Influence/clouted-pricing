import { useState, useEffect, useCallback } from "react";
import CoverSlide from "@/components/deck/CoverSlide";
import HowToUseSlide from "@/components/deck/HowToUseSlide";
import GoalSelectorSlide from "@/components/deck/GoalSelectorSlide";
import ServiceSlide from "@/components/deck/ServiceSlide";
import CampaignBuildsSlide from "@/components/deck/CampaignBuildsSlide";
import ClosingSlide from "@/components/deck/ClosingSlide";
import { services } from "@/data/services";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  <CoverSlide key="cover" />,
  <HowToUseSlide key="how" />,
  <GoalSelectorSlide key="goals" />,
  ...services.map((s) => <ServiceSlide key={s.id} service={s} />),
  <CampaignBuildsSlide key="campaigns" />,
  <ClosingSlide key="closing" />,
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="h-screen w-screen overflow-hidden deck-bg relative select-none">
      <div className="h-full w-full slide-enter" key={currentSlide}>
        {slides[currentSlide]}
      </div>

      {/* Navigation pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 glass-strong rounded-full px-5 py-2.5 z-50">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="text-foreground/60 hover:text-foreground disabled:opacity-20 transition p-1"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-medium text-muted-foreground tabular-nums min-w-[3rem] text-center">
          {currentSlide + 1} / {totalSlides}
        </span>
        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className="text-foreground/60 hover:text-foreground disabled:opacity-20 transition p-1"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
        <div
          className="h-full bg-primary/40 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Index;
