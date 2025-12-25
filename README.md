# Task Manager - Full Stack Web Application

A modern, responsive Task Management Web Application built with **Next.js 15** (App Router), **TypeScript**, and **Tailwind CSS**.

## Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with title, description, priority, and status
- ✅ **View Tasks** - Display all tasks in a responsive grid layout
- ✅ **Edit Tasks** - Update existing task details
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Toggle Status** - Switch between Pending and Completed status
- ✅ **Form Validation** - Title required, description minimum 10 characters
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop

### Task Fields
Each task contains:
- `id` - Auto-generated unique identifier
- `title` - Task title (required)
- `description` - Task description (min 10 characters)
- `status` - Pending or Completed
- `priority` - Low, Medium, or High
- `createdAt` - Timestamp of creation

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)
- **API:** Next.js API Routes (RESTful)
- **Data Storage:** In-memory array (no database required)

## Project Structure

```
task-manager/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts           # GET, POST /api/tasks
│   │       └── [id]/
│   │           └── route.ts       # PUT, DELETE /api/tasks/:id
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (main app)
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── TaskForm.tsx              # Add/Edit task form
│   ├── TaskCard.tsx              # Individual task display
│   └── TaskList.tsx              # Task grid/list view
├── lib/
│   └── tasks.ts                  # In-memory data store & CRUD operations
└── README.md                     # This file
```

## API Routes

### GET /api/tasks
- Fetches all tasks
- Returns: Array of task objects

### POST /api/tasks
- Creates a new task
- Body: `{ title, description, status, priority }`
- Validation: Title required, description min 10 chars
- Returns: Created task object

### PUT /api/tasks/[id]
- Updates an existing task
- Body: Partial task object
- Returns: Updated task object

### DELETE /api/tasks/[id]
- Deletes a task by ID
- Returns: Success message

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Add a Task:**
   - Fill in the task form with title and description
   - Select priority (Low/Medium/High) and status (Pending/Completed)
   - Click "Add Task" button

2. **Edit a Task:**
   - Click the "Edit" button on any task card
   - Modify the details in the form that appears at the top
   - Click "Update Task" to save changes

3. **Toggle Status:**
   - Click "Mark Complete" to change status to Completed
   - Click "Mark Pending" to change status back to Pending

4. **Delete a Task:**
   - Click the "Delete" button on any task card
   - Confirm the deletion in the popup dialog

5. **View Tasks:**
   - All tasks are displayed in a responsive grid
   - Tasks show priority badge, status badge, and creation date
   - Click "Refresh" to reload the task list

## Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile:** < 768px (single column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3 columns)

All components adapt to screen size with:
- Flexible grid layouts
- Touch-friendly buttons
- Readable typography
- Optimized spacing

## Validation Rules

- **Title:** Required, cannot be empty
- **Description:** Required, minimum 10 characters
- **Priority:** Must be Low, Medium, or High
- **Status:** Must be Pending or Completed

## State Management

The application uses React Hooks for state management:
- `useState` - Managing component state (tasks, form inputs, errors)
- `useEffect` - Fetching data on component mount and updates
- `fetch()` - API calls to Next.js routes

## Error Handling

- Loading states displayed during API calls
- Error messages shown for failed operations
- Form validation errors displayed inline
- Network error handling with retry options

## Future Enhancements

Potential features for future versions:
- Task search and filtering
- Sort by priority, status, or date
- Task categories/tags
- Due dates and reminders
- Persistent storage (database integration)
- User authentication
- Dark mode toggle

## License

This project is created for educational purposes.

## Author

Full Stack Web Development Assignment 4

---

**Happy Task Managing! 🎯**
