import React, { useState, useEffect } from "react";
import api from "../api";

function AdminContact() {
  const [contact, setContact] = useState({ email: "no email", phone: "", address: "" });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/contact");
        setContact(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/contact", contact);
      alert("Contact info updated!");
      setContact(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Contact Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={contact.email} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={contact.phone} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={contact.address} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default AdminContact;
