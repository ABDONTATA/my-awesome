import { useAuth } from '@/Contexts/AuthProvider';
import React from 'react';

export const Profile: React.FC = () => {
  const { user } = useAuth()!;
 // To do : khas les adresses :
 
 /*
  private String street;
  private String city;
  private String state;
  private String postalCode;
  private String country;
*/
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Profile</h1>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                <p className="text-lg text-gray-700"><span className="font-semibold">Username:</span> {user?.username}</p>
                <p className="text-lg text-gray-700"><span className="font-semibold">Email:</span> {user?.email}</p>
                <p className="text-lg text-gray-700"><span className="font-semibold">Role:</span> {user?.userRole}</p>
                <p className="text-lg text-gray-700"><span className="font-semibold">Joined:</span> {/* Add your date here */}</p>
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-300" />

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Activity</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="p-3">2025-05-15</td>
                    <td className="p-3">Updated Profile Information</td>
                    <td className="p-3 text-green-600 font-medium">Success</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">2025-05-14</td>
                    <td className="p-3">Changed Password</td>
                    <td className="p-3 text-green-600 font-medium">Success</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
