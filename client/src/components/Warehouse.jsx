// src/components/Warehouse.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Warehouse = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("/warehouse/inventory");
        setCrops(res.data);
      } catch (error) {
        console.error("Error fetching warehouse crops:", error);
        alert("Failed to fetch warehouse crops");
      }
    };
    fetchCrops();
  }, []);

  return (
    <div>
      <h2>Warehouse: Available Crops</h2>
      {crops.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Crop Type</th>
              <th>Quantity (kg)</th>
              <th>Received Date</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop._id}>
                <td>{crop.cropType}</td>
                <td>{crop.quantity}</td>
                <td>{new Date(crop.receivedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No crops available in the warehouse.</p>
      )}
    </div>
  );
};

export default Warehouse;
