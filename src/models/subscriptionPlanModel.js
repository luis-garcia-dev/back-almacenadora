import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    durationInDays: { type: Number, required: true, min: 1 },
    features: [{ type: String }],
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

export const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
