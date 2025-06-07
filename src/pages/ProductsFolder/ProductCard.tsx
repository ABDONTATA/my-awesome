import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryInfo {
  name: string;
};

interface ProductView {
  product: {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
    isNew: boolean;
    inStock: boolean;
    category: CategoryInfo;
  };
}

export function ProductCard({ product }: ProductView) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-xl luxury-card hover-lift",
        isHovered ? "scale-[1.03]" : "scale-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity hover:opacity-0" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-montserrat font-bold text-lg line-clamp-1">
            {product.name}
          </h3>
          {product.isNew && (
            <Badge className="bg-luxury-gold text-luxury-black">New</Badge>
          )}
        </div>
        <div className="text-luxury-gray text-sm mb-3">
          {product.category.name}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">
            ${product.price.toLocaleString()}
          </div>
          <Link
            to={`/product/${product.productId}`}
            className={cn(
              "text-sm font-medium transition-colors",
              isHovered ? "text-luxury-gold" : "text-luxury-gray",
              "luxury-link"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
