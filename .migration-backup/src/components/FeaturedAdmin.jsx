import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/context';

const initialForm = { id: '', title: '', description: '', url: '' };

function FeaturedAdmin() {
  const { theme } = useTheme();
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
    loadLinks();
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const method = form.id ? 'PUT' : 'POST';
      const response = await fetch('/api/links', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Request failed.');
      }

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
    setForm({
      id: item.id || '',
      title: item.title || '',
      description: item.description || '',
      url: item.url || ''
    });
    setMessage('');
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this featured link?')) return;

    setMessage('');
    try {
      const response = await fetch(`/api/links?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Delete failed.');
      }

      setLinks(payload);
      if (form.id === id) resetForm();
      setMessage('Featured link deleted.');
    } catch (error) {
      setMessage(error.message || 'Failed to delete featured link.');
    }
  };

  return (
    <div data-theme={theme} className="bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen py-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Featured Links Admin</h2>

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
            {form.id ? (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-lg neumorphism text-gray-900 dark:text-white font-semibold"
              >
                Cancel Edit
              </button>
            ) : null}
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
