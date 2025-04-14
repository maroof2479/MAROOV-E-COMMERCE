
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-medium mb-6">Thoughtfully Designed, Ethically Made</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Aesthetic Avenue, we believe in the power of beautiful objects to enhance everyday living. 
                Our curated collection brings together pieces that balance form and function, crafted with 
                care by artisans who share our commitment to quality and sustainability.
              </p>
              <Separator className="max-w-xs mx-auto" />
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        <section className="py-24 px-4 bg-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-medium mb-6">Our Commitment to Quality</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every item in our store is carefully selected for its design, craftsmanship, and longevity. 
                  We partner with makers who prioritize sustainable materials and ethical production methods.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When you choose Aesthetic Avenue, you're investing in objects made to be used and cherished 
                  for years to come – pieces that will only get better with time and use.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1887&auto=format&fit=crop" 
                  alt="Artisan at work" 
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
