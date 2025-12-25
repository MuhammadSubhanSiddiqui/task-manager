import { NextResponse } from 'next/server';
import { updateTask, deleteTask, getTaskById } from '@/lib/tasks';

// PUT /api/tasks/[id] - Update a task
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if task exists
    const existingTask = getTaskById(id);
    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Validation
    if (body.title !== undefined && body.title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }

    if (body.description !== undefined && body.description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    const updatedTask = updateTask(id, body);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = deleteTask(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
