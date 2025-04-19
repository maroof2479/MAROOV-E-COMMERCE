
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
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-the-studio-810-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Gradient Overlay - made slightly more transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content - Positioned with higher z-index and no fade animations */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-2 text-secondary">
              <Diamond className="h-5 w-5" />
              <span className="uppercase tracking-widest text-sm font-light">Luxury Redefined</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
              MAROOV <br />
              <span className="text-secondary">Collection 2025</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-xl font-light">
              Where artisanal craftsmanship meets contemporary elegance. Experience luxury that transcends time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="luxury"
                className="text-base relative group shadow-lg hover:shadow-xl transition-all duration-300" 
                asChild
              >
                <Link to="/shop">
                  Discover Collection <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="gold"
                className="text-base shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm" 
                asChild
              >
                <Link to="/about">Our Legacy</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
