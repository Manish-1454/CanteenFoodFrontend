import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbaruser from "./Navbaruser";


export default function UserLayout() {
 
  const user = JSON.parse(localStorage.getItem("user"));

 

  return (
    <div>
<Navbaruser />
      {/* Admin content will render here */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
