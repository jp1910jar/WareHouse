import React, { useState } from "react";
import "./Purchase.css";

export default function Purchase() {
  const [purchases, setPurchases] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    date: "",
    supplier: "",
    product: "",
    qty: "",
    mip: "",
  });

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(n || 0));

  const totalMIP = purchases.reduce(
    (sum, row) => sum + Number(row.mip) * Number(row.qty),
    0
  );

  const openAdd = () => {
    setEditingIndex(null);
    setForm({ date: "", supplier: "", product: "", qty: "", mip: "" });
    setShowPopup(true);
  };

  const openEdit = (index) => {
    const row = purchases[index];
    setEditingIndex(index);
    setForm({
      date: row.date,
      supplier: row.supplier,
      product: row.product,
      qty: String(row.qty),
      mip: String(row.mip),
    });
    setShowPopup(true);
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const savePurchase = () => {
    const { date, supplier, product, qty, mip } = form;
    if (!date || !supplier || !product || !qty || !mip) {
      alert("Please fill all fields");
      return;
    }
    const cleaned = {
      date,
      supplier: supplier.trim(),
      product: product.trim(),
      qty: Number(qty),
      mip: Number(mip),
    };

    if (editingIndex === null) {
      setPurchases((p) => [...p, cleaned]);
    } else {
      setPurchases((p) => p.map((r, i) => (i === editingIndex ? cleaned : r)));
    }
    setShowPopup(false);
    setEditingIndex(null);
  };

  const handleDelete = (index) =>
    setPurchases((p) => p.filter((_, i) => i !== index));

  return (
    <div className="purchase-page">
      <div className="purchase-header">
        <h1  >Purchase Management</h1>
        <button className="add-btn" type="button" onClick={openAdd}>
          + Add Purchase
        </button>
      </div>

      <div className="table-card">
        <div className="table-scroller">
          <table className="purchase-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>MIP</th>
                <th>Total MIP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-rows">
                    No purchases recorded
                  </td>
                </tr>
              ) : (
                purchases.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.supplier}</td>
                    <td>{row.product}</td>
                    <td>{row.qty}</td>
                    <td>{formatINR(row.mip)}</td>
                    <td>{formatINR(row.mip * row.qty)}</td>
                    <td className="actions">
                      <button
                        type="button"
                        className="pill-btn edit"
                        onClick={() => openEdit(i)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="pill-btn delete"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {purchases.length > 0 && (
        <div className="totals-card">
          <strong>Total MIP: </strong> {formatINR(totalMIP)}
        </div>
      )}

      {showPopup && (
        <div
          className="popup-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("popup-overlay")) setShowPopup(false);
          }}
        >
          <div className="popup-card" role="dialog" aria-modal="true">
            <h2>{editingIndex === null ? "Add Purchase" : "Edit Purchase"}</h2>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="supplier"
              placeholder="Supplier Name"
              value={form.supplier}
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
              min="1"
              value={form.qty}
              onChange={handleChange}
            />
            <input
              type="number"
              name="mip"
              placeholder="MIP"
              min="0"
              step="0.01"
              value={form.mip}
              onChange={handleChange}
            />

            <div className="popup-actions">
              <button className="save-btn" type="button" onClick={savePurchase}>
                Save
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
