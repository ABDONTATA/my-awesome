import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Admin/Sidebar/Sidebar";

export const AdminLayout = () => {
  return (
    <main className="grid grid-cols-[220px_1fr] h-screen">
      <Sidebar />
      <section className="p-4">
        <Outlet />
      </section>
    </main>
  );
};
