import Header from '@/components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Task Manager</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Overview</h2>
              <p className="leading-relaxed">
                Task Manager is a modern, responsive web application built with Next.js that helps you
                organize and manage your daily tasks efficiently. Whether you're planning your day,
                managing projects, or keeping track of personal goals, this app provides all the tools
                you need.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li><strong>Create Tasks:</strong> Add new tasks with title, description, priority, and status</li>
                <li><strong>Edit Tasks:</strong> Update task details anytime</li>
                <li><strong>Toggle Status:</strong> Quickly switch between Pending and Completed status</li>
                <li><strong>Delete Tasks:</strong> Remove tasks you no longer need</li>
                <li><strong>Priority Levels:</strong> Organize tasks by Low, Medium, or High priority</li>
                <li><strong>Validation:</strong> Built-in form validation ensures data quality</li>
                <li><strong>Responsive Design:</strong> Works seamlessly on mobile, tablet, and desktop devices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technology Stack</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li><strong>Framework:</strong> Next.js 15 (App Router)</li>
                  <li><strong>Language:</strong> JavaScript (JSX)</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>API:</strong> Next.js API Routes</li>
                  <li><strong>State Management:</strong> React Hooks (useState, useEffect)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">How to Use</h2>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>Fill in the task form with a title (required) and description (minimum 10 characters)</li>
                <li>Select the priority level and status for your task</li>
                <li>Click "Add Task" to create your task</li>
                <li>View all your tasks in the grid below</li>
                <li>Use the action buttons on each task card to edit, toggle status, or delete tasks</li>
                <li>Click "Refresh" to reload the task list</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact</h2>
              <p className="leading-relaxed">
                This application was created as a demonstration of modern web development practices
                using Next.js and React. For questions or feedback, please reach out through the
                project repository.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Task Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
