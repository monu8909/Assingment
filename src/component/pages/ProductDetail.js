import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
const ProductDetail = () => {
  const [cardData, setcardData] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setcardData(data));
  }, []);
  console.log("cardDatasdsdsd", cardData);

  const { id } = useParams();
  const product = cardData.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <p>Product not found</p>;

  //   const addToCart = async () => {
  //     try {
  //       await axios.post("http://localhost:3001/cart", {
  //         productId: product.id,
  //         name: product.name,
  //         price: product.price,
  //         quantity: quantity,
  //       });
  //       alert("Product added to cart!");
  //     } catch (error) {
  //       console.error("Failed to add to cart:", error);
  //       alert("Error adding product to cart.");
  //     }
  //   };

  return (
    <div className="product-detail-container">
      <div style={{ margin: "20px" }}>
        <Link className="add-to-cart" to={"/cart"}>
          Go to cart
        </Link>
      </div>
      <div className="product-card">
        <div className="product-image">
          <img src="https://via.placeholder.com/400x300" alt={product.name} />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
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
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
