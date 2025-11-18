import Hero from './components/Hero';
import QuickStats from './components/QuickStats';
import EventCreator from './components/EventCreator';
import EventList from './components/EventList';
import Auth from './components/Auth';
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [stats, setStats] = useState({ totalEvents: 0, volunteers: 0, donations: 0, tasks: 0 });
  const [user, setUser] = useState(null);

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

  const loadMe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) { /* ignore */ }
  }

  useEffect(() => { loadStats(); loadMe(); }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <QuickStats stats={stats} />

      {!user && <Auth onAuth={loadMe} />}

      {user && (
        <div className="container mx-auto px-6 -mt-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between mb-6">
            <div>
              <div className="text-slate-200">Signed in as</div>
              <div className="font-semibold">{user.name} <span className="text-slate-400">({user.role})</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>{localStorage.removeItem('token'); setUser(null);}} className="px-4 py-2 bg-slate-800 rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      )}

      <EventCreator onCreated={loadStats} />
      <EventList />
      <footer className="container mx-auto px-6 py-10 text-slate-400">
        ImpactFlow – Intelligent Event & Volunteer Management System for NGOs
      </footer>
    </div>
  );
}

export default App
