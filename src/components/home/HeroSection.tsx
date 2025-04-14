
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f36?q=80&w=1887&auto=format&fit=crop",
      title: "Curated Home Essentials",
      subtitle: "Elevate your space with our thoughtfully selected collection"
    },
    {
      image: "https://images.unsplash.com/photo-1561503972-839d0c56de17?q=80&w=1887&auto=format&fit=crop",
      title: "New Spring Collection",
      subtitle: "Discover our latest arrivals designed for modern living"
    },
    {
      image: "https://images.unsplash.com/photo-1595514535215-8a5b0fad152f?q=80&w=1887&auto=format&fit=crop",
      title: "Handcrafted Quality",
      subtitle: "Artisanal pieces made with exceptional materials and care"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[95vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 md:px-0 max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-4 font-serif">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/shop">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link to="/about">Explore Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
