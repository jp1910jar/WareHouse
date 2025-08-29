import React, { useEffect, useState } from "react";
import "./Lead.css";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [editLead, setEditLead] = useState(null); // store lead for update
  const [updateData, setUpdateData] = useState({}); // partial updates
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
 const statusOptions = [
    "Attempted to Contact",
    "Contact in Future",
    "Contacted",
    "Junk Lead",
    "Lost Lead",
    "Converted",
    "Not Contacted",
    "Pre-Qualified",
    "Not Qualified",
  ];


  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/crm/getCrmLead");
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Delete lead
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crm/deleteCrm/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setPopup({ show: true, message: "Lead deleted successfully!", type: "success" });
      fetchLeads();
    } catch {
      setPopup({ show: true, message: "Failed to delete lead", type: "error" });
    }
  };

  // Convert lead → deal
  const handleConvert = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crm/updateType/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();
      setPopup({ show: true, message: "Lead converted to deal!", type: "success" });
      fetchLeads();
    } catch {
      setPopup({ show: true, message: "Failed to convert lead", type: "error" });
    }
  };

  // Open update popup
  const handleEdit = (lead) => {
    setEditLead(lead);
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
      const res = await fetch(`http://localhost:5000/api/crm/updateCrm/${editLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error();
      setPopup({ show: true, message: "Lead updated successfully!", type: "success" });
      setEditLead(null);
      fetchLeads();
    } catch {
      setPopup({ show: true, message: "Failed to update lead", type: "error" });
    }
  };

  return (
    <div className="leads-container">
      <h2 className="leads-heading">Leads Page</h2>
      <table className="leads-table">
        <thead>
          <tr>
            {/* ID column removed */}
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
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead._id || lead.id}>
                {/* ID cell removed */}
                <td>{lead.name}</td>
                <td>{lead.company}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.city}</td>
                <td>{lead.state}</td>
                <td>{lead.pincode}</td>
                <td>{lead.address}</td>
                <td>
                  <span
                    className={`status-badge ${
                      lead.converted ? "converted" : "not-converted"
                    }`}
                  >
                    {lead.converted ? "Converted" : "Not Converted"}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(lead)} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => handleDelete(lead.id)} className="delete-btn">
                    Delete
                  </button>
                  <button
                    onClick={() => handleConvert(lead.id)}
                    disabled={lead.converted}
                    className={`convert-btn ${lead.converted ? "disabled" : ""}`}
                  >
                    {lead.converted ? "Converted" : "Convert"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-leads">
                No Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Form Modal */}
      {editLead && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Update Lead (ID: {editLead.id})</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={editLead.name}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                defaultValue={editLead.company}
                onChange={handleUpdateChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={editLead.email}
                onChange={handleUpdateChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                defaultValue={editLead.phone}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={editLead.city}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                defaultValue={editLead.state}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                defaultValue={editLead.pincode}
                onChange={handleUpdateChange}
              />
              <textarea
                name="address"
                placeholder="Address"
                defaultValue={editLead.address}
                onChange={handleUpdateChange}
              />
              <div className="form-actions">
                <button type="submit" className="submit-btn">Save</button>
                <button type="button" onClick={() => setEditLead(null)} className="cancel-btn">
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

      {/* Inline Popup CSS (left exactly as you had it) */}
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

export default Leads;
