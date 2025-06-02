import { useAuth } from "@/Contexts/AuthProvider";
import { AdminApp } from "./AdminApp";
import UserApp from "./UserApp";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/*" element={<UserApp />} />
      ) : user?.userRole === "ADMIN" ? (
        <Route path="/*" element={<AdminApp />} />
      ) : (
        <>
          <Route path="/*" element={<UserApp />} />
          <Route path="/cart" element={<CartPage />} />
        </>
      )}
    </Routes>
  );
};
export default App;
