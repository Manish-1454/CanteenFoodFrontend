// src/components/AddFood.js
import React, { useState } from "react";
import api from "../api"; // your axios instance

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !description || !price || !image) {
    setError("All fields are required.");
    return;
  }

  setError("");
  setLoading(true);


  try {
    const res = await api.post("/foods/add-item", {
      name,
      description,
      price,
      available,
      img: image,
    });

  setTimeout(() => {
    alert("✅ Food added successfully!")
    console.log(res.data);
    
  }, 1000);

  
    


    setName("");
    setDescription("");
    setPrice("");
    setAvailable(true);
    setImage("");
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError("❌ Failed to add food.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container mt-5">
      <h2>Add Food</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Available</label>
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>

        <div className="mb-3">
   <label className="form-label">Image URL</label>
  <input
    type="text"
    className="form-control"
    placeholder="https://example.com/image.jpg"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    required
  />
</div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}

export default AddFood;
