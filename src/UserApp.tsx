import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Login from "./pages/AuthFolder/Login";
import Register from "./pages/AuthFolder/Register";
import Product from "./pages/ProductsFolder/product";
import ProductDetail from "./pages/ProductsFolder/ProductDetail";
import Settings from "./pages/Settings";
import Payment from "./pages/PaymentFolder/Payment";
import PaymentSuccess from "./pages/PaymentFolder/PaymentSuccess";
import NotFound from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { OAuth2Callback } from "./Contexts/OAuth2Callback";
import CartPage from "./pages/CartPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RXP7jRXt2oHwSVAQA99Rrapn9mNhTGOPWBK93DLzRxpKwMkP1lrN5XttBHCRGrjAQIwj3RnLynt4cqkwMOz5Nm700aFAQ7EVr"
);
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
    <Route
      path="/payment"
      element={
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      }
    />
    <Route
      path="/payment-success/:orderId"
      element={
        <Elements stripe={stripePromise}>
          <PaymentSuccess />
        </Elements>
      }
    />
    <Route path="/auth/callback" element={<OAuth2Callback />} />
    <Route path="/cart" element={<CartPage />} /> {}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default UserApp;
