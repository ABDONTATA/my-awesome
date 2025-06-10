export const StatCards = () => {
  const stats = [
    { title: 'totale des ', value: '$12,345', change: '+12%' },
    { title: 'les nouveux commandes', value: '54', change: '+7%' },
    { title: 'les utlisateurs actives', value: '892', change: '+3%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border p-4">
          <h3 className="text-sm text-muted-foreground">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-success">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};