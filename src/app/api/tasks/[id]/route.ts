import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import UserProgress from '@/models/UserProgress';
import { auth } from '@/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    
    // Ensure task belongs to user
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      body,
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found or unauthorized' }, { status: 404 });
    }

    if (body.status === 'Completed') {
      // Update User Progress
      await UserProgress.findOneAndUpdate(
        { userId: session.user.id },
        { 
          $inc: { xp: task.xpReward || 10, totalTasksCompleted: 1 },
          $set: { lastCompletedAt: new Date() }
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    
    const result = await Task.findOneAndDelete({ _id: id, userId: session.user.id });
    
    if (!result) {
      return NextResponse.json({ success: false, error: 'Task not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
