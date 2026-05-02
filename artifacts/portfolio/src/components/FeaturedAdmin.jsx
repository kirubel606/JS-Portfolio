import React, { useEffect, useState } from 'react';
import { FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/context';

const TOKEN_KEY = 'admin_token';
const initialForm = { id: '', title: '', description: '', url: '' };

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

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
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }
      saveToken(data.token);
      onSuccess();
    } catch {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-theme={theme}
      onMouseMove={handleMouseMove}
      className="inset-hover bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        <div className="neumorphism p-8 rounded-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="neumorphism-inset p-4 rounded-full mb-4">
              <FaLock className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to manage featured links</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold mt-2 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FeaturedAdmin() {
  const { theme } = useTheme();
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadLinks = async () => {
    try {
      const response = await fetch('/api/links');
      const data = await response.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch {
      setMessage('Failed to load featured links.');
    }
  };

  useEffect(() => {
    if (authenticated) loadLinks();
  }, [authenticated]);

  const handleLogout = () => {
    clearToken();
    setAuthenticated(false);
    setLinks([]);
    setForm(initialForm);
    setMessage('');
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setForm(initialForm);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const method = form.id ? 'PUT' : 'POST';
      const response = await fetch('/api/links', {
        method,
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (response.status === 401) {
        clearToken();
        setAuthenticated(false);
        return;
      }
      if (!response.ok) throw new Error(payload.error || 'Request failed.');

      setLinks(payload);
      setMessage(form.id ? 'Featured link updated.' : 'Featured link added.');
      resetForm();
    } catch (error) {
      setMessage(error.message || 'Failed to save featured link.');
    } finally {
      setIsSaving(false);
    }
  };

  const onEdit = (item) => {
    setForm({ id: item.id || '', title: item.title || '', description: item.description || '', url: item.url || '' });
    setMessage('');
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this featured link?')) return;
    setMessage('');
    try {
      const response = await fetch(`/api/links?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const payload = await response.json();

      if (response.status === 401) {
        clearToken();
        setAuthenticated(false);
        return;
      }
      if (!response.ok) throw new Error(payload.error || 'Delete failed.');

      setLinks(payload);
      if (form.id === id) resetForm();
      setMessage('Featured link deleted.');
    } catch (error) {
      setMessage(error.message || 'Failed to delete featured link.');
    }
  };

  if (!authenticated) {
    return <LoginForm theme={theme} onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div data-theme={theme} className="bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen py-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Featured Links Admin</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg neumorphism text-gray-700 dark:text-gray-300 text-sm font-medium"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>

        <form onSubmit={onSubmit} className="neumorphism p-6 rounded-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={onInputChange}
              placeholder="Title"
              className="px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900"
            />
            <input
              name="description"
              value={form.description}
              onChange={onInputChange}
              placeholder="Description"
              className="px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900"
            />
            <input
              name="url"
              value={form.url}
              onChange={onInputChange}
              placeholder="https://drive.google.com/file/d/..."
              required
              className="px-4 py-3 rounded-lg neumorphism-inset bg-transparent dark:text-white text-gray-900"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-3 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold"
            >
              {isSaving ? 'Saving...' : form.id ? 'Update Link' : 'Add Link'}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold"
              >
                Cancel Edit
              </button>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((item) => (
            <div key={item.id} className="featured-neumorphism p-4 rounded-2xl">
              <div className="featured-neumorphism-inset p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title || 'Untitled'}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description || 'No description'}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 break-all"
                >
                  {item.url}
                </a>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="px-4 py-2 rounded-lg neumorphism text-gray-900 dark:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="px-4 py-2 rounded-lg neumorphism text-gray-900 dark:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedAdmin;
