import Hero from './components/Hero';
import QuickStats from './components/QuickStats';
import EventCreator from './components/EventCreator';
import EventList from './components/EventList';
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [stats, setStats] = useState({ totalEvents: 0, volunteers: 0, donations: 0, tasks: 0 });

  const loadStats = async () => {
    try {
      const [events, volunteers, donations, tasks] = await Promise.all([
        fetch(`${API_BASE}/events`).then(r=>r.json()).catch(()=>[]),
        fetch(`${API_BASE}/volunteers`).then(r=>r.json()).catch(()=>[]),
        fetch(`${API_BASE}/donations`).then(r=>r.json()).catch(()=>[]),
        fetch(`${API_BASE}/tasks`).then(r=>r.json()).catch(()=>[]),
      ]);
      const donationsSum = (donations || []).reduce((s, d) => s + (d.amount || 0), 0);
      setStats({
        totalEvents: (events || []).length,
        volunteers: (volunteers || []).length,
        donations: donationsSum,
        tasks: (tasks || []).length,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadStats(); }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <QuickStats stats={stats} />
      <EventCreator onCreated={loadStats} />
      <EventList />
      <footer className="container mx-auto px-6 py-10 text-slate-400">
        ImpactFlow – Intelligent Event & Volunteer Management System for NGOs
      </footer>
    </div>
  );
}

export default App
