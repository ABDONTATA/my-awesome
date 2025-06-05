import { useAuth } from "@/Contexts/AuthProvider";
import {
  Home,
  Users,
  Paperclip,
  Link as LinkIcon,
  DollarSign,
  LogOut,
  LucideIcon,
  ShoppingBag,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  Icon: LucideIcon;
  title: string;
  to?: string;
  onClick?: () => void;
}

export const RouteSelect = () => {
  const { logout } = useAuth()!;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="space-y-1">
      <SidebarItem Icon={Home} title="Dashboard" to="/dashboard" />
      <SidebarItem Icon={Users} title="Team" to="/team" />
      <SidebarItem Icon={Paperclip} title="Invoices" to="/invoices" />
      <SidebarItem Icon={LinkIcon} title="Integrations" to="/integrations" />
      <SidebarItem Icon={DollarSign} title="Finance" to="/finance" />
      <SidebarItem Icon={ShoppingBag} title="eCommerce" to="/ecommerce" />
      <SidebarItem Icon={LogOut} title="Logout" onClick={handleLogout} />
    </div>
  );
};

const SidebarItem = ({ Icon, title, to, onClick }: SidebarItemProps) => {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200";
  const activeClasses = "bg-violet-100 text-violet-700 shadow";
  const hoverLuxury =
    "hover:bg-gradient-to-r hover:from-violet-100 hover:to-transparent hover:text-violet-700";

  const commonFocus =
    "focus:outline-none focus:ring-0 focus-visible:ring-0";

  const fullClass = `${baseClasses} ${hoverLuxury} ${commonFocus}`;

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : fullClass
        }
      >
        <Icon className="text-violet-500 w-5 h-5" />
        <span>{title}</span>
      </NavLink>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${fullClass} w-full text-left`}
    >
      <Icon className="text-violet-500 w-5 h-5" />
      <span>{title}</span>
    </button>
  );
};
