import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }
      }
    ],
    total: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Invoice = mongoose.model('Invoice', invoiceSchema);
