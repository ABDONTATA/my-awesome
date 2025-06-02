
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
<<<<<<< HEAD

  addToCart: (item: Omit<CartItem, "quantity">) => void;

  removeFromCart: (id: string) => void;

  clearCart: () => void;

  increaseQuantity: (id: string) => void;

=======
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
  decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
<<<<<<< HEAD

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

=======
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
<<<<<<< HEAD
    setItems((prev) => prev.filter((item) => item.id !== id));
=======
    setItems(prev => prev.filter(item => item.id !== id));
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
  };

  const clearCart = () => setItems([]);

  const increaseQuantity = (id: string) => {
<<<<<<< HEAD
    setItems((prev) =>
      prev.map((item) =>
=======
    setItems(prev =>
      prev.map(item =>
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
<<<<<<< HEAD
    setItems((prev) =>
      prev.map((item) =>
=======
    setItems(prev =>
      prev.map(item =>
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
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
<<<<<<< HEAD

        addToCart,

        removeFromCart,

        clearCart,

        increaseQuantity,

=======
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
<<<<<<< HEAD
export const useCart = () => {
  const cart = useContext(CartContext);
  if (cart === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return cart;
};

=======
>>>>>>> 02b2eeb3091c147e5734a6271faab730718b7924
