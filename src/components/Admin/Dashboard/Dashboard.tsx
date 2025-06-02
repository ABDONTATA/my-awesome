
import { StatCards } from './StatCards';
import { ActivityGraph } from './ActivityGraph';
import { RecentTransactions } from './RecentTransactions';
import { UsageRadar } from './UsageRadar';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
     
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityGraph />
        </div>
        <div>
          <UsageRadar />
        </div>
      </div>
      
      <RecentTransactions />
    </div>
  );
};