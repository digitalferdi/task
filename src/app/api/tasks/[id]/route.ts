import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import UserProgress from '@/models/UserProgress';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const task = await Task.findByIdAndUpdate(id, body, { new: true });

    if (body.status === 'Completed' && task) {
      // Update User Progress
      await UserProgress.findOneAndUpdate(
        { userId: 'default-user' },
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
    const { id } = await params;
    await dbConnect();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
