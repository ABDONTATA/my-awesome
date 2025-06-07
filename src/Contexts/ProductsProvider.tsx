import React, { useContext } from "react";
import { useAuth } from "./AuthProvider";
interface ProductDetails  {
  material: string;
  dimensions: string;
  weight: string;
  origin: string;
  warranty: string;
};

interface Product  {
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
};
interface CategoryInfo  {
  name: string;
};

interface ProductView  {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  isNew: boolean;
  inStock: boolean;
  category: CategoryInfo;
};

interface ProductsContextType {
  addProduct: (formData: FormData) => Promise<void>;
  getProductsList: (isFeatured: boolean) => Promise<ProductView[]>;
  getProductDetails: (id: number) => Promise<Product>;
}

const baseUrl = "http://localhost:8080/api/products";
const ProductContext = React.createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth()!;

  const addProduct = async (formData: FormData) => {
    try {
      const response = await fetch(`${baseUrl}/add`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const getProductsList = async (isFeatured: boolean) => {
    try {
      const response = await fetch(`${baseUrl}/public/list/${isFeatured}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Can't fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const getProductDetails = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/public/getProduct/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Can't fetch product");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{ addProduct, getProductsList, getProductDetails }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductsProvider");
  }
  return context;
};
