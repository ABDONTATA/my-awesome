import { Command } from "cmdk";
import { Plus, Eye, Link, Phone, LogOut } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-gray-900/70 flex items-start justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden w-full max-w-lg mt-16"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need?"
          className="w-full p-4 text-lg bg-gray-900 border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none"
          autoFocus
        />
        <Command.List className="p-3 max-h-72 overflow-y-auto">
          <Command.Empty className="text-gray-400 text-sm px-2 py-4">
            No results found for{" "}
            <span className="text-yellow-400">"{value}"</span>
          </Command.Empty>

          <Command.Group heading="Team" className="text-sm mb-3 text-gray-400 px-2">
            <Command.Item className="flex cursor-pointer p-2 rounded gap-2 items-center text-white hover:bg-yellow-900 transition-colors">
              <Plus className="text-yellow-400" />
              Invite Member
            </Command.Item>
            <Command.Item className="flex cursor-pointer p-2 rounded gap-2 items-center text-white hover:bg-yellow-900 transition-colors">
              <Eye className="text-yellow-400" />
              See Org Chart
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Integrations" className="text-sm mb-3 text-gray-400 px-2">
            <Command.Item className="flex cursor-pointer p-2 rounded gap-2 items-center text-white hover:bg-yellow-900 transition-colors">
              <Link className="text-yellow-400" />
              Link Services
            </Command.Item>
            <Command.Item className="flex cursor-pointer p-2 rounded gap-2 items-center text-white hover:bg-yellow-900 transition-colors">
              <Phone className="text-yellow-400" />
              Contact Support
            </Command.Item>
          </Command.Group>

          <Command.Item className="flex cursor-pointer p-2 rounded gap-2 items-center text-yellow-400 hover:bg-yellow-700 bg-gray-800 transition-colors">
            <LogOut className="text-yellow-400" />
            Sign Out
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
