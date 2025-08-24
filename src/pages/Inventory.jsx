
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    image: null,
  });
  const [editIndex, setEditIndex] = useState(null);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // 🔹 Handle submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("sku", formData.sku);
      data.append("quantity", formData.quantity);
      data.append("price", formData.price);
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      let res;
      if (editIndex !== null) {
        // 🔹 Update product by SKU
        const productSku = products[editIndex].sku;
        res = await axios.put(
          `http://localhost:5000/api/products/${productSku}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.data) {
          const updatedProducts = [...products];
          updatedProducts[editIndex] = res.data;
          setProducts(updatedProducts);
        }
      } else {
        // 🔹 Create new product
        res = await axios.post("http://localhost:5000/api/products/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          setProducts([...products, res.data.product]);
        }
      }

      // Reset form
      setFormData({ name: "", sku: "", quantity: "", price: "", image: null });
      setEditIndex(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product");
    }
  };

  // 🔹 Handle edit
  const handleEdit = (index) => {
    const product = products[index];
    setFormData({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      price: product.price,
      image: product.image, // string for now
    });
    setEditIndex(index);
    setShowForm(true);
  };

  // 🔹 Handle delete (API call by SKU)
  const handleDelete = async (index) => {
    const productSku = products[index].sku;
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/products/${productSku}`);
      if (res.data.message) {
        setProducts(products.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Product
        </button>
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
              <tr key={product.sku || index}>
                <td>
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("/uploads")
                          ? `http://localhost:5000${product.image}`
                          : product.image
                      }
                      alt={product.name}
                      className="product-img"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
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
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
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
  );
};

export default Inventory;