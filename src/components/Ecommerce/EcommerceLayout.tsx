import { NavLink, Outlet } from "react-router-dom";

export const EcommerceLayout = () => {
  return (
    <div className="p-6">
      <div className="flex border-b border-gray-200 space-x-4">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "text-violet-700 border-b-2 border-violet-700"
                : "text-gray-500 hover:text-violet-700"
            }`
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "text-violet-700 border-b-2 border-violet-700"
                : "text-gray-500 hover:text-violet-700"
            }`
          }
        >
          Products
        </NavLink>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};
