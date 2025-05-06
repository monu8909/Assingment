import React from "react";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total Price: ${total}</h3>
    </div>
  );
};

export default CartPage;
