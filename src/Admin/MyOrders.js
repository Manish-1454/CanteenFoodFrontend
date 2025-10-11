import React, { useEffect, useState } from "react";
import api from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {

    const data=api.get("/orders");
    setOrders(data.res);
   
  },[]);


  return (
    <div>
      <h3>My Orders</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Token</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td><span className="badge bg-secondary">{o.token}</span></td>
              <td>
                {o.items.map((i) => (
                  <div key={i._id}>{i.food?.name} x {i.quantity}</div>
                ))}
              </td>
              <td>
                <span className={`badge ${
                  o.status === "Pending" ? "bg-warning" :
                  o.status === "Preparing" ? "bg-info" : "bg-success"
                }`}>
                  {o.status}
                </span>
              </td>
              
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
}
