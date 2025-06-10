import { useState } from "react";
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
  ChevronDown,
  ChevronUp,
  Package,
  Folder,
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

      <SidebarCollapsible Icon={ShoppingBag} title="eCommerce">
        <SidebarItem Icon={Package} title="Products" to="/ecommerce/products" />
        <SidebarItem
          Icon={Folder}
          title="Categories"
          to="/ecommerce/categories"
        />
      </SidebarCollapsible>

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

  const commonFocus = "focus:outline-none focus:ring-0 focus-visible:ring-0";

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

const SidebarCollapsible = ({
  Icon,
  title,
  children,
}: {
  Icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gradient-to-r hover:from-violet-100 hover:to-transparent hover:text-violet-700 transition-colors"
      >
        <span className="flex items-center gap-3">
          <Icon className="text-violet-500 w-5 h-5" />
          {title}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-violet-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-violet-500" />
        )}
      </button>

      {open && <div className="pl-9 mt-1 space-y-1">{children}</div>}
    </div>
  );
};
