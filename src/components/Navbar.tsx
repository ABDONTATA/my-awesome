
import { useState } from "react";
import { Menu, User, ShoppingBag, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold font-montserrat text-luxury-gold">
              LUXE
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="luxury-link font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link to="/login" className="hidden md:flex luxury-link">
              <User className="h-5 w-5 mr-1" />
              <span>Login</span>
            </Link>
            <Link to="/settings" className="hidden md:flex luxury-link">
              <Settings className="h-5 w-5 mr-1" />
              <span>Settings</span>
            </Link>
            <Link to="/payment" className="hidden md:flex">
              <Button className="btn-luxury" size="sm">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Checkout
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="py-2 luxury-link font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/login"
                className="py-2 luxury-link font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link 
                to="/settings"
                className="py-2 luxury-link font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Link>
              <Link to="/payment" onClick={() => setIsMenuOpen(false)}>
                <Button className="btn-luxury mt-2 w-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
