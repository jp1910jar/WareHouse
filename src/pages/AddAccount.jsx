import React, { useState } from "react";
import "./AddAccount.css";

const AddAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ show: false, message: "", type: "" });

    try {
      const response = await fetch("http://localhost:5000/api/crm/createCrm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setPopup({ show: true, message: "✅ Account added successfully!", type: "success" });
        setFormData({
          name: "",
          company: "",
          email: "",
          address: "",
          city: "",
          pincode: "",
          state: "",
          phone: "",
        });
      } else {
        setPopup({ show: true, message: `❌ Error: ${result.message || "Something went wrong"}`, type: "error" });
      }
    } catch (error) {
      setPopup({ show: true, message: "❌ Failed to connect to server.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  return (
    <div className="account-container">
      <h2 className="form-title">Add Account</h2>

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Add Account"}
        </button>
      </form>

      {/* Popup Modal */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            <p>{popup.message}</p>
            <button onClick={closePopup} className="popup-btn">Close</button>
          </div>
        </div>
      )}

      {/* Extra CSS for popup only */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.4);
          z-index: 1000;
        }
        .popup-box {
          background: white;
          padding: 20px 30px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        }
        .popup-box.success { border: 2px solid green; color: green; }
        .popup-box.error { border: 2px solid red; color: red; }
        .popup-btn {
          margin-top: 15px;
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AddAccount;
