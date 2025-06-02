import { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];

  addToCart: (item: Omit<CartItem, "quantity">) => void;

  removeFromCart: (id: string) => void;

  clearCart: () => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],

  addToCart: () => {},

  removeFromCart: () => {},

  clearCart: () => {},

  increaseQuantity: () => {},

  decreaseQuantity: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const increaseQuantity = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,

        addToCart,

        removeFromCart,

        clearCart,

        increaseQuantity,

        decreaseQuantity,
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

