
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
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

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
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user?.name || user?.email}
                  {isAdmin && <span className="ml-2 text-xs bg-primary/20 text-primary px-1 rounded">Admin</span>}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Account" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
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
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
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
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
                  My Profile
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="hover:underline underline-offset-4 decoration-1">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline underline-offset-4 decoration-1">
                  Create Account
                </Link>
              </>
            )}
            
            {/* Discreet admin login link at the bottom */}
            <div className="pt-10 opacity-50 text-xs">
              <Link to="/admin-login" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline">
                Admin Access
              </Link>
            </div>
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
