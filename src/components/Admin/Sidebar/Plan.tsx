export const Plan = () => {
  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-16 border-t border-gray-700 px-4 bg-gray-900 justify-center text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-white">Enterprise</p>
          <p className="text-gray-400">Pay as you go</p>
        </div>

        <button className="px-3 py-1.5 font-medium rounded bg-gray-800 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 transition-colors">
          Support
        </button>
      </div>
    </div>
  );
};
