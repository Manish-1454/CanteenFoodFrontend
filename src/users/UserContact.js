import React, { useEffect, useState } from 'react';
import api from '../api'; // Axios instance

function UserContact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContact = async () => {
    try {
      const res = await api.get('/contact');
      setContact(res.data);
    } catch (err) {
      setError('Failed to load contact information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading contact info...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  if (!contact) {
    return <div className="alert alert-warning text-center mt-5">No contact information available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h3 className="card-title mb-4">📞 Contact Information</h3>
          
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </li>
            <li className="list-group-item">
              <strong>Address:</strong> {contact.address}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserContact;
