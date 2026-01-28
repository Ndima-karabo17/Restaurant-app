import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of a Cart Item
export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image_url: string;
}

// Define everything the Context can do
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  reorderItems: (items: CartItem[]) => void; // New: Loads a past order
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Add single item or increase quantity
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, item];
    });
  };

  // 2. Load a whole list of items (used for Re-order)
  const reorderItems = (newItems: CartItem[]) => {
    // We map the incoming items to ensure they are formatted correctly
    const formattedItems = newItems.map(item => ({
      ...item,
      quantity: item.quantity || 1 // Ensure there is at least 1 of each
    }));
    setCart(formattedItems);
  };

  // 3. Update quantity (+1 or -1)
  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // 4. Remove specific item
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 5. Reset the cart to empty
  const clearCart = () => {
    setCart([]);
  };

  // 6. Calculate total price dynamically
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart, 
        reorderItems,
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};