import { useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function EventCreator({ onCreated }) {
  const [form, setForm] = useState({ event_title: '', date: '', location: '', description: '', budget: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Failed to create event');
      const data = await res.json();
      onCreated?.(data.id);
      setForm({ event_title: '', date: '', location: '', description: '', budget: 0 });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="create" className="container mx-auto px-6 py-10">
      <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6 text-white">
        <h2 className="text-2xl font-semibold">Create & Publish Event</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 mt-4">
          <input required placeholder="Event title" className="px-4 py-3 bg-slate-900/60 rounded-lg border border-white/10" value={form.event_title} onChange={(e)=>setForm({...form, event_title:e.target.value})} />
          <input required type="date" className="px-4 py-3 bg-slate-900/60 rounded-lg border border-white/10" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} />
          <input required placeholder="Location" className="px-4 py-3 bg-slate-900/60 rounded-lg border border-white/10" value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} />
          <input type="number" min="0" step="0.01" placeholder="Budget" className="px-4 py-3 bg-slate-900/60 rounded-lg border border-white/10" value={form.budget} onChange={(e)=>setForm({...form, budget:parseFloat(e.target.value || 0)})} />
          <textarea placeholder="Description" className="md:col-span-2 px-4 py-3 bg-slate-900/60 rounded-lg border border-white/10" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
          <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60">{loading ? 'Creating...' : 'Create Event'}</button>
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
