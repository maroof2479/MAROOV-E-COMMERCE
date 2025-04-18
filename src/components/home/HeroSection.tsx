
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Diamond } from 'lucide-react';

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-cold-and-serious-expression-39879-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-2 text-secondary animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
              <Diamond className="h-5 w-5" />
              <span className="uppercase tracking-widest text-sm">Luxury Collection</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
              Timeless Elegance, <br />
              Modern Luxury
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
              Discover our curated collection of premium pieces that blend artisanal craftsmanship with contemporary design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1.1s' }}>
              <Button size="lg" variant="luxury" className="text-base" asChild>
                <Link to="/shop">
                  Explore Collection <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
