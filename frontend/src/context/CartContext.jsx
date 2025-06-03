// src/context/CartContext.jsx
import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item._id !== _id)
    );
  };

  const updateQuantity = (_id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(_id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === _id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};