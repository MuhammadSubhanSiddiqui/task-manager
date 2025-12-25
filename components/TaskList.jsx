'use client';

import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ refresh, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Remove task from state
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Update task in state
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-indigo-600 border-r-purple-600 absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-xl font-semibold text-gray-700">Loading your tasks...</p>
        <p className="text-sm text-gray-500 mt-2">Just a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 px-6 py-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">❌</span>
          <p className="font-bold text-xl text-red-800">Oops! Something went wrong</p>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={fetchTasks}
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-300 shadow-lg">
        <div className="text-8xl mb-6 animate-bounce">📋</div>
        <p className="text-2xl font-bold text-gray-700 mb-2">No tasks yet!</p>
        <p className="text-gray-500 text-lg">Create your first task using the form above.</p>
        <div className="mt-6 flex justify-center gap-2">
          <span className="text-4xl animate-pulse">✨</span>
          <span className="text-4xl animate-pulse delay-100">🎯</span>
          <span className="text-4xl animate-pulse delay-200">🚀</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-2xl shadow-lg">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              All Tasks
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} in total
            </p>
          </div>
        </div>
        <button
          onClick={fetchTasks}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span className="text-lg">🔄</span> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
