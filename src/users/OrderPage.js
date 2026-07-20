import React, { useState, useEffect } from "react";
import api from "../api";
import backupimg from "../images/food_backup.jpg";

const OrderPage = () => {
  const [foods, setFoods] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [loading, setLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods/today"); // Only available foods
        setFoods(res.data);
      } catch (err) {
        console.error("Failed to fetch food items");
      }
    };
    fetchFoods();
  }, []);

  const addToOrder = (food) => {
    const existing = orderItems.find((item) => item.food._id === food._id);
    if (existing) {
      setOrderItems(
        orderItems.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([...orderItems, { food, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setOrderItems(orderItems.filter((item) => item.food._id !== id));
  };

  const submitOrder = async () => {
    if (orderItems.length === 0) return;
    setLoading(true);
    try {
      const payload = orderItems.map(({ food, quantity }) => ({
        food: food._id,
        quantity,
        price: food.price,
      }));

      const res = await api.post("/orders/order", {
        items: payload,
        user: storedUser.id,
      });
      setOrderPlaced(res.data);
      setOrderItems([]);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5" style={{ minWidth: "320px" }}>
      <h2 className="mb-4">🍽️ Place Your Order</h2>

      {!orderPlaced ? (
        <>
          <div className="row">
            {foods.map((food) => (
              <div className="col-12 col-md-4 mb-3" key={food._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    s src={
                                        food.img? `food.img${food.img}` : backupimg
                                      }
                    className="card-img-top"
                    alt={food.name}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{food.name}</h5>
                      <p className="card-text">₹{food.price}</p>
                      {food.outofstock && (
                        <span className="badge bg-danger mb-2">Out of Stock</span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => addToOrder(food)}
                      disabled={food.outofstock}
                    >
                      {food.outofstock ? "Unavailable" : "Add to Order"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <h4>Your Order</h4>
          {orderItems.length === 0 ? (
            <p>No items selected yet.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {orderItems.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={item.food._id}
                  >
                    <div>
                      {item.food.name} x {item.quantity}
                    </div>
                    <div>
                      ₹{item.food.price * item.quantity}
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeItem(item.food._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h5>Total: ₹{totalPrice}</h5>
              <button
                className="btn btn-success"
                onClick={submitOrder}
                disabled={loading || orderItems.length === 0}
              >
                {loading ? "Placing Order..." : "Submit Order"}
              </button>
            </>
          )}
        </>
      ) : (
        <div className="alert alert-success mt-3">
          ✅ Order placed successfully! <br />
          <strong>Order Token:</strong> {orderPlaced.token} <br />
          <strong>Total:</strong> ₹{orderPlaced.totalPrice}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
