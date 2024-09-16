import React, { useState } from "react";
import axios from "axios";

const CollectionCenter = () => {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/collection-center/add-crop", {
        cropType,
        quantity,
      });
      console.log(res.data);
      alert("Crop added successfully!");
      setCropType("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding crop:", error);
      alert("Failed to add crop");
    }
  };

  return (
    <div>
      <h2>Collection Center: Add Crop</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crop Type:</label>
          <input
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity (kg):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
};

export default CollectionCenter;
