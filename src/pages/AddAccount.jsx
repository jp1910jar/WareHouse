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

  // List of Indian States
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
"Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
"Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
"Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
"Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
"Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone to max 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // only numbers
      if (value.length > 10) return;   // max 10 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone (must be 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      setPopup({ show: true, message: "❌ Phone number must be exactly 10 digits.", type: "error" });
      return;
    }

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
        setPopup({ show: true, message: "✅ Lead added successfully!", type: "success" });
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
      <h2 className="form-title">➕ Add Account</h2>

      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
        
          <input type="text" name="name"   placeholder="Name"  value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
        
          <input type="text" name="company"  placeholder="Company"  value={formData.company} onChange={handleChange} required />
        </div>

        <div className="form-group">
          
          <input type="email" name="email" placeholder="E-mail"  value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          
          <textarea name="address"   placeholder="Address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            
            <input type="text" name="city"   placeholder="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="form-group">
            
            <input type="text" name="pincode"  placeholder="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option value="">-- Select State --</option>
              {states.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Add Lead"}
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
    </div>
  );
};

export default AddAccount;
