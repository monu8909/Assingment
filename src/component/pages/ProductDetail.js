import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const productsData = [
  { id: 1, name: "Product A", description: "Description A", price: 10 },
  { id: 2, name: "Product B", description: "Description B", price: 15 },
  { id: 3, name: "Product C", description: "Description C", price: 20 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
