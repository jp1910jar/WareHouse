import React, { useState } from 'react'
import "./Adminlogin.css"; // ✅ Make sure the file name is correct
import Logo from "../assets/logo.png.png"; 

function Adminlogin
() {
    const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/login", form);
    alert("Logged in successfully!");
  };

  return (
    <div className="login-page">
      {/* Floating abstract shapes */}
      <div className="abstract-shape red"></div>
      <div className="abstract-shape yellow"></div>
      <div className="abstract-shape blue"></div>

      <div className="login-card">
        <img src={Logo} alt="Logo" className="logo-image" />
        <h2 className="subtitle">Log In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Adminlogin
