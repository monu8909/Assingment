import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Apiconfigs, { baseURL } from "../apiconfigs/Apiconfig";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [likedIds, setLikedIds] = useState([]);
  const [cardData, setcardData] = React.useState([]);
  const [_category, setCategory] = useState([]);
  const [_checklike, setChekLike] = useState(false);
  React.useEffect(() => {
    const Product_LikeList = async () => {
      try {
        const [productRes] = await Promise.all([
          axios.get(Apiconfigs.listProduct, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (productRes.data.response === 200) {
          setLikedIds(productRes.data.likedProductIds); // save liked product IDs
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (_checklike) {
      Product_LikeList();
    }
  }, [_checklike]);

  const addToCart = async (_id, quantity) => {
    try {
      const response = await axios({
        url: Apiconfigs.add_to_cart,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          _id: _id,
          quantity: quantity,
        },
      });
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeFromCart = async (id) => {
    // try {
    //   // Remove from JSON server
    //   await axios.delete(`http://localhost:3001/cart/${id}`);
    //   // Optionally: update local state if needed
    //   setCart((prev) => prev.filter((item) => item.id !== id));
    //   alert("Item removed from cart!");
    // } catch (error) {
    //   console.error("Error removing from cart:", error);
    //   alert("Failed to remove item.");
    // }
  };

  const updateQuantity = async (id, quantity, amount) => {};

  const handleLike = async (productId) => {
    try {
      const response = await axios({
        url: `${baseURL}/product/${productId}/like`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setChekLike(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (productId) => {
    try {
      const response = await axios({
        url: `${baseURL}/product/${productId}/dislike`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setChekLike(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Product_Category_data = async () => {
    try {
      const [categoryRes, productRes] = await Promise.all([
        axios.get(Apiconfigs.category),
        axios.get(Apiconfigs.product),
      ]);

      if (productRes.data.response === 200) {
        setcardData(productRes.data?.product);
      }

      if (categoryRes.data.response === 200) {
        setCategory(categoryRes.data.category);
      }
      setTimeout(() => {
        const scrollY = sessionStorage.getItem("scrollPosition");
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    Product_Category_data();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        updateQuantity,
        handleLike,
        handleDislike,
        likedIds,
        cardData,
        _category,
        isAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
