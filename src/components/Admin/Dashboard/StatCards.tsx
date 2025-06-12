export const StatCards = () => {
  const stats = [
    { title: 'Total des ventes', value: '$12,345', change: '+12%' },
    { title: 'Nouvelles commandes', value: '54', change: '+7%' },
    { title: 'Utilisateurs actifs', value: '892', change: '+3%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800 text-white rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors"
        >
          <h3 className="text-sm text-gray-400">{stat.title}</h3>
          <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          <p className="text-sm text-yellow-300 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};