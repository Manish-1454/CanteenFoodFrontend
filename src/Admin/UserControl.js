import React, { useEffect, useState } from "react";
import api from "../api";

function UserControl() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user/");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users List</h2>
      <div className="row">
        {users.map((u) => (
          <div key={u._id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{u.name}</h5>
                <p className="card-text">
                  <strong>Roll No:</strong> {u.RollNo} <br />
                  <strong>Degree:</strong> {u.Degree || "N/A"} <br />
                  <strong>Role:</strong> {u.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserControl;
