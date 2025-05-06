import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/AdminLogin";
import AdminDashboard from "./component/AdminDashboard";
// import ProductList from "./component/ProductList";
import UserForm from "./component/UserForm";
// import ProductCardPage from "./component/pages/ProductCardPage";
import ProductDetail from "./component/pages/ProductDetail";
import CartPage from "./component/pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ProductCardPage from "./component/pages/ProductCardPage";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/products" element={<ProductList />} /> */}
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/products" element={<ProductCardPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
