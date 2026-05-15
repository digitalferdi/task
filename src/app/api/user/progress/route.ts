import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';

export async function GET() {
  try {
    await dbConnect();
    let progress = await UserProgress.findOne({ userId: 'default-user' });
    if (!progress) {
      progress = await UserProgress.create({ userId: 'default-user' });
    }
    
    // Level calculation logic: Level = floor(XP / 100) + 1
    const level = Math.floor(progress.xp / 100) + 1;
    if (level !== progress.level) {
      progress.level = level;
      await progress.save();
    }

    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
