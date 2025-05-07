import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cardData, setcardData] = React.useState([]);
  console.log("carthdfhd", cardData);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  React.useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setcardData(data);
      });
  }, [refreshTrigger, cart]);

  //   const { id } = useParams();
  const addToCart = async (product, quantity) => {
    console.log("cardDatasdsdsd", product);
    // console.log("productquantity", id);
    // const product = cardData.find((p) => p.id === parseInt(id));
    // if (!product) return <p>Product not found</p>;
    // console.log("productasasas", id);

    try {
      await axios.post("http://localhost:3001/cart", {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Error adding product to cart.");
    }
  };

  const removeFromCart = async (id) => {
    try {
      // Remove from JSON server
      await axios.delete(`http://localhost:3001/cart/${id}`);

      // Optionally: update local state if needed
      setCart((prev) => prev.filter((item) => item.id !== id));

      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item.");
    }
  };

  const updateQuantity = async (id, quantity, amount) => {
    console.log("updateQuantity", id, quantity, amount);

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );

    const itemToUpdate = cardData.find((item) => item.id === id);
    if (!itemToUpdate) return;

    setRefreshTrigger((prev) => prev + 1); // this triggers useEffect

    try {
      await axios.patch(`http://localhost:3001/cart/${id}`, {
        quantity:
          quantity === -1
            ? itemToUpdate?.quantity - 1
            : itemToUpdate?.quantity + 1,
      });
      fetch("http://localhost:3001/cart")
        .then((res) => res.json())
        .then((data) => setcardData(data));
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity on server.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
