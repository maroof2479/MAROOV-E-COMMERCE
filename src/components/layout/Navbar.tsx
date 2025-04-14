
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-serif font-medium">
          Aesthetic Avenue
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm">
          <Link to="/shop" className="hover:underline underline-offset-4 decoration-1">Shop All</Link>
          <Link to="/shop/new" className="hover:underline underline-offset-4 decoration-1">New Arrivals</Link>
          <Link to="/shop/bestsellers" className="hover:underline underline-offset-4 decoration-1">Bestsellers</Link>
          <Link to="/about" className="hover:underline underline-offset-4 decoration-1">About</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Cart" asChild>
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(true)} 
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col items-center justify-center h-[80vh] space-y-8 text-lg">
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
              Shop All
            </Link>
            <Link to="/shop/new" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
              New Arrivals
            </Link>
            <Link to="/shop/bestsellers" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
              Bestsellers
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
