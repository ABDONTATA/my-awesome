import { StatCards } from './StatCards';
import { ActivityGraph } from './ActivityGraph';
import { RecentTransactions } from './RecentTransactions';
import { UsageRadar } from './UsageRadar';

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-900 text-white min-h-screen">
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg">
          <ActivityGraph />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <UsageRadar />
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <RecentTransactions />
      </div>
    </div>
  );
};