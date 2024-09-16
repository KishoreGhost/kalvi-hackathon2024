const express = require('express');
const warehouseRouter = express.Router();
const Warehouse = require('../Model/Warehouse.model');

warehouseRouter.get('/inventory', async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne();
    if (!warehouse) return res.status(404).json({ message: 'No warehouse found' });

    res.status(200).json(warehouse.crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

warehouseRouter.get('/total-stock', async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne();
    if (!warehouse) return res.status(404).json({ message: 'No warehouse data found' });

    res.status(200).json({ totalQuantity: warehouse.totalQuantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = warehouseRouter;
