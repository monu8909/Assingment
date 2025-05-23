import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminLogin from "./component/AdminLogin";
// import AdminDashboard from "./component/AdminDashboard";
// import UserForm from "./component/UserForm";
// import ProductDetail from "./pages/ProductDetail";
// import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ProductCardPage from "./pages/ProductCardPage";
import { ToastContainer } from "react-toastify";
// import UserCreateForm from "./component/UserCreateForm";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./component/AuthGuard";
import Homelayout from "./layout/index";
import "./App.css";
// import PixiGame from "./PixiFIles/PixiGame";
function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Homelayout>
                    <ProductCardPage />
                  </Homelayout>
                </AuthGuard>
              }
            />
            {/* <Route path="/login" element={<AdminLogin />} /> */}
            {/* <Route
              path="/admin/dashboard"
              element={
                <AuthGuard>
                  <Homelayout>
                    <AdminDashboard />
                  </Homelayout>
                </AuthGuard>
              }
            />
            <Route path="/user-form" element={<UserForm />} />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Homelayout>
                    <ProductCardPage />
                  </Homelayout>
                </AuthGuard>
              }
            />
            <Route
              path="/product/:_id"
              element={
                <AuthGuard>
                  <Homelayout>
                    <ProductDetail />
                  </Homelayout>
                </AuthGuard>
              }
            />
            <Route
              path="/cart"
              element={
                <AuthGuard>
                  <Homelayout>
                    <CartPage />
                  </Homelayout>
                </AuthGuard>
              }
            />
            <Route path="/create-user" element={<UserCreateForm />} />
            <Route path="/pixi-game" element={<PixiGame />} /> */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
