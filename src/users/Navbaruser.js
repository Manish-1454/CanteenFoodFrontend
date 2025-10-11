import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbaruser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
      <div className="container">
        <Link className="navbar-brand" to="/user/dashboard">
          College Canteen
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/order">
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/history">
                OrderHistory
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/contact-us">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn bg-danger text-light btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
