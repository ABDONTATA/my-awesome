import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Luxury Watch",
    price: 4599,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Gold Ring",
    price: 999,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1579113800380-284f4f739ec4?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    isNew: false,
    inStock: true,
  },
];

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-montserrat">Explore Our Collection</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-luxury-gold text-luxury-black">New</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                    <p className="text-luxury-gray text-sm mb-2">{product.category}</p>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
                      <ShoppingBag className="w-5 h-5 text-luxury-gray" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Product;
