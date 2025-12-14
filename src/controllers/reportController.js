import { Product } from '../models/productModel.js';
import { Movement } from '../models/movementModel.js';
import { success } from '../helpers/response.js';

export const dashboardStats = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const lowStock = await Product.countDocuments({ $expr: { $lte: ['$stock', '$minStock'] } });
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const movementsLastDays = await Movement.find({ createdAt: { $gte: lastWeek } }).countDocuments();
  const topExits = await Movement.aggregate([
    { $match: { type: 'EXIT' } },
    { $group: { _id: '$product', total: { $sum: '$quantity' } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);
  const inventoryValue = await Product.aggregate([
    { $project: { value: { $multiply: ['$stock', '$buyPrice'] } } },
    { $group: { _id: null, total: { $sum: '$value' } } }
  ]);

  return success(res, {
    data: {
      totalProducts,
      lowStock,
      movementsLastDays,
      topExits,
      inventoryValue: inventoryValue[0]?.total || 0
    }
  });
};
