export default function QuickStats({ stats }) {
  const items = [
    { label: 'Total Events', value: stats.totalEvents ?? 0 },
    { label: 'Volunteers', value: stats.volunteers ?? 0 },
    { label: 'Donations', value: `$${(stats.donations ?? 0).toLocaleString()}` },
    { label: 'Tasks', value: stats.tasks ?? 0 },
  ];

  return (
    <section id="dashboard" className="container mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((it) => (
        <div key={it.label} className="rounded-2xl border border-white/10 bg-slate-800/40 p-6 text-white">
          <div className="text-sm text-slate-300">{it.label}</div>
          <div className="mt-2 text-3xl font-bold">{it.value}</div>
        </div>
      ))}
    </section>
  );
}
