import React, { useState } from "react";
import "./Inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([
    { name: "Product A", sku: "SKU123", quantity: 50, price: 500, image: "" },
    { name: "Product B", sku: "SKU124", quantity: 30, price: 400, image: "" },
    { name: "Product C", sku: "SKU125", quantity: 20, price: 350, image: "" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = formData;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({ name: "", sku: "", quantity: "", price: "", image: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Product</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="product-img" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No products available</td></tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{editIndex !== null ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="SKU ID"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <div className="form-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
