import { ChevronDown, ChevronUp } from "lucide-react";

export const AccountToggle = () => {
  return (
    <div className="border-b border-gray-700 mb-4 mt-2 pb-4 bg-gray-900 rounded-lg">
      <button className="flex p-1 hover:bg-gray-800 rounded-lg transition-colors relative gap-3 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="w-8 h-8 rounded-full shrink-0 bg-violet-600 shadow-md"
        />
        <div className="text-start flex-1">
          <span className="text-sm font-bold block text-white">Mouadox is loading ..</span>
          <span className="text-xs block text-gray-400">mouaad@hover.dev</span>
        </div>

        <ChevronDown className="absolute right-3 top-1/2 translate-y-[-50%] text-yellow-400 text-xs" />
        <ChevronUp className="absolute right-3 top-1/2 translate-y-[-50%] text-yellow-400 text-xs opacity-0" />
      </button>
    </div>
  );
};
