import React, { useState } from "react";
import "./Inventory.css";
import sampleImage from "../assets/logo.png.png";

function Inventory() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      sku: "SKU12345",
      qty: 50,
      mrp: "₹500",
      mdp: "₹450",
      mip: "₹400",
      image: sampleImage,
    },
    {
      id: 2,
      name: "Product B",
      sku: "SKU12346",
      qty: 30,
      mrp: "₹800",
      mdp: "₹750",
      mip: "₹700",
      image: sampleImage,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    qty: "",
    mrp: "",
    mdp: "",
    mip: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...formData, id: editId } : p
        )
      );
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setFormData({
      name: "",
      sku: "",
      qty: "",
      mrp: "",
      mdp: "",
      mip: "",
      image: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <button onClick={() => setShowForm(true)}>Add New Product</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU ID</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>MDP</th>
            <th>MIP</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.qty}</td>
              <td>{item.mrp}</td>
              <td>{item.mdp}</td>
              <td>{item.mip}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <p>
          Showing 1 to {products.length} of {products.length} entries
        </p>
      </div>

      {showForm && (
        <div className="form-popup">
          <div className="form-card">
            <h3>{editId ? "Edit Product" : "Add New Product"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="sku"
                placeholder="SKU ID"
                value={formData.sku}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="qty"
                placeholder="Quantity"
                value={formData.qty}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mrp"
                placeholder="MRP"
                value={formData.mrp}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mdp"
                placeholder="MDP"
                value={formData.mdp}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mip"
                placeholder="MIP"
                value={formData.mip}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="form-actions">
                <button type="submit">
                  {editId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
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
  );
}

export default Inventory;
