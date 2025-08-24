import React, { useState } from "react";
import "./Sales.css";
import axios from "axios";
export default function Sales() {
  const [sales, setSales] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    date: "",
    customer: "",
    product: "",
    qty: "",
    mdp: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSale = async () => {
    if (!form.date || !form.customer || !form.product || !form.qty || !form.mdp) {
      alert("Please fill all fields");
      return;
    } 
    const data = new FormData();
      data.append("date", form.date);
      data.append("customer", form.customer);
      data.append("product", form.product);
      data.append("qty", form.qty);
      data.append("mdp", form.mdp);
 res = await axios.post("http://localhost:5000/api/sales/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // if (res.data.success) {
        //   setProducts([...sales, res.data.sales]);
        // }
      



    // setSales([...sales, form]);
    // setForm({ date: "", customer: "", product: "", qty: "", mdp: "" });
    // setShowPopup(false);
  };

  const handleDelete = (index) => {
    const updated = [...sales];
    updated.splice(index, 1);
    setSales(updated);
  };

  const handleEdit = (index) => {
    setForm(sales[index]);
    setSales(sales.filter((_, i) => i !== index));
    setShowPopup(true);
  };

  // Totals
  const totalMDP = sales.reduce(
    (sum, sale) => sum + Number(sale.mdp) * Number(sale.qty),
    0
  );

  return (
    <div className="sales-page">
      <div className="sales-inner">
        <div className="sales-header">
          <h1>Sales Management</h1>
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            + Add Sale
          </button>
        </div>

        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>MDP</th>
              <th>Total MDP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No sales recorded
                </td>
              </tr>
            ) : (
              sales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.product}</td>
                  <td>{sale.qty}</td>
                  <td>₹{Number(sale.mdp).toFixed(2)}</td>
                  <td>₹{(Number(sale.mdp) * Number(sale.qty)).toFixed(2)}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {sales.length > 0 && (
          <div className="totals">
            <p><strong>Total MDP:</strong> ₹{totalMDP.toFixed(2)}</p>
          </div>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-card">
              <h2>Add Sale</h2>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
              <input
                type="text"
                name="customer"
                placeholder="Customer Name"
                value={form.customer}
                onChange={handleChange}
              />
              <input
                type="text"
                name="product"
                placeholder="Product Name"
                value={form.product}
                onChange={handleChange}
              />
              <input
                type="number"
                name="qty"
                placeholder="Quantity"
                value={form.qty}
                onChange={handleChange}
              />
              <input
                type="number"
                name="mdp"
                placeholder="MDP"
                value={form.mdp}
                onChange={handleChange}
              />
              <div className="popup-actions">
                <button className="save-btn" onClick={handleAddSale}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
