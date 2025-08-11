import React, { useState } from "react";
import "./Inventory.css";

export default function Inventory() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const sampleData = [
    { id: 1, name: "Product A", sku: "SKU12345", qty: 50, mrp: "₹500",mdp:"₹800",mip:"₹300", image: "/image4.jpg" },
    { id: 2, name: "Product B", sku: "SKU67890", qty: 30, mrp: "₹800",mdp:"₹1200",mip:"₹600", image: "/slider1.jpg" },
  ];

  return (
    <div className="inventory-container">
      {/* Blur wrapper */}
      <div className={isFormOpen ? "blur-background" : ""}>
        {/* ===== Header ===== */}
        <div className="inventory-header">
          <h2>Inventory</h2>
          <button className="addbtn" onClick={() => setIsFormOpen(true)}>
            Add New Product
          </button>
        </div>

        {/* ===== Table ===== */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>MRP</th>
              <th>MDP</th>
              <th>MIP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} className="product-image" />
                </td>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.qty}</td>
                <td>{item.mrp}</td>
                <td>{item.mdp}</td>
                <td>{item.mip}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== Footer ===== */}
        <div className="footer">Total products: {sampleData.length}</div>
      </div>

      {/* ===== Popup Form ===== */}
      {isFormOpen && (
        <div className="form-popup">
          <div className="form-card">
            <h3>Add Product</h3>
            <input type="text" placeholder="Product Name" />
            <input type="text" placeholder="SKU" />
            <input type="number" placeholder="Quantity" />
            <input type="text" placeholder="MRP" />
             <input type="text" placeholder="MDP" />
             <input type="text" placeholder="MIP" />
            <input type="file" />
            <div className="form-actions">
              <button onClick={() => setIsFormOpen(false)}>Save</button>
              <button onClick={() => setIsFormOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
