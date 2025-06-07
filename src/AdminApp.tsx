import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/components/Admin/Dashboard/Dashboard";
import { Categories } from "./components/Ecommerce/Categories";
import { Products } from "./components/Ecommerce/Products";
import EcommerceLayout from "./components/Ecommerce/EcommerceLayout";
import { AdminLayout } from "./components/Admin/AdminLayout";

export const AdminApp = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />

      <Route path="ecommerce" element={<EcommerceLayout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Route>
  </Routes>
);