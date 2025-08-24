import React, { useEffect, useState } from "react";
import "./Lead.css";

const Leads = () => {
  const [accounts, setAccounts] = useState([]);

  // Fetch data
  const fetchAccounts = () => {
    fetch("http://localhost:5000/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Delete account
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/accounts/${id}`, {
      method: "DELETE",
    });
    fetchAccounts();
  };

  // Convert account
  const handleConvert = async (id) => {
    await fetch(`http://localhost:5000/api/accounts/${id}/convert`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    fetchAccounts();
  };

  return (
    <div className="leads-container">
      <h2 className="leads-heading">Leads Page</h2>
      <table className="leads-table">
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc._id}>
              <td>{acc.name}</td>
              <td>{acc.company}</td>
              <td>{acc.email}</td>
              <td>{acc.phone}</td>
              <td>{acc.city}</td>
              <td>{acc.state}</td>
              <td>{acc.pincode}</td>
              <td>{acc.address}</td>
              <td>
                <span
                  className={`status-badge ${
                    acc.converted ? "converted" : "not-converted"
                  }`}
                >
                  {acc.converted ? "Converted" : "Not Converted"}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleConvert(acc._id)}
                  disabled={acc.converted}
                  className={`convert-btn ${
                    acc.converted ? "disabled" : ""
                  }`}
                >
                  {acc.converted ? "Converted" : "Convert to Lead"}
                </button>
                <button
                  onClick={() => handleDelete(acc._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} <tr>
              <td colSpan="10" className="no-deals">
                No Leads Found
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
