import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Heart, Share, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/Contexts/CartContext";
import { useProduct } from "@/Contexts/ProductsProvider";
import { useParams } from "react-router-dom";
import { useAuth } from "@/Contexts/AuthProvider";

interface ProductDetails {
  material: string;
  dimensions: string;
  weight: string;
  origin: string;
  warranty: string;
}

interface Product {
  productId: number;
  name: string;
  price: number;
  category: string;
  description: string;
  details: ProductDetails;
  features: string[];
  images: string[];
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  inStock?: boolean;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product>();
  const { getProductDetails } = useProduct()!;
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductDetails(Number(id));
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
  if (!product) return;

  if (!isAuthenticated) {
    toast.warning("You need to be logged in to add items to the cart", {
      description: "Please log in or create an account.",
    });
    return;
  }

  try {
    await addToCart(product.productId, quantity);
    toast.success(`${quantity} ${product.name}${quantity > 1 ? "s" : ""} added`, {
      description: "Item has been added to your cart",
    });
  } catch (error: any) {
    toast.error("Error: the product wasn't added to the cart");
  }
};


  const handleAddToWishlist = () => {
    if (!product) return;

    toast.success("Added to wishlist", {
      description: `${product.name} has been added to your wishlist`,
    });
  };

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-sm text-luxury-gray mb-6">
            Home / Products / {product.category} / {product.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-lg cursor-pointer border-2 ${
                      selectedImage === i
                        ? "border-luxury-gold"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-2 flex items-center">
                {product.isNew && (
                  <Badge className="bg-luxury-gold text-luxury-black mr-2">
                    New
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold font-montserrat">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (product.rating || 0)
                          ? "fill-luxury-gold text-luxury-gold"
                          : "fill-luxury-gold/50 text-luxury-gold"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-luxury-gray">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold mb-6">
                ${product.price.toLocaleString()}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="flex items-center space-x-2 mb-6">
                <div className="text-sm font-medium">Availability:</div>
                {product.inStock ? (
                  <div className="text-green-500">In Stock</div>
                ) : (
                  <div className="text-red-500">Out of Stock</div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex border rounded w-32">
                  <button
                    className="px-3 py-2 border-r"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-full text-center focus:outline-none bg-transparent"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="px-3 py-2 border-l"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="btn-luxury flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <div className="w-1/3 font-medium capitalize">{key}:</div>
                      <div className="w-2/3 text-luxury-gray">{value}</div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="features" className="space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-luxury-gray">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="space-y-4">
                  <p>Free worldwide shipping on all orders over $1000.</p>
                  <p>Standard shipping: 3-5 business days</p>
                  <p>Express shipping: 1-2 business days</p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProductDetail;
