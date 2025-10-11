import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import backupimg from "../images/food_backup.jpg";

export default function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const navigate = useNavigate();

  const userRole = "admin"; // Replace with real auth logic if needed

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
        alert("Something went wrong while fetching the food list.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const addFood = () => {
    navigate("/add-item");
  };

  const setTodayItem = async (foodId) => {
    try {
      await api.post("/foods/set-today-menu", { foodId });
      alert("Food marked for today!");
    } catch (error) {
      console.error("Error marking food for today:", error);
      alert("Failed to update today's menu.");
    }
  };

  const deleteevent = async (foodId) => {
    try {
      await api.delete(`/foods/manage/${foodId}`);
      alert("Deleted successfully");
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Food Menu</h2>

      {/* Search and Add Button */}
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {userRole === "admin" && (
          <button className="btn btn-primary" onClick={addFood}>
            Add Food
          </button>
        )}
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredFoods.map((food) => (
            <div key={food._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {/* ✅ Food Image */}
                <img
                  src={
                    food.img? `http://localhost:5000${food.img}` : backupimg
                  }
                  alt={food.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback_image_url.png";
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">{food.description}</p>
                  <p className="fw-bold">₹{food.price}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    {userRole === "admin" && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => setTodayItem(food._id)}
                        >
                          Today Item
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteevent(food._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
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
