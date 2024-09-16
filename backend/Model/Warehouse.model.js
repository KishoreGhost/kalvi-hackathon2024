const mongoose = require('mongoose');

const WarehouseCropSchema = new mongoose.Schema({
  cropType: { type: String, required: true },  
  quantity: { type: Number, required: true },  
  receivedDate: { type: Date, default: Date.now },  
});

const WarehouseSchema = new mongoose.Schema({
  crops: [WarehouseCropSchema],  
  totalQuantity: { type: Number, default: 0 },  
  createdAt: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
