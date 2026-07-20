import React from "react";
import { Link } from "react-router-dom";

import img from "../images/indexbg.jpg";

import burger from "../images/burger-gb copy.jpg";

export default function Home() {
  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center text-center flex-column"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
     
      

      {/* Burger (above fire sparks) */}
      <img
        src={burger}
        alt="Burger"
        style={{
          position: "absolute",
          width: "1200px",
          height: "900px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.7,
          zIndex: 2,
        }}
      />

      {/* Foreground Content */}
      <div style={{ zIndex: 3 }} className="text-center">
        <div className="bg-transparent p-5 rounded shadow-lg">
          <h1 className="display-4 fw-bold text-white">
            Best food for your taste
          </h1>
          <p className="lead my-3 text-white">
            Discover delectable cuisine and unforgettable moments in our
            welcoming, culinary haven.
          </p>
          <Link to="/Login" className="btn bg-success text-white btn-lg">
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
