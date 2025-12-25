'use client';

import { useState, useEffect } from 'react';

export default function TaskForm({ onTaskAdded, editTask, onTaskUpdated, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
      setPriority(editTask.priority);
    }
  }, [editTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setPriority('Medium');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }

    setLoading(true);

    try {
      if (editTask) {
        // Update existing task
        const response = await fetch(`/api/tasks/${editTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, status, priority }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update task');
        }

        resetForm();
        if (onTaskUpdated) onTaskUpdated();
        if (onCancelEdit) onCancelEdit();
      } else {
        // Create new task
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, status, priority }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create task');
        }

        resetForm();
        onTaskAdded();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-2xl shadow-lg">
            <span className="text-2xl">{editTask ? '✏️' : '➕'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {editTask ? 'Edit Task' : 'Add New Task'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-xl mb-6 shadow-lg animate-shake">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-indigo-600">📝</span> Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white shadow-sm group-hover:shadow-md"
              placeholder="Enter an amazing task title..."
            />
          </div>

          <div className="group">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-purple-600">📄</span> Description * (min 10 characters)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white shadow-sm resize-none group-hover:shadow-md"
              placeholder="Describe your task in detail..."
            />
            <div className="flex items-center justify-between mt-2">
              <p className={`text-sm font-medium transition-colors ${
                description.length >= 10 ? 'text-green-600' : 'text-gray-500'
              }`}>
                {description.length >= 10 ? '✅' : '⏳'} {description.length} characters
              </p>
              {description.length >= 10 && (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Valid!</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-orange-600">🎯</span> Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white shadow-sm cursor-pointer group-hover:shadow-md"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>

            <div className="group">
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-blue-600">📊</span> Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm cursor-pointer group-hover:shadow-md"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : editTask ? '✏️ Update Task' : '➕ Add Task'}
            </button>
            
            {editTask && onCancelEdit && (
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onCancelEdit();
                }}
                className="px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
