import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/Contexts/ProductsProvider";
import { ShoppingBag, Star } from "lucide-react";

interface CategoryInfo  {
  name: string;
}

interface ProductView {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  isNew: boolean;
  inStock: boolean;
  category: CategoryInfo;
}
const Product = () => {
  const [products, setProducts] = useState<ProductView[]>([]);
  const { getProductsList } = useProduct();
  
  

  useEffect(() => {
    const fetchList = async () => {
      setProducts(await getProductsList(false));
    };
    fetchList();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-montserrat">
            Explore Our Collection
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {  
              products.map((product) => (
              <motion.div
                key={product.productId}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${
                  product.inStock === false ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Link to={`/product/${product.productId}`}>
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-luxury-gold text-luxury-black">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                    <p className="text-luxury-gray text-sm mb-2">{product.category.name}</p>
                    {product.rating !== undefined && (
                      <div className="flex items-center text-sm mb-2">
                        <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">
                        ${product.price.toLocaleString()}
                      </span>
                      <ShoppingBag className="w-5 h-5 text-luxury-gray" />
                    </div>
                    {product.inStock === false && (
                      <p className="text-red-500 text-sm mt-2 font-medium">Out of Stock</p>
                    )}
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
