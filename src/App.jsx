import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import CartDrawer from "./Components/Cart";

import { Home } from "./Pages/Home";
import { Collection } from "./Pages/Collection";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { NotFound } from "./NotFound";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ ADD TO CART - Handles adding new items or incrementing quantity
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      // Check if item already exists in cart
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // If exists, increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // If new item, add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ UPDATE QUANTITY - Updates item quantity (used by +/- buttons)
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ✅ REMOVE ITEM - Completely removes item from cart (used by trash button)
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        onCartOpen={() => setCartOpen(true)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/collection"
          element={<Collection onAddToCart={handleAddToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </Router>
  );
}

export default App;