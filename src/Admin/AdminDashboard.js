import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete all orders
  const deleteAllOrders = async () => {
    if (!window.confirm("Are you sure you want to delete all orders?")) return;
    try {
      await api.delete("/orders/delete-all");
      setOrders([]);
      alert("All orders deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete orders");
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // Update payment
  const updatePayment = async (id, payment) => {
    try {
      await api.put(`/orders/${id}/status`, { payment });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // Print bill
  const handlePrint = (order) => {
    const printWindow = window.open("", "_blank");
    const itemsHtml = order.items
      .map(
        (i) =>
          `<tr>
            <td>${i.food?.name}</td>
            <td>${i.quantity}</td>
            <td>₹${i.food?.price}</td>
            <td>₹${(i.food?.price || 0) * i.quantity}</td>
          </tr>`
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Bill - ${order.token}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>🧾 Order Bill</h2>
          <p><strong>Order Token:</strong> ${order.token}</p>
          <p><strong>Customer:</strong> ${order.user?.name}</p>
          <table>
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total"><td colspan="3">Total</td><td>₹${order.totalPrice}</td></tr>
            </tbody>
          </table>
          <script>
            window.print();
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Orders</h3>
        <button className="btn btn-danger" onClick={deleteAllOrders}>
          Delete All Orders
        </button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Token</th>
            <th>Student</th>
            <th>Items</th>
            <th>Status</th>
            <th>Payment</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className={o.status === "Cancelled" ? "table-secondary" : ""}>
              <td>{o.token}</td>
              <td>{o.user?.name}</td>
              <td>
                {o.items.map((i) => (
                  <div key={i._id}>
                    {i.food?.name} x {i.quantity}
                  </div>
                ))}
              </td>
              <td>
                <span
                  className={`badge ${
                    o.status === "Pending"
                      ? "bg-warning"
                      : o.status === "Preparing"
                      ? "bg-info"
                      : o.status === "Delivered"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td>
                <span className={`badge ${o.payment === "success" ? "bg-success" : "bg-danger"}`}>
                  {o.payment}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={() => updateStatus(o._id, "Preparing")}
                  disabled={o.status === "Cancelled"}
                >
                  Preparing
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-success me-1"
                  onClick={() => updateStatus(o._id, "Delivered")}
                  disabled={o.status === "Cancelled"}
                >
                  Delivered
                </button>
              </td>
              <td>
                {o.payment !== "success" && (
                  <button
                    className="btn btn-sm btn-outline-success me-1"
                    onClick={() => updatePayment(o._id, "success")}
                    disabled={o.status === "Cancelled"}
                  >
                    Mark Paid
                  </button>
                )}
                <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePrint(o)}>
                  🖨️ Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
