import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  category: 'Work' | 'Personal' | 'Health' | 'Education' | 'Other';
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  xpReward: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Health', 'Education', 'Other'],
      default: 'Personal',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: { type: Date },
    xpReward: { type: Number, default: 10 },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
