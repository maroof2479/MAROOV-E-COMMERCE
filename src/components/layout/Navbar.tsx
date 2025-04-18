
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/components/admin/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show the navbar on admin login page
  if (location.pathname === '/admin-login') {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/shop" className="text-highlight hover:text-primary transition-colors">Shop All</Link>
          <Link to="/shop/new" className="text-highlight hover:text-primary transition-colors">New Arrivals</Link>
          <Link to="/shop/bestsellers" className="text-highlight hover:text-primary transition-colors">Bestsellers</Link>
          <Link to="/about" className="text-highlight hover:text-primary transition-colors">About</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-panel">
                <div className="px-3 py-2 text-sm font-medium border-b border-border">
                  {user?.name || user?.email}
                  {isAdmin && <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Admin</span>}
                </div>
                <div className="p-1">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile" className="flex w-full">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/orders" className="flex w-full">My Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/admin" className="flex w-full">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                </div>
                <DropdownMenuSeparator />
                <div className="p-1">
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Account" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="hover:bg-primary/10" aria-label="Cart" asChild>
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-primary/10"
            aria-label="Toggle theme" 
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-primary/10" 
            onClick={() => setIsMobileMenuOpen(true)} 
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 dark:bg-background/98 backdrop-blur-md z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:bg-primary/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col items-center justify-center h-[80vh] space-y-8 text-lg font-medium">
            <Link 
              to="/shop" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              Shop All
            </Link>
            <Link 
              to="/shop/new" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              New Arrivals
            </Link>
            <Link 
              to="/shop/bestsellers" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              Bestsellers
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                >
                  My Profile
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="hover:text-destructive transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-destructive after:transition-all after:duration-300 hover:after:w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
      
      {/* Discreet admin login link */}
      <div className="absolute bottom-2 right-2 opacity-30 hover:opacity-100 text-xs transition-opacity">
        <Link to="/admin-login" className="text-muted-foreground hover:text-foreground">
          Admin
        </Link>
      </div>
    </header>
  );
}
