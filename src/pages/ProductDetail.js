import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { state } = useLocation();
  const { addToCart, likedIds } = useCart();
  const productView = state?.product;
  const isLiked = likedIds.includes(productView?._id);
  const { isAuthenticated } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const { handleLike, handleDislike } = useCart();
  const [_like, setLike] = React.useState(isLiked);
  return (
    <Card>
      <div className="container">
        {isAuthenticated && (
          <div style={{ margin: "20px" }}>
            <Link className="add-to-cart" to={"/cart"}>
              Go to cart
            </Link>
          </div>
        )}

        <div className="product-detail-container">
          <div className="product-card">
            <div className="icons-like">
              {isLiked && _like ? (
                <button
                  onClick={() => {
                    setLike(false);
                    handleDislike(productView?._id);
                  }}
                >
                  <FaHeart className="unlike-icon" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setLike(true);
                    handleLike(productView?._id);
                  }}
                >
                  <CiHeart className="like-icon" />
                </button>
              )}
            </div>
            <div className="product-image-view">
              <div className="width-image">
                <img
                  alt="product-image"
                  src={productView?.image || productView?.images[0]}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
            <div className="product-info">
              <h2 className="product-name">{productView.title}</h2>
              <p className="product-description">{productView.description}</p>
              <p className="product-price">${productView.price}</p>
              <div className="quantity-wrapper">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="quantity-input"
                />
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(productView?._id, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductDetail;
