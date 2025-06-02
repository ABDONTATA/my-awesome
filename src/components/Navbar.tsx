import { useEffect, useState } from "react";
import { Menu, User, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthProvider";
import { SideDrawer } from "./SideDrawer";
import { ModeToggle } from "./ModeToggle";
import { useCart } from "../Contexts/CartContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const { items = [] } = useCart();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = isProfileDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileDrawerOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center z-50 bg-transparent backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {}
            <Link
              to="/"
              className="text-2xl font-bold font-montserrat text-yellow-400 hover:text-luxury-gold transition-colors"
            >
              LUXE
            </Link>

            {}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white hover:text-luxury-gold transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  {item.name}
                </Link>
              ))}
              {user?.userRole === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  className="text-white hover:text-red-600 transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  Dashboard
                </Link>
              )}
            </div>

            {}
            <div className="hidden md:flex items-center mx-6 flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleChange}
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pl-10 bg-white/20 backdrop-blur-sm rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-all"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              </div>
            </div>

            {}
            <div className="flex items-center space-x-4">
              <ModeToggle />

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsProfileDrawerOpen(true);
                  }}
                  className="hidden md:flex items-center space-x-1 group"
                >
                  <User className="h-5 w-5 text-white group-hover:text-luxury-gold transition-colors" />
                  <span className="text-white group-hover:text-luxury-gold transition-colors font-medium text-sm">
                    {user?.username || "Account"}
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center space-x-1 group"
                >
                  <User className="h-5 w-5 text-white group-hover:text-luxury-gold transition-colors" />
                  <span className="text-white group-hover:text-luxury-gold transition-colors font-medium text-sm">
                    Login
                  </span>
                </Link>
              )}

              {}
              <Link
                to="/cart"
                className="hidden md:flex items-center group relative"
              >
                <ShoppingBag className="h-5 w-5 text-white group-hover:text-luxury-gold transition-colors" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-luxury-gold text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-transparent"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg animate-slide-down">
            <div className="container mx-auto px-4 py-4">
              {}
              <div className="mb-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleChange}
                  placeholder="Search..."
                  className="w-full py-2 px-4 pl-10 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 focus:outline-none"
                  aria-label="Search"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
              </div>

              {}
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-luxury-gold transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {user?.userRole === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="py-2 px-2 text-red-500 hover:text-red-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileDrawerOpen(true);
                    }}
                    className="py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-luxury-gold transition-colors font-medium flex items-center"
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user?.username || "Account"}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-luxury-gold transition-colors font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                )}

                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-luxury-gold transition-colors font-medium flex items-center"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Cart
                  {items.length > 0 && (
                    <span className="ml-2 bg-luxury-gold text-white text-xs rounded-full px-2 py-0.5">
                      {items.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {}
      {isProfileDrawerOpen && (
        <SideDrawer onClose={() => setIsProfileDrawerOpen(false)} />
      )}
    </>
  );
}
