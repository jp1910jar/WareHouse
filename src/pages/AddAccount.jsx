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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Data Submitted:", formData);
    alert("Account added successfully!");
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

        <button type="submit" className="submit-btn">Add Account</button>
      </form>
    </div>
  );
};

export default AddAccount;
