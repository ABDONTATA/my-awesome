import React, { useContext } from "react";
import { useAuth } from "./AuthProvider";

interface ProductsContextType {
  addProduct: (formData: FormData) => Promise<void>;
  getProductsList: () => Promise<any>;
}

const baseUrl = "http://192.168.1.42:8080/api/products";
const ProductContext = React.createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const getProductsList = async () => {
    try {
      const response = await fetch(`${baseUrl}/public/list`, {
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

  return (
    <ProductContext.Provider value={{ addProduct, getProductsList }}>
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
