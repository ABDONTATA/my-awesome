
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-luxury-black border-t border-luxury-purple/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold font-montserrat text-luxury-gold">
              LUXE
            </Link>
            <p className="text-luxury-gray max-w-xs">
              Providing exceptional luxury products with impeccable quality and design. Experience the finest craftsmanship.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-luxury-gray hover:text-luxury-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-luxury-gray hover:text-luxury-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-luxury-gray hover:text-luxury-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-luxury-gold font-bold uppercase mb-6 text-sm tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Products", "About", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to={"/" + (item === "Home" ? "" : item.toLowerCase())} className="luxury-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-luxury-gold font-bold uppercase mb-6 text-sm tracking-wider">Categories</h3>
            <ul className="space-y-3">
              {["Jewelry", "Watches", "Fragrances", "Accessories", "Limited Editions"].map((item) => (
                <li key={item}>
                  <Link to={"/products"} className="luxury-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-luxury-gold font-bold uppercase mb-6 text-sm tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-luxury-gold mr-3 mt-0.5" />
                <span className="text-luxury-gray">123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-luxury-gold mr-3" />
                <span className="text-luxury-gray">+1 (800) LUXURY</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-luxury-gold mr-3" />
                <span className="text-luxury-gray">contact@luxebrand.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-luxury-purple/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-luxury-gray text-sm mb-4 md:mb-0">
              &copy; {currentYear} LUXE. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm text-luxury-gray hover:text-luxury-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-luxury-gray hover:text-luxury-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-sm text-luxury-gray hover:text-luxury-gold transition-colors">
                Shipping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
