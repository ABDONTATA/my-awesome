import React, { useState } from 'react';

export const Profile: React.FC = () => {
    const [User, setUser] = useState(null);

    
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Profile Page</h1>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {}
                    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-white">
                        JD
                    </div>

                    {}
                    <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-700">Name: </p>
                        <p className="text-gray-600 mt-1">Email:</p>
                        <p className="text-gray-600 mt-1">Role: </p>
                        <p className="text-gray-600 mt-1">Joined:</p>
                    </div>
                </div>

                {}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Activity</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-3">2025-05-15</td>
                                    <td className="p-3">Updated Profile Information</td>
                                    <td className="p-3 text-green-600 font-semibold">Success</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-3">2025-05-14</td>
                                    <td className="p-3">Changed Password</td>
                                    <td className="p-3 text-green-600 font-semibold">Success</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
