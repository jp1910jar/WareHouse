import React, { useState } from "react";
import "./Sales.css";

function Sales() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    qty: "",
    mrp: "",
    mdp: "",
    total: "",
    profit: "",
  });

  const productsList = [
    { name: "Product A", mrp: 500, mdp: 450 },
    { name: "Product B", mrp: 800, mdp: 750 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-update MRP, MDP, total, profit on product/qty change
    if (name === "product") {
      const selected = productsList.find((p) => p.name === value);
      if (selected) {
        setFormData({
          ...formData,
          product: selected.name,
          mrp: selected.mrp,
          mdp: selected.mdp,
          qty: "",
          total: "",
          profit: "",
        });
      }
    } else if (name === "qty") {
      const qtyVal = parseInt(value) || 0;
      const totalVal = qtyVal * (formData.mrp || 0);
      const profitVal = qtyVal * ((formData.mrp || 0) - (formData.mdp || 0));
      setFormData({
        ...formData,
        qty: qtyVal,
        total: totalVal,
        profit: profitVal,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSales([...sales, formData]);
    setFormData({
      customer: "",
      product: "",
      qty: "",
      mrp: "",
      mdp: "",
      total: "",
      profit: "",
    });
  };

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2>Sales</h2>
      </div>

      {/* Sales Form */}
      <div className="sales-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            required
          />

          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {productsList.map((p, idx) => (
              <option key={idx} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="mrp"
            placeholder="MRP"
            value={formData.mrp}
            readOnly
          />

          <input
            type="number"
            name="mdp"
            placeholder="MDP"
            value={formData.mdp}
            readOnly
          />

          <input
            type="number"
            name="total"
            placeholder="Total"
            value={formData.total}
            readOnly
          />

          <input
            type="number"
            name="profit"
            placeholder="Profit"
            value={formData.profit}
            readOnly
          />

          <button type="submit">Add Sale</button>
        </form>
      </div>

      {/* Sales Table */}
      <table className="sales-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>MDP</th>
            <th>Total</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={i}>
              <td>{s.customer}</td>
              <td>{s.product}</td>
              <td>{s.qty}</td>
              <td>₹{s.mrp}</td>
              <td>₹{s.mdp}</td>
              <td>₹{s.total}</td>
              <td>₹{s.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
