import { Calendar } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="border-b border-gray-700 px-4 mb-4 mt-2 pb-4 bg-gray-900">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold text-white block">Good morning!</span>
          <span className="text-xs block text-gray-400">
            Tuesday, Aug 8th 2023
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-gray-800 text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-gray-900 px-3 py-1.5 rounded-lg">
          <Calendar className="stroke-yellow-400 group-hover:stroke-gray-900" />
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};
