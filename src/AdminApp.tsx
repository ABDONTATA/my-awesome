import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Admin/Sidebar/Sidebar";
import { Dashboard } from "@/components/Admin/Dashboard/Dashboard";

export const AdminApp = () => (
     <main className="grid grid-cols-[220px_1fr] h-screen">         
          <Sidebar />
          <Dashboard />
    </main>
);
