import { useAuth } from "@/Contexts/AuthProvider";
import { AdminApp } from "./AdminApp";
import UserApp from "./UserApp";


const App = () => {
  const { user } = useAuth();
  if (user?.userRole === "ADMIN") return <AdminApp />;
  return <UserApp />;
};

export default App;
