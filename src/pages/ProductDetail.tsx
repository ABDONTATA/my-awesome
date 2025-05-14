
import { useState } from "react";
import { useParams } from "react-router-dom";
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

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Diamond Studded Wristwatch",
    price: 4599,
    category: "Watches",
    description: "Handcrafted luxury wristwatch with diamond embellishments and premium leather strap. Water resistant up to 100 meters with Swiss movement.",
    details: {
      material: "18k Gold, Diamond, Premium Leather",
      dimensions: "40mm x 10mm",
      weight: "150g",
      origin: "Switzerland",
      warranty: "Lifetime"
    },
    features: ["Water resistant", "Scratch resistant sapphire crystal", "Swiss movement", "Self-winding mechanism"],
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1548171915-52b06b96b6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    ],
    rating: 4.9,
    reviewCount: 124,
    isNew: true,
    inStock: true
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === Number(id)) || mockProducts[0];

  const handleAddToCart = () => {
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added`, {
      description: "Item has been added to your cart",
    });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist", {
      description: `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Breadcrumb - optional */}
          <div className="text-sm text-luxury-gray mb-6">
            Home / Products / {product.category} / {product.name}
          </div>
          
          {/* Product display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Product images */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <AspectRatio ratio={1/1}>
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
                    className={`overflow-hidden rounded-lg cursor-pointer border-2 ${selectedImage === i ? 'border-luxury-gold' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={img} 
                        alt={`${product.name} view ${i+1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-2 flex items-center">
                {product.isNew && <Badge className="bg-luxury-gold text-luxury-black mr-2">New</Badge>}
                <h1 className="text-3xl md:text-4xl font-bold font-montserrat">{product.name}</h1>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="h-4 w-4 fill-luxury-gold/50 text-luxury-gold" />
                </div>
                <span className="ml-2 text-sm text-luxury-gray">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              
              <div className="text-3xl font-bold mb-6">${product.price.toLocaleString()}</div>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
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
              
              {/* Product details tabs */}
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
                      <li key={index} className="text-luxury-gray">{feature}</li>
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
