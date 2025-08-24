import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    date: "",
    customer: "",
    productSku: "",
    qty: "",
    mdp: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // 🔹 Fetch sales from backend
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sales/getSales");
        if (res.data.success) {
          setSales(res.data.sales);
        }
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };
    fetchSales();
  }, []);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle add / update sale
  const handleSaveSale = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editIndex !== null) {
        // 🔹 Update Sale
        const saleId = sales[editIndex].saleId;
        res = await axios.put(
          `http://localhost:5000/api/sales/updateSale/${saleId}`,
          form
        );
        if (res.data.success) {
          const updatedSales = [...sales];
          updatedSales[editIndex] = res.data.sale;
          setSales(updatedSales);
        }
      } else {
        // 🔹 Create Sale
        res = await axios.post(
          "http://localhost:5000/api/sales/createSale",
          form
        );
        if (res.data.success) {
          setSales([...sales, res.data.sale]);
        }
      }

      // Reset form
      setForm({ date: "", customer: "", productSku: "", qty: "", mdp: "" });
      setEditIndex(null);
      setShowPopup(false);
    } catch (err) {
      console.error("Error saving sale:", err);
      alert("Failed to save sale");
    }
  };

  // 🔹 Handle edit
  const handleEdit = (index) => {
    const sale = sales[index];
    setForm({
      date: sale.date?.slice(0, 10) || "",
      customer: sale.customer,
      productSku: sale.productSku,
      qty: sale.qty,
      mdp: sale.mdp,
    });
    setEditIndex(index);
    setShowPopup(true);
  };

  // 🔹 Handle delete
  const handleDelete = async (index) => {
    const saleId = sales[index].saleId;
    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/sales/deleteSale/${saleId}`
      );
      if (res.data.success) {
        setSales(sales.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error("Error deleting sale:", err);
      alert("Failed to delete sale");
    }
  };

  // 🔹 Totals
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
              <th>Product SKU</th>
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
                <tr key={sale.saleId || index}>
                  <td>{sale.date?.slice(0, 10)}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.productSku}</td>
                  <td>{sale.qty}</td>
                  <td>₹{Number(sale.mdp).toFixed(2)}</td>
                  <td>₹{(Number(sale.mdp) * Number(sale.qty)).toFixed(2)}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {sales.length > 0 && (
          <div className="totals">
            <p>
              <strong>Total MDP:</strong> ₹{totalMDP.toFixed(2)}
            </p>
          </div>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-card">
              <h2>{editIndex !== null ? "Edit Sale" : "Add Sale"}</h2>
              <form onSubmit={handleSaveSale}>
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
                  name="productSku"
                  placeholder="Product SKU"
                  value={form.productSku}
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
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowPopup(false);
                      setEditIndex(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
