import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const NavBar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
};

export default NavBar;
