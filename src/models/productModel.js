import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    stock: { type: Number, default: 0, min: 0 },
    minStock: { type: Number, default: 0, min: 0 },
    buyPrice: { type: Number, default: 0, min: 0 },
    sellPrice: { type: Number, default: 0, min: 0 },
    location: { type: String },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', default: null },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
