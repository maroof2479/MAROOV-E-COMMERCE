
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-gradient-luxury dark:bg-gradient-to-b dark:from-background dark:to-accent/5 mt-20 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium mb-4 text-foreground elegant-heading">
              <span className="gold-accent">Join our newsletter</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Subscribe to receive updates, exclusive offers, and a touch of luxury in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <Input 
                  type="email" 
                  placeholder="Your email address"
                  className="bg-background/80 backdrop-blur-sm border-border focus-visible:ring-primary h-11"
                />
              </div>
              <Button className="gradient-btn h-11 px-6">
                <span className="relative z-10 flex items-center">
                  Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-foreground elegant-heading">
              <span className="gold-accent">Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/shop/new" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/bestsellers" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-foreground elegant-heading">
              <span className="gold-accent">Support</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-highlight">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-12 opacity-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-8 md:mb-0">
            <a 
              href="https://www.facebook.com/share/14ym71ZnUc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/maroof__7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/maroof__7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/maroof-vii-98505426b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:hello@maroov.com" 
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Maroov. <span className="hidden sm:inline">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
