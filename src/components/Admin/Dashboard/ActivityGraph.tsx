import React from 'react';
import { User } from 'lucide-react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from 'recharts';

const data = [
  { name: 'Jan', Returning: 275, New: 41 },
  { name: 'Feb', Returning: 620, New: 96 },
  { name: 'Mar', Returning: 202, New: 192 },
  { name: 'Apr', Returning: 500, New: 50 },
  { name: 'May', Returning: 355, New: 400 },
  { name: 'Jun', Returning: 875, New: 200 },
  { name: 'Jul', Returning: 700, New: 205 },
];

export const ActivityGraph = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-300 bg-gray-800">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium text-white">
          <User /> Activity
        </h3>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold text-gray-400"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold text-gray-400"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded bg-gray-700 text-white"
              labelClassName="text-xs text-gray-300"
            />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.2}
            />
            <Line
              type="monotone"
              dataKey="Returning"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};