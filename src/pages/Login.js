
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [RollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { RollNo, password });
      if (!res.data.user) {
        setError("Invalid credentials");
        return;
      }

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      
  console.log(user);

    if (user.role === "admin") navigate("/admin/dashboard");
else if(user.role === "user") navigate("/user/dashboard");
else alert("no page found");
  
    
    
    }
   catch (err) {
  const msg = err.response?.data?.error || err.response?.data || err.message || "Something went wrong";
  setError(msg);
}

  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Roll No</label>
            <input
              type="text"
              className="form-control"
              value={RollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
<p className="text-center mt-3">
  Don’t have an account? <Link to="/register" className="text-success">Sign Up</Link>
</p>
      </div>
    </div>
  );
}

