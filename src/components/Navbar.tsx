import { useEffect, useState } from "react";
import { Menu, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthProvider";
import { SideDrawer } from "./SideDrawer";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (isProfileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileDrawerOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-screen h-20 flex flex-row text-white shadow-lg justify-between items-center px-6 z-50 bg-transparent border-collapse">
        <div className="container mx-auto px-4 py-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Link
              to="/"
              className="text-2xl font-bold font-montserrat text-luxury-gold"
            >
              LUXE
            </Link>

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
              {user?.userRole === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  className="luxury-link font-medium text-red-500"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="ml-10 hidden md:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search..."
                className={`p-2 bg-gray-100 rounded-md text-black ${user?.userRole === "ADMIN" ? "w-[60vh]" : "w-[80vh]"}`}
              />
              <i className="bx bx-search-alt-2 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-black"></i>
            </div>

            <div className="flex items-center space-x-4">
               <ModeToggle />
              {isAuthenticated ? (
                
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsProfileDrawerOpen(true);
                  }}
                  className="py-2 luxury-link font-medium flex items-center"
                >
                  <User className="h-5 w-5 mr-2" />
                  {user?.username || "Loading.."}
                </button>
              ) : (
                <Link to="/login" className="hidden md:flex luxury-link">
                  <User className="h-5 w-5 mr-1" />
                  <span>Login</span>
                </Link>
              )}

              <Link to="/cart" className="hidden md:flex luxury-link">
                <ShoppingBag className="h-5 w-5" />
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

          {/* Mobile menu */}
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
                
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="py-2 luxury-link font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user?.username || "Loading.."}
                  </Link>
                ) : (
                  <Link
                      to="/login"
                      className="py-2 luxury-link font-medium flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Login
                    </Link>
                )}

                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 luxury-link font-medium flex items-center"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div>
        {isProfileDrawerOpen && (
          <SideDrawer onClose={() => setIsProfileDrawerOpen(false)} />
        )}
      </div>
    </>
  );
}