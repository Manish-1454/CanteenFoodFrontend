import React, { useEffect, useState } from "react";
import api from "../api";
import backupimg from "../images/food_backup.jpg";
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Fetch user profile
  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const res = await api.post(`/user/${storedUser.id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get(`/orders/user/${storedUser.id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  if (loadingUser || loadingOrders)
    return <div className="text-center mt-5">Loading...</div>;

  // Calculate most ordered food
  const foodMap = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (foodMap[item.food._id]) {
        foodMap[item.food._id].quantity += item.quantity;
      } else {
        foodMap[item.food._id] = { ...item.food, quantity: item.quantity };
      }
    });
  });

  const mostOrderedFood = Object.values(foodMap).sort(
    (a, b) => b.quantity - a.quantity
  )[0];

  return (
    <div className="container mt-4" style={{ minWidth: "320px" }}>
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, {user.name} 👋</h2>
        <p className="text-muted">Here’s your dashboard overview</p>
      </div>

      <div className="row g-4">
        {/* Profile Section */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 h-100 text-center p-3">
          
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text mb-1">🎓 {user.Degree}</p>
            <p className="text-muted small mb-2">Roll No: {user.RollNo}</p>
            <span className={`badge bg-primary`}>{user.role.toUpperCase()}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="col-12 col-md-8">
          <div className="row g-3">
            {/* Total Orders */}
            <div className="col-12 col-md-6">
              <div className="card shadow-sm border-0 p-3 text-center">
                <h5>Total Orders</h5>
                <p className="display-6 fw-bold">{orders.length}</p>
              </div>
            </div>

            {/* Most Ordered Food */}
            <div className="col-12 col-md-6">
              <div className="card shadow-sm border-0 p-3 text-center">
                <h5>Most Ordered Food</h5>
                {mostOrderedFood ? (
                  <>
                    <img
                        src={
                                         mostOrderedFood.img? `http://localhost:5000${mostOrderedFood.img}` : backupimg
                                       }
                      alt={mostOrderedFood.name}
                      className="img-fluid rounded mb-2"
                      style={{
                        maxHeight: "120px",
                        width: "auto",
                        objectFit: "cover",
                      }}
                    />
                    <p className="fw-bold mb-1">{mostOrderedFood.name}</p>
                    <small className="text-muted">× {mostOrderedFood.quantity} times</small>
                  </>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
          </div>

          {/* Optional: All Ordered Foods Gallery */}
          <div className="mt-4">
            <h5 className="mb-3">Your Ordered Foods</h5>
            {Object.values(foodMap).length === 0 ? (
              <p className="text-muted">You haven't ordered anything yet.</p>
            ) : (
              <div className="d-flex flex-wrap gap-3">
                {Object.values(foodMap).map(food => (
                  <div
                    key={food._id}
                    className="text-center"
                    style={{ minWidth: "100px", flex: "1 0 100px" }}
                  >
                    <img
                       src={
                                         food.img? `http://localhost:5000${food.img}` : backupimg
                                       }
                      alt={food.name}
                      className="img-fluid rounded mb-1"
                      style={{ height: "80px", objectFit: "cover", width: "100%" }}
                    />
                    <p className="mb-0 small fw-bold">{food.name}</p>
                    <small className="text-muted">× {food.quantity}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
