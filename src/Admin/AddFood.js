// src/components/AddFood.js
import React, { useState } from "react";
import api from "../api"; // your axios instance

function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !image) {
      setError("All fields including image are required.");
      return;
    }

    setError("");
    setLoading(true);

    // ✅ Properly build FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("available", available);
 formData.append("img", image);


    try {
      const res = await api.post("/foods/add-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Food added successfully!");
      console.log("Server response:", res.data);

      setName("");
      setDescription("");
      setPrice("");
      setAvailable(true);
      setImage(null);
    } catch (err) {
      console.error("Error adding food:", err.response?.data || err.message);
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
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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
