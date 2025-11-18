import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Progress({ value }) {
  return (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div className="h-2 bg-green-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  if (loading) return <div className="container mx-auto px-6 py-10 text-white">Loading events...</div>;

  return (
    <section className="container mx-auto px-6 py-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map(ev => (
        <div key={ev.id} className="rounded-2xl border border-white/10 bg-slate-800/40 text-white overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-emerald-500/30 to-blue-500/30" />
          <div className="p-6">
            <h3 className="text-xl font-semibold">{ev.event_title}</h3>
            <p className="text-slate-300 mt-1">{ev.location} • {ev.date}</p>
            <p className="text-slate-300 mt-2 line-clamp-3">{ev.description}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                <span>Volunteer participation</span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                <span>Donations goal</span>
                <span>$3,000</span>
              </div>
              <Progress value={45} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
