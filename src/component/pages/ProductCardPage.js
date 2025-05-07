import React from "react";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
const ProductCardPage = () => {
  const [cardData, setcardData] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setcardData(data));
  }, []);
  return (
    <div text-align="center" className="container">
      <h2>Homepage</h2>
      <div style={{ margin: "20px" }}>
        <Link className="add-to-cart" to={"/cart"}>
          Go to cart
        </Link>
      </div>
      <div style={{ display: "flex", gap: "70px" }}>
        {cardData.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardPage;
