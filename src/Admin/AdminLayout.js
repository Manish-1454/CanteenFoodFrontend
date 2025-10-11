import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./NavBar";


export default function AdminLayout() {
 
  const user = JSON.parse(localStorage.getItem("user"));

 
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
<NavBar />
      {/* Admin content will render here */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
