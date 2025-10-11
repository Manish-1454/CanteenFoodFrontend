import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
   
    localStorage.removeItem("user");
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/foodmenu">College Canteen</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item" ><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/foodmenu">Menu</Link></li>
            
              <li className="nav-item"><Link className="nav-link" to="/admin">Orders</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/user-control">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">contact</Link></li>
        
          
             
          
          </ul>
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn bg-danger text-light btn-sm" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
