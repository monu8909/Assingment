import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { removeFromCart, updateQuantity, cart } = useCart();
  const [cardData, setcardData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((data) => setcardData(data));
  }, [cart]);
  var cartPrice = 0;

  cartPrice = cardData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      <div style={{ margin: "20px" }}>
        <Link className="add-to-cart" to={"/products"}>
          Go to products
        </Link>
      </div>
      {cardData.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
          <p>Total: ${item.price * item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, 1, item.price)}>
            +
          </button>
          <button onClick={() => updateQuantity(item.id, -1, item.price)}>
            -
          </button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total Price: ${cartPrice}</h3>
    </div>
  );
};

export default CartPage;
