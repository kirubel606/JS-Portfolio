import React, { useEffect, useState } from 'react';
import { FaLock, FaSignOutAlt, FaUser, FaLink, FaIdCard, FaPlus, FaTrash, FaPen } from 'react-icons/fa';
import { useTheme } from '../context/context';

const TOKEN_KEY = 'admin_token';
const initialLinkForm = { id: '', title: '', description: '', url: '' };

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function saveToken(t) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }
function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` };
}

/* ─── Login ─────────────────────────────────────────────── */
function LoginForm({ onSuccess, theme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed.'); return; }
      saveToken(data.token);
      onSuccess();
    } catch { setError('Could not connect to server.'); }
    finally { setLoading(false); }
  };

  return (
    <div data-theme={theme} onMouseMove={handleMouseMove}
      className="inset-hover bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="neumorphism p-8 rounded-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="neumorphism-inset p-4 rounded-full mb-4">
              <FaLock className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to manage your portfolio</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                required autoComplete="username"
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                required autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold mt-2 disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── Links Tab ──────────────────────────────────────────── */
function LinksTab({ onUnauth }) {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(initialLinkForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadLinks = async () => {
    try {
      const r = await fetch('/api/links');
      const d = await r.json();
      setLinks(Array.isArray(d) ? d : []);
    } catch { setMessage('Failed to load featured links.'); }
  };

  useEffect(() => { loadLinks(); }, []);

  const handle401 = (res) => { if (res.status === 401) { clearToken(); onUnauth(); return true; } return false; };

  const onSubmit = async (e) => {
    e.preventDefault(); setIsSaving(true); setMessage('');
    try {
      const method = form.id ? 'PUT' : 'POST';
      const res = await fetch('/api/links', { method, headers: authHeaders(), body: JSON.stringify(form) });
      const payload = await res.json();
      if (handle401(res)) return;
      if (!res.ok) throw new Error(payload.error || 'Request failed.');
      setLinks(payload);
      setMessage(form.id ? 'Link updated.' : 'Link added.');
      setForm(initialLinkForm);
    } catch (err) { setMessage(err.message || 'Failed to save.'); }
    finally { setIsSaving(false); }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this link?')) return;
    setMessage('');
    try {
      const res = await fetch(`/api/links?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: authHeaders() });
      const payload = await res.json();
      if (handle401(res)) return;
      if (!res.ok) throw new Error(payload.error || 'Delete failed.');
      setLinks(payload);
      if (form.id === id) setForm(initialLinkForm);
      setMessage('Link deleted.');
    } catch (err) { setMessage(err.message || 'Failed to delete.'); }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="neumorphism p-6 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['title', 'description', 'url'].map((field) => (
            <input key={field} name={field} value={form[field]}
              onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
              placeholder={field === 'url' ? 'https://...' : field.charAt(0).toUpperCase() + field.slice(1)}
              required={field === 'url'}
              className="px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900 focus:outline-none" />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <button type="submit" disabled={isSaving}
            className="px-5 py-2 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold text-sm">
            {isSaving ? 'Saving…' : form.id ? 'Update Link' : 'Add Link'}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(initialLinkForm)}
              className="px-5 py-2 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold text-sm">
              Cancel
            </button>
          )}
          {message && <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {links.map((item) => (
          <div key={item.id} className="featured-neumorphism p-4 rounded-2xl">
            <div className="featured-neumorphism-inset p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.title || 'Untitled'}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description || 'No description'}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline break-all">{item.url}</a>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setForm({ id: item.id || '', title: item.title || '', description: item.description || '', url: item.url || '' })}
                  className="px-4 py-2 rounded-lg neumorphism text-gray-900 dark:text-white text-sm">Edit</button>
                <button onClick={() => onDelete(item.id)}
                  className="px-4 py-2 rounded-lg neumorphism text-gray-900 dark:text-white text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── About Tab ──────────────────────────────────────────── */
const blankExp = () => ({ id: `exp-${Date.now()}`, role: '', company: '', period: '', description: '' });
const blankStat = () => ({ id: `stat-${Date.now()}`, label: '', value: '' });
const blankCat = () => ({ id: `skill-cat-${Date.now()}`, category: '', items: [] });

function AboutTab({ onUnauth }) {
  const [about, setAbout] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingExp, setEditingExp] = useState(null);

  const load = async () => {
    const r = await fetch('/api/about');
    const d = await r.json();
    setAbout(d);
  };

  useEffect(() => { load(); }, []);

  const save = async (data) => {
    setSaving(true); setMessage('');
    try {
      const r = await fetch('/api/about', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) });
      if (r.status === 401) { clearToken(); onUnauth(); return; }
      if (!r.ok) throw new Error('Save failed.');
      const updated = await r.json();
      setAbout(updated);
      setMessage('Saved successfully.');
    } catch (err) { setMessage(err.message); }
    finally { setSaving(false); }
  };

  if (!about) return <div className="text-gray-500 dark:text-gray-400 text-sm">Loading about data…</div>;

  const update = (key, val) => setAbout((p) => ({ ...p, [key]: val }));

  /* stats */
  const addStat = () => update('stats', [...(about.stats || []), blankStat()]);
  const removeStat = (id) => update('stats', about.stats.filter((s) => s.id !== id));
  const updateStat = (id, field, val) =>
    update('stats', about.stats.map((s) => s.id === id ? { ...s, [field]: val } : s));

  /* skills */
  const addCategory = () => update('skills', [...(about.skills || []), blankCat()]);
  const removeCategory = (id) => update('skills', about.skills.filter((c) => c.id !== id));
  const updateCatName = (id, val) =>
    update('skills', about.skills.map((c) => c.id === id ? { ...c, category: val } : c));
  const addSkillItem = (id) =>
    update('skills', about.skills.map((c) => c.id === id ? { ...c, items: [...c.items, ''] } : c));
  const updateSkillItem = (catId, idx, val) =>
    update('skills', about.skills.map((c) => c.id === catId
      ? { ...c, items: c.items.map((it, i) => i === idx ? val : it) } : c));
  const removeSkillItem = (catId, idx) =>
    update('skills', about.skills.map((c) => c.id === catId
      ? { ...c, items: c.items.filter((_, i) => i !== idx) } : c));

  /* experience */
  const expList = about.experience || [];
  const saveExp = (exp) => {
    const exists = expList.find((e) => e.id === exp.id);
    update('experience', exists ? expList.map((e) => e.id === exp.id ? exp : e) : [exp, ...expList]);
    setEditingExp(null);
  };
  const deleteExp = (id) => update('experience', expList.filter((e) => e.id !== id));

  return (
    <div className="space-y-10">

      {/* Bio */}
      <section className="neumorphism rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Bio</h3>
        <textarea rows={4} value={about.bio || ''}
          onChange={(e) => update('bio', e.target.value)}
          className="w-full px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900 focus:outline-none resize-none text-sm" />
      </section>

      {/* Contact */}
      <section className="neumorphism rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Contact Email</h3>
        <input type="email" value={about.contact?.email || ''}
          onChange={(e) => update('contact', { ...about.contact, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900 focus:outline-none text-sm" />
      </section>

      {/* Stats */}
      <section className="neumorphism rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Stats</h3>
          <button onClick={addStat}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg neumorphism text-sm text-gray-900 dark:text-white">
            <FaPlus className="text-xs" /> Add
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(about.stats || []).map((s) => (
            <div key={s.id} className="neumorphism-inset rounded-xl p-3 space-y-2">
              <input placeholder="Value (e.g. 3+)" value={s.value}
                onChange={(e) => updateStat(s.id, 'value', e.target.value)}
                className="w-full px-3 py-2 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-sm font-bold" />
              <input placeholder="Label" value={s.label}
                onChange={(e) => updateStat(s.id, 'label', e.target.value)}
                className="w-full px-3 py-2 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-xs" />
              <button onClick={() => removeStat(s.id)}
                className="w-full py-1 rounded-lg neumorphism text-xs text-red-500 dark:text-red-400 flex items-center justify-center gap-1">
                <FaTrash className="text-[10px]" /> Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="neumorphism rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Skills</h3>
          <button onClick={addCategory}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg neumorphism text-sm text-gray-900 dark:text-white">
            <FaPlus className="text-xs" /> Add Category
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {(about.skills || []).map((cat) => (
            <div key={cat.id} className="neumorphism-inset rounded-xl p-4 space-y-3">
              <div className="flex gap-2">
                <input placeholder="Category name" value={cat.category}
                  onChange={(e) => updateCatName(cat.id, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-sm font-semibold" />
                <button onClick={() => removeCategory(cat.id)}
                  className="px-2 rounded-lg neumorphism text-red-500 dark:text-red-400 text-xs"><FaTrash /></button>
              </div>
              <div className="space-y-2">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input value={item}
                      onChange={(e) => updateSkillItem(cat.id, idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-xs" />
                    <button onClick={() => removeSkillItem(cat.id, idx)}
                      className="px-2 rounded-lg neumorphism text-red-500 dark:text-red-400 text-xs"><FaTrash /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => addSkillItem(cat.id)}
                className="w-full py-1.5 rounded-lg neumorphism text-xs text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1">
                <FaPlus className="text-[10px]" /> Add skill
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="neumorphism rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Experience</h3>
          <button onClick={() => setEditingExp(blankExp())}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg neumorphism text-sm text-gray-900 dark:text-white">
            <FaPlus className="text-xs" /> Add Entry
          </button>
        </div>

        {editingExp && (
          <div className="neumorphism-inset rounded-xl p-5 space-y-3">
            {['role', 'company', 'period'].map((f) => (
              <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={editingExp[f]}
                onChange={(e) => setEditingExp((p) => ({ ...p, [f]: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-sm" />
            ))}
            <textarea rows={3} placeholder="Description" value={editingExp.description}
              onChange={(e) => setEditingExp((p) => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg neumorphism bg-transparent dark:text-white text-gray-900 focus:outline-none text-sm resize-none" />
            <div className="flex gap-3">
              <button onClick={() => saveExp(editingExp)}
                className="px-4 py-2 rounded-lg neumorphism text-sm text-gray-900 dark:text-white font-semibold">Save</button>
              <button onClick={() => setEditingExp(null)}
                className="px-4 py-2 rounded-lg neumorphism text-sm text-gray-900 dark:text-white">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {expList.map((exp) => (
            <div key={exp.id} className="neumorphism-inset rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{exp.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company} · {exp.period}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditingExp({ ...exp })}
                    className="px-3 py-1.5 rounded-lg neumorphism text-xs text-gray-900 dark:text-white"><FaPen /></button>
                  <button onClick={() => deleteExp(exp.id)}
                    className="px-3 py-1.5 rounded-lg neumorphism text-xs text-red-500 dark:text-red-400"><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button onClick={() => save(about)} disabled={saving}
          className="px-6 py-3 rounded-xl neumorphism text-gray-900 dark:text-white font-semibold disabled:opacity-60">
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
        {message && <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>}
      </div>
    </div>
  );
}

/* ─── Main Admin ─────────────────────────────────────────── */
function FeaturedAdmin() {
  const { theme } = useTheme();
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [tab, setTab] = useState('links');

  const handleLogout = () => { clearToken(); setAuthenticated(false); };

  if (!authenticated) {
    return <LoginForm theme={theme} onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div data-theme={theme} className="bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen py-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Portfolio Admin</h2>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg neumorphism text-gray-700 dark:text-gray-300 text-sm font-medium">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { key: 'links', label: 'Featured Links', icon: <FaLink /> },
            { key: 'about', label: 'About Page', icon: <FaIdCard /> },
          ].map(({ key, label, icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all
                ${tab === key
                  ? 'neumorphism-inset text-blue-600 dark:text-blue-400'
                  : 'neumorphism text-gray-700 dark:text-gray-300'}`}>
              {icon} {label}
            </button>
          ))}
        </div>

        {tab === 'links' && <LinksTab onUnauth={() => setAuthenticated(false)} />}
        {tab === 'about' && <AboutTab onUnauth={() => setAuthenticated(false)} />}
      </div>
    </div>
  );
}

export default FeaturedAdmin;
