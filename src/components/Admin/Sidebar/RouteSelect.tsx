import { Home, Users, Paperclip, Link, DollarSign, LucideIcon, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  Icon: LucideIcon;
  title: string;
  to?: string;
  onClick?: () => void;
}
 
export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={Home} title="Dashboard" />
      <Route Icon={Users} title="Team" />
      <Route Icon={Paperclip} title="Invoices" />
      <Route Icon={Link} title="Integrations" />
      <Route Icon={DollarSign} title="Finance" />
      <Route Icon={LogOut} title="Logout" />
    </div>
  );
};

const Route = ({
  Icon,
  title,
  to,
  onClick 
} : SidebarItemProps) => {
  
  const baseClasses =
    "flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors " +
    "bg-white text-stone-950 shadow cursor-pointer";

  const activeClasses = "bg-violet-100 text-violet-700 shadow-md";
 

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : "hover:bg-violet-50"}`
        }
      >
        <Icon className="text-violet-500" />
        <span>{title}</span>
      </NavLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} hover:luxury-link focus:outline-none focus:ring-2 focus:ring-violet-500`}
      type="button"
    >
      <Icon className="text-violet-500" />
      <span>{title}</span>
    </button>
  );
};
