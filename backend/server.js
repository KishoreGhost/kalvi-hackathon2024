const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const collectionCenterRoutes = require("./Routes/collectionCenter");
const warehouseRoutes = require("./Routes/warehouse");
const app = express();

const connectDB = require("./database");

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => res.send("hello"));

app.use("/collection-center", collectionCenterRoutes);
app.use("/warehouse", warehouseRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
