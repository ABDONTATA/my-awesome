import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Login from "./pages/AuthFolder/Login";
import Register from "./pages/AuthFolder/Register";
import Product from "./pages/ProductsFolder/Product";
import ProductDetail from "./pages/ProductsFolder/ProductDetail";
import Settings from "./pages/Settings";
import Payment from "./pages/PaymentFolder/Payment";
import PaymentSuccess from "./pages/PaymentFolder/PaymentSuccess";
import NotFound from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { OAuth2Callback } from "./Contexts/OAuth2Callback";
import CartPage from "./pages/CartPage";
import { EcommercePage } from "./components/Ecommerce/EcommercePage";
import { EcommerceLayout } from "./components/Ecommerce/EcommerceLayout";
import { Categories } from "./components/Ecommerce/Categories";
import { Products } from "./components/Ecommerce/Products";
const UserApp = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/products" element={<Product />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/auth/callback" element={<OAuth2Callback />} />
    <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/ecommerce" element={<EcommerceLayout />}>
      <Route index element={<Navigate to="categories" replace />} />
      <Route path="categories" element={<Categories />} />
      <Route path="products" element={<Products />} />
    </Route>
    <Route path="/cart" element={<CartPage />} /> {}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default UserApp;
