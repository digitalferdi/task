import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    let progress = await UserProgress.findOne({ userId: session.user.id });
    if (!progress) {
      progress = await UserProgress.create({ userId: session.user.id });
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
