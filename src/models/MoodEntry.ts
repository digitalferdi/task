import mongoose, { Schema, Document } from 'mongoose';

export interface IMoodEntry extends Document {
  userId: mongoose.Types.ObjectId;
  mood: 'Excellent' | 'Good' | 'Neutral' | 'Bad' | 'Awful';
  reflection: string;
  date: Date;
}

const MoodEntrySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mood: {
      type: String,
      enum: ['Excellent', 'Good', 'Neutral', 'Bad', 'Awful'],
      required: true,
    },
    reflection: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.MoodEntry || mongoose.model<IMoodEntry>('MoodEntry', MoodEntrySchema);
