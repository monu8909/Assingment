import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div>
    <div class="product-card">
      <h2 class="product-name">{product.name}</h2>
      <p class="product-description">{product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}</span>
        <Link class="add-to-cart" to={`/product/${product.id}`}>
          View
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
