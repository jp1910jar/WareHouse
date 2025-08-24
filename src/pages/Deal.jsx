import React, { useEffect, useState } from "react";
import "./Deal.css";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [editDeal, setEditDeal] = useState(null); // store deal for update
  const [updateData, setUpdateData] = useState({}); // partial updates
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  // Fetch deals
  const fetchDeals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/crm/getCrmDeal");
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      console.error("Error fetching deals:", err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Delete deal
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crm/deleteCrm/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setPopup({ show: true, message: "Deal deleted successfully!", type: "success" });
      fetchDeals();
    } catch {
      setPopup({ show: true, message: "Failed to delete deal", type: "error" });
    }
  };

  // Open update popup
  const handleEdit = (deal) => {
    setEditDeal(deal);
    setUpdateData({});
  };

  // Handle input change in update form
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update (send only changed fields)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/crm/updateCrm/${editDeal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error();
      setPopup({ show: true, message: "Deal updated successfully!", type: "success" });
      setEditDeal(null);
      fetchDeals();
    } catch {
      setPopup({ show: true, message: "Failed to update deal", type: "error" });
    }
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
              <tr key={deal._id || deal.id}>
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
                  <button onClick={() => handleEdit(deal)} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => handleDelete(deal.id)} className="delete-btn">
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

      {/* Update Form Modal */}
      {editDeal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Update Deal (ID: {editDeal.id})</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={editDeal.name}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                defaultValue={editDeal.company}
                onChange={handleUpdateChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={editDeal.email}
                onChange={handleUpdateChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                defaultValue={editDeal.phone}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={editDeal.city}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                defaultValue={editDeal.state}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                defaultValue={editDeal.pincode}
                onChange={handleUpdateChange}
              />
              <textarea
                name="address"
                placeholder="Address"
                defaultValue={editDeal.address}
                onChange={handleUpdateChange}
              />
              <div className="form-actions">
                <button type="submit" className="submit-btn">Save</button>
                <button type="button" onClick={() => setEditDeal(null)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Message */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ show: false, message: "", type: "" })}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inline Popup CSS (same as Lead.jsx) */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000;
        }
        .popup-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        }
        .popup-box.success { border: 2px solid green; color: green; }
        .popup-box.error { border: 2px solid red; color: red; }
        .popup-box form input,
        .popup-box form textarea {
          display: block;
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Deals;
