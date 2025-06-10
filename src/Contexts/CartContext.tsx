import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

interface CartItem {
  cartId:number;
  productId: number;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items : CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => void;
  getCartProductsList: () => Promise<CartItem[]>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

const baseUrl = "http://localhost:8080/api/cart";
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>();
  const { accessToken } = useAuth()!;

  const addToCart = async (productId: number, quantity: number) => {
    try {
      await fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      });
    } catch (error) {
      throw error;
    }
  };
  const getCartProductsList = async () => {
    try {
      const response = await fetch(`${baseUrl}/getCartProducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cart products:", error);
      return [];
    }
  };

 const removeFromCart = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};


  const clearCart = () => setItems([]);

const updateCartItemQuantity = async (productId: number, quantity: number) => {
  try {
    const response = await fetch(`${baseUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item quantity");
    }

    const updatedItems = await getCartProductsList();
    setItems(updatedItems);
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

  
  return (
    <CartContext.Provider
      value={{
        items,

        addToCart,
        removeFromCart,
        clearCart,
        getCartProductsList,
        updateCartItemQuantity

      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const cart = useContext(CartContext);
  if (cart === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return cart;
};
