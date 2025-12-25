'use client';

import { useState } from 'react';

export default function TaskCard({ task, onDelete, onToggleStatus, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Completed'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete(task.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="group bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-bl-full"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-extrabold text-gray-800 flex-1 pr-4 group-hover:text-indigo-600 transition-colors duration-300">{task.title}</h3>
          <div className="flex flex-col gap-2">
            <span
              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 shadow-md ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'} {task.priority}
            </span>
            <span
              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 shadow-md ${getStatusColor(
                task.status
              )}`}
            >
              {task.status === 'Completed' ? '✅' : '⏳'} {task.status}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">{task.description}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-5 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
          <span className="text-sm">🕒</span>
          <span className="font-medium">Created: {formatDate(task.createdAt)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onToggleStatus(task.id, task.status)}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm hover:scale-105 active:scale-95"
          >
            {task.status === 'Pending' ? '✓ Complete' : '↺ Pending'}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm hover:scale-105 active:scale-95"
          >
            ✎ Edit
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 min-w-[120px] bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl text-sm hover:scale-105 active:scale-95"
          >
            {isDeleting ? '⌛ Deleting...' : '🗑 Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
