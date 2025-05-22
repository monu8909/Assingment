import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Apiconfigs, { baseURL } from "../apiconfigs/Apiconfig";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const User_id = localStorage.getItem("token");
  const { isAuthenticated } = useAuth();
  const [likedIds, setLikedIds] = useState([]);
  const [cardData, setcardData] = React.useState([]);
  const [_category, setCategory] = useState([]);
  const [_getcarlist, setGetcartLis] = useState([]);
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
      console.log("responseasas", response);
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
        Product_LikeList();
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
        Product_LikeList();
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
  const getAddToCrt = async () => {
    try {
      const response = await axios({
        url: Apiconfigs.get_cart_list,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("sdsdsd", response?.data?.cart);

      if (response?.data?.response === 200) {
        setGetcartLis(response?.data?.cart);
      }
    } catch (error) {
      if (error?.status === 404) {
        setGetcartLis([]);
      }
      console.log("error", error);
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
        Product_LikeList,
        isAuthenticated,
        getAddToCrt,
        _getcarlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
