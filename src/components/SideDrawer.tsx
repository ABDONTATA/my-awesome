import { Settings, Bell, LogOut, Globe, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/Contexts/AuthProvider";

export function SideDrawer({ onClose }: { onClose: () => void }) {


const {logout} = useAuth()!;
const handleUserLogout = async () => { 
    try { 
        await logout();
         onClose();
    } catch(error){ 
        console.log(error);
    }
}

const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "drawer-overlay") {
      onClose();
    }
  };


  return (
    
    <div
      id="drawer-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/30 z-40 flex justify-end"
    >
    <div className="absolute top-20 right-4 w-64 bg-black text-white shadow-lg rounded-2xl z-40 border border-gray-700 overflow-hidden transition-transform duration-300 transform translate-x-0">
      <div className="p-4 border-b border-gray-700 items-center">
        <h2 className="text-lg font-semibold text-yellow-400">Account</h2>
      </div>

      <div className="p-4 space-y-4 text-sm">
        <Link to="/profile" onClick={onClose} className="flex items-center space-x-2 hover:text-yellow-400">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        <Link to="/notifications" onClick={onClose} className="flex items-center space-x-2 hover:text-yellow-400">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </Link>

        <Link to="/settings" onClick={onClose} className="flex items-center space-x-2 hover:text-yellow-400">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        <div className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Globe className="w-5 h-5" />
          <span>Language: EN</span>
        </div>

        <div className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Globe className="w-5 h-5" />
          <span>Country: US</span>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <span>Theme</span>
        </div>

        <button onClick={handleUserLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-400">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </div>
  );
}
