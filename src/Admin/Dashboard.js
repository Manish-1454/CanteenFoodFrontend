import React, { useEffect, useState } from "react";
import api from "../api";
import backupimg from "../images/food_backup.jpg";

export default function TodayDashboard() {
  const [todayFoods, setTodayFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/foods/today");
        setTodayFoods(res.data);
      } catch (err) {
        console.error("Fetch today foods error:", err);
        alert("Failed to fetch today's foods.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const outOfStockEvent = async (id) => {
    try {
      await api.put(`/foods/manage/${id}`);
      alert("This item is out-of-stock");

      // Update local state
      setTodayFoods((prev) =>
        prev.map((food) =>
          food._id === id ? { ...food, outofstack: true } : food
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Today's Menu</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : todayFoods.length === 0 ? (
        <div className="text-center text-muted">No foods marked for today.</div>
      ) : (
        <div className="row">
          {todayFoods.map((food) => (
            <div key={food._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {/* Food Image */}
                <img
                  src={
                    food.img ? `http://localhost:5000${food.img}` : backupimg
                  }
                  alt={food.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = backupimg;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text text-truncate">{food.description}</p>
                  <p className="fw-bold">₹{food.price}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className={`btn ${
                        food.outofstack ? "btn-secondary" : "btn-success"
                      }`}
                      onClick={() => outOfStockEvent(food._id)}
                      disabled={food.outofstack}
                    >
                      {food.outofstack ? "OUT-OF-STOCK" : "Mark Out-of-Stock"}
                    </button>
                    <p className="text-muted">Sold: {food.sold || 0}</p>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
