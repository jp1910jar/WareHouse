import React, { useEffect, useState } from "react";
import "./Deal.css";

const Deals = () => {
  const [deals, setDeals] = useState([]);

  // Fetch converted leads
  const fetchDeals = () => {
    fetch("http://localhost:5000/api/accounts") // same API, but we'll filter converted
      .then((res) => res.json())
      .then((data) => {
        const converted = data.filter((acc) => acc.converted === true);
        setDeals(converted);
      });
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Delete Deal
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/accounts/${id}`, {
      method: "DELETE",
    });
    fetchDeals();
  };

  return (
    <div className="deals-container">
      <h2 className="deals-heading">Deals Page</h2>
      <table className="deals-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Address</th>
            <th>Deal Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deals.length > 0 ? (
            deals.map((deal) => (
              <tr key={deal._id}>
                <td>{deal.name}</td>
                <td>{deal.company}</td>
                <td>{deal.email}</td>
                <td>{deal.phone}</td>
                <td>{deal.city}</td>
                <td>{deal.state}</td>
                <td>{deal.pincode}</td>
                <td>{deal.address}</td>
                <td>
                  <span className="status-badge converted">Converted</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(deal._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-deals">
                No Deals Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deals;
