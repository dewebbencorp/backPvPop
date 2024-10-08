const Sale = require('../models/salesModel');

class SalesService {
  static async getAllSales() {
    return await Sale.findAll();
  }

  static async createSale(data) {
    return await Sale.create(data);
  }

  static async updateSale(id, data) {
    return await Sale.update(data, { where: { id } });
  }

  static async deleteSale(id) {
    return await Sale.destroy({ where: { id } });
  }
}

module.exports = SalesService;
