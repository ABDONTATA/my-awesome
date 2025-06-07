import { Outlet, NavLink } from "react-router-dom";

export default function EcommerceLayout() {
  return (
  
    <div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div> 
  );
}
