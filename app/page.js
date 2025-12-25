'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleTaskUpdated = () => {
    setRefreshKey((prev) => prev + 1);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Decorative background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <TaskForm
              onTaskAdded={handleTaskAdded}
              editTask={editingTask}
              onTaskUpdated={handleTaskUpdated}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div>
            <TaskList refresh={refreshKey} onEdit={handleEdit} />
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <p className="text-lg font-semibold">Task Manager</p>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-gray-400">&copy; 2025 Task Manager. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">Built with ❤️ using Next.js & JavaScript</p>
        </div>
      </footer>
    </div>
  );
}
