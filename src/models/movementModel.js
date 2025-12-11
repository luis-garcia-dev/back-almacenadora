import mongoose from 'mongoose';

const movementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['ENTRY', 'EXIT'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    date: { type: Date, default: Date.now },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Movement = mongoose.model('Movement', movementSchema);
