// src/components/Admin/Sidebar/Sidebar.tsx
import { SetStateAction } from 'react';
import { AccountToggle } from './AccountToggle';
import { CommandMenu } from './CommandMenu';
import { Plan } from './Plan';
import { RouteSelect } from './RouteSelect';
import { Search } from './Search';

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col h-full">
      <div className="mb-6">
        <RouteSelect />
      </div>
      
      <div className="mb-4">
        <Search />
      </div>
      
      <nav className="flex-1">
        {}
      </nav>
      
      <div className="space-y-4">
        <CommandMenu open={false} setOpen={function (value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
        <Plan />
        <AccountToggle />
      </div>
    </aside>
  );
};