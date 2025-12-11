import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

export const Provider = mongoose.model('Provider', providerSchema);
