
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
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-white-dress-in-autumn-leaves-40035-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-2 text-secondary animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
              <Diamond className="h-5 w-5" />
              <span className="uppercase tracking-widest text-sm font-light">Luxury Redefined</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
              MAROOV <br />
              <span className="text-secondary/90">Collection 2025</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-xl animate-fade-in opacity-0 font-light" style={{ animationDelay: '0.9s' }}>
              Where artisanal craftsmanship meets contemporary elegance. Experience luxury that transcends time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1.1s' }}>
              <Button 
                size="lg" 
                variant="luxury"
                className="text-base relative overflow-hidden group hover:shadow-2xl transition-all duration-300" 
                asChild
              >
                <Link to="/shop">
                  Discover Collection <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="gold"
                className="text-base backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-colors" 
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
