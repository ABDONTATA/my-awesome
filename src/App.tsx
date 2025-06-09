import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/Contexts/AuthProvider";
import { AdminApp } from "./AdminApp";
import UserApp from "./UserApp";

import { EcommerceLayout } from "./components/Ecommerce/EcommerceLayout";
import { Categories } from "./components/Ecommerce/Categories";
import { Products } from "./components/Ecommerce/Products";

const App = () => {
  // const { user } = useAuth();

  return (
    <Routes>
      {/* Main AdminApp route */}
      <Route path="/*" element={<AdminApp />} />

      {/* Ecommerce layout with nested pages */}
      <Route path="/EcommerceLayout" element={<EcommerceLayout />}>
        {/* Redirect to /categories by default */}
        <Route index element={<Navigate to="categories" replace />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );

  // if (user?.userRole === "ADMIN") return <AdminApp />;
  // return <UserApp />;
};

export default App;
