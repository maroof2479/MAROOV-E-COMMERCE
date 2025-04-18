
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-secondary/10 dark:bg-secondary/5 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4 text-foreground elegant-heading">Join our newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background border-border focus:border-primary"
              />
              <Button variant="default" className="btn-hover-effect">Subscribe</Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground elegant-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link to="/shop/new" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop/bestsellers" className="text-muted-foreground hover:text-primary transition-colors">Bestsellers</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground elegant-heading">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a 
              href="https://www.facebook.com/share/14ym71ZnUc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://twitter.com/maroof__7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://instagram.com/maroof__7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/maroof-vii-98505426b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="mailto:hello@maroov.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Maroov. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
