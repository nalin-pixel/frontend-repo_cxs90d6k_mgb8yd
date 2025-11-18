import { useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'volunteer',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, role: form.role, password: form.password })
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Registration failed');
      setMode('login');
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  const handleLogin = async () => {
    setLoading(true); setError('');
    try {
      const body = new URLSearchParams();
      body.append('username', form.email);
      body.append('password', form.password);
      const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Login failed');
      localStorage.setItem('token', data.access_token);
      if (onAuth) onAuth(data);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('login')} className={`px-4 py-2 rounded-lg ${mode==='login'?'bg-indigo-600 text-white':'bg-slate-800 text-slate-300'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`px-4 py-2 rounded-lg ${mode==='register'?'bg-indigo-600 text-white':'bg-slate-800 text-slate-300'}`}>Sign up</button>
        </div>
        {mode==='register' && (
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
            <select name="role" value={form.role} onChange={handleChange} className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white">
              <option value="volunteer">Volunteer</option>
              <option value="coordinator">Coordinator</option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
            </select>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
          </div>
        )}
        {mode==='login' && (
          <div className="grid md:grid-cols-2 gap-4">
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="bg-slate-800 rounded-lg px-4 py-3 outline-none text-white" />
          </div>
        )}
        {error && <div className="text-red-400 mt-3">{error}</div>}
        <div className="flex gap-3 mt-6">
          {mode==='login' ? (
            <button disabled={loading} onClick={handleLogin} className="px-5 py-3 bg-indigo-600 rounded-lg disabled:opacity-60">{loading? 'Logging in...' : 'Login'}</button>
          ) : (
            <button disabled={loading} onClick={handleRegister} className="px-5 py-3 bg-indigo-600 rounded-lg disabled:opacity-60">{loading? 'Creating account...' : 'Create account'}</button>
          )}
          <button onClick={()=> setMode(mode==='login'?'register':'login')} className="px-4 py-3 bg-slate-800 rounded-lg">Switch to {mode==='login'?'Sign up':'Login'}</button>
        </div>
        <p className="text-slate-400 mt-3 text-sm">Tip: choose role "Admin" for admin access or "Volunteer" for volunteer access when signing up.</p>
      </div>
    </div>
  );
}
