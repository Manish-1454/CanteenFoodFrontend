import React, { useEffect, useState } from 'react';
import api from '../api';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/orders/user/${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch order history:', err);
      setError('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.put(`/orders/${orderId}/cancel`);
      alert("Order cancelled successfully!");
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error("Cancel order error:", err);
      alert("Failed to cancel order.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📜 Your Order History</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && orders.length === 0 && (
        <div className="alert alert-info">You haven’t placed any orders yet.</div>
      )}

      {!loading && orders.length > 0 && (
        <div className="row g-3">
          {orders.map(order => (
            <div className="col-md-12" key={order._id}>
              <div className="card shadow-sm border-0 mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div>
                      <h6>Order Token: <code>{order.token}</code></h6>
                      <p>Status: <strong>{order.status}</strong></p>
                      <p>Payment: <strong>{order.payment}</strong></p>
                      <p>Total: ₹{order.totalPrice}</p>
                    </div>
                    <div>
                      <h6>Items:</h6>
                      <ul className="list-unstyled mb-2">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            🍔 {item.food.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                      {order.status !== "Delivered" && order.status !== "Cancelled" && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => cancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
