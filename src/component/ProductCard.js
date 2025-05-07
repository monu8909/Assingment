import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div>
    {console.log("product", product)}
    <div className="product-card">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <Link className="add-to-cart" to={`/product/${product.id}`}>
          View
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
