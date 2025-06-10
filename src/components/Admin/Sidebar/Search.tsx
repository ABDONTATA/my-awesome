import { useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { Command, Search } from "lucide-react";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 mb-4 relative rounded-lg flex items-center px-3 py-2 text-sm">
        <Search className="mr-2 text-yellow-400" />
        <input
          onFocus={(e) => {
            e.target.blur();
            setOpen(true);
          }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-gray-400 text-white focus:outline-none"
        />

        <span className="p-1 text-xs flex gap-0.5 items-center bg-gray-800 text-yellow-400 shadow rounded absolute right-2 top-1/2 -translate-y-1/2 select-none">
          <Command className="w-3 h-3" />
          K
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};

export { Search };
