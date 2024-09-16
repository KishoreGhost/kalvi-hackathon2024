const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  cropType: { type: String, required: true },  
  quantity: { type: Number, required: true },  
  status: { type: String, default: 'Pending' },
  receivedDate: { type: Date, default: Date.now },  
  transferDate: { type: Date },  
});

const CollectionCenterSchema = new mongoose.Schema({
  crops: [CropSchema],  
  createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('CollectionCenter', CollectionCenterSchema);
