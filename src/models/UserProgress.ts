import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  xp: number;
  level: number;
  streak: number;
  lastCompletedAt?: Date;
  achievements: string[];
  totalTasksCompleted: number;
}

const UserProgressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
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
