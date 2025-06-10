import { AccountToggle } from "./AccountToggle";
import { SearchBar } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = () => {
  return (
    <aside className="h-screen w-72 bg-black text-white flex flex-col justify-between p-6 shadow-xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400">LUXE</h1>
        <SearchBar />
        <RouteSelect />
        <AccountToggle />
      </div>

      <div className="pt-6 border-t border-yellow-400">
        <Plan />
      </div>
    </aside>
  );
};
