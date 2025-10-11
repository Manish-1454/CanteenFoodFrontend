import React from "react";

export default function FoodCard({ food, onOrder }) {
  return (
    <div className="card">
      {/* Card Image */}
      <img src={food.image} className="card-img-top" alt={food.name} />

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text">{food.description}</p>

        {/* Order Button */}
        <button className="btn btn-primary w-100" onClick={() => onOrder(food._id)}>
          Order
        </button>
      </div>
    </div>
  );
}
