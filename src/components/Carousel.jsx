import { useState, useEffect, useRef } from 'react';

export default function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleNextSlide = () => {
    goToNextSlide();
    restartAutoplay();
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
    restartAutoplay();
  };

  const startAutoplay = () => {
    intervalRef.current = setInterval(goToNextSlide, 3000);
  };

  const restartAutoplay = () => {
    clearInterval(intervalRef.current);
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [images.length]);
  
  return (
    <div className="relative w-full max-w-lg h-96 overflow-hidden rounded-lg shadow-lg bg-[#1F2A44]/50">
      <style>{`
        @keyframes customFadeIn {
          from {
            opacity: 0.2;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-custom-fade {
          animation: customFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <img
        key={currentSlide}
        className="w-full h-full object-cover animate-custom-fade"
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
      />
      <button onClick={handlePrevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-white transition-colors">←</button>
      <button onClick={handleNextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-white transition-colors">→</button>
    </div>
  )
}
