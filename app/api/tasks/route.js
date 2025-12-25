import { NextResponse } from 'next/server';
import { getTasks, createTask } from '@/lib/tasks';

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    const tasks = getTasks();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, status, priority } = body;

    // Validation
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    const newTask = createTask({
      title: title.trim(),
      description: description.trim(),
      status: status || 'Pending',
      priority: priority || 'Medium',
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
