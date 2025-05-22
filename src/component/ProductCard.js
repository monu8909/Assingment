import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const { product, isLiked } = props;
  const { handleLike, handleDislike } = useCart();
  const [_like, setLike] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY); // Save scroll
    navigate(`/product/${product._id}`, {
      state: { product },
    });
  };
  useEffect(() => {
    sessionStorage.removeItem("scrollPosition");
  }, []);
  return (
    <div className="product-card">
      <div className="icons-like">
        {!_like && !isLiked ? (
          <button
            onClick={() => {
              setLike(true);
              handleLike(product?._id);
            }}
          >
            <CiHeart className="like-icon" />
          </button>
        ) : (
          <button
            onClick={() => {
              setLike(false);
              handleDislike(product?._id);
            }}
          >
            <FaHeart className="unlike-icon" />
          </button>
        )}
      </div>
      <div className="image-div">
        <div className="width-image">
          <img
            alt="product-image"
            src={product?.image || product?.images[0]}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
      <h2 className="product-name">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button
          className="add-to-cart"
          onClick={handleClick}
          // to={`/product/${product._id}`}
          state={{ product }}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
