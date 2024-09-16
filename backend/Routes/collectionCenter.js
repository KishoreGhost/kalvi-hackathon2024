const express = require('express');
const collectionRouter = express.Router();
const CollectionCenter = require('../Model/CollectionCenter.model');
const Warehouse = require('../Model/Warehouse.model');

collectionRouter.post('/add-crop', async (req, res) => {
    const { cropType, quantity } = req.body;
    try {
      const center = await CollectionCenter.findOne(); 
  
      if (!center) {
        const newCenter = new CollectionCenter({ crops: [{ cropType, quantity }] });
        await newCenter.save();
        return res.status(200).json({ message: 'Crop added successfully', center: newCenter });
      }
  
      center.crops.push({ cropType, quantity });
      await center.save();
      res.status(200).json({ message: 'Crop added successfully', center });
    } catch (err) {
      console.error("Error in /add-crop route:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

collectionRouter.post('/transfer-crop', async (req, res) => {
  const { cropId } = req.body;
  try {
    const center = await CollectionCenter.findOne(); 
    const crop = center.crops.id(cropId);

    if (!crop || crop.status !== 'Cleaned') {
      return res.status(400).json({ error: 'Invalid crop or crop not cleaned' });
    }

    crop.status = 'Transferred';
    crop.transferDate = Date.now();

    const warehouse = await Warehouse.findOne(); 
    if (!warehouse) {
      const newWarehouse = new Warehouse({
        crops: [{ cropType: crop.cropType, quantity: crop.quantity }],
        totalQuantity: crop.quantity,
      });
      await newWarehouse.save();
      return res.status(200).json({ message: 'Crop transferred to warehouse', warehouse: newWarehouse });
    }

    warehouse.crops.push({
      cropType: crop.cropType,
      quantity: crop.quantity,
    });
    warehouse.totalQuantity += crop.quantity;

    await center.save();
    await warehouse.save();

    res.status(200).json({ message: 'Crop transferred to warehouse', warehouse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

collectionRouter.get('/inventory', async (req, res) => {
  try {
    const center = await CollectionCenter.findOne();
    if (!center) return res.status(404).json({ error: 'No collection center found' });

    res.status(200).json(center.crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = collectionRouter;
