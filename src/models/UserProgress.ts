import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: string; // Placeholder for now, can be 'default' or real ID
  xp: number;
  level: number;
  streak: number;
  lastCompletedAt?: Date;
  achievements: string[];
  totalTasksCompleted: number;
}

const UserProgressSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, default: 'default-user' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastCompletedAt: { type: Date },
    achievements: [{ type: String }],
    totalTasksCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
