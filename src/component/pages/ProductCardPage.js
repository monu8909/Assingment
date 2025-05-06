import React from "react";
import ProductCard from "../ProductCard";

const productsData = [
  { id: 1, name: "Product A", description: "Description A", price: 10 },
  { id: 2, name: "Product B", description: "Description B", price: 15 },
  { id: 3, name: "Product C", description: "Description C", price: 20 },
];

const ProductCardPage = () => (
  <div text-align="center" className="container">
    <h2>Homepage</h2>
    <div style={{ display: "flex", gap: "70px" }}>
      {productsData.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </div>
);

export default ProductCardPage;
