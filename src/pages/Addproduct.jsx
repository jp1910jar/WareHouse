import React, { useState } from "react";
import "./AddProduct.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    mip: "",
    mdp: "",
    mrp: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚀 Here you would call API to save product
    console.log("Product Added:", product);

    alert("✅ Product added successfully!");
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label>SKU ID</label>
        <input
          type="text"
          name="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="Enter SKU ID"
          required
        />

        <label>Minimum Import Price (MIP)</label>
        <input
          type="number"
          name="mip"
          value={product.mip}
          onChange={handleChange}
          placeholder="Enter MIP"
          required
        />

        <label>Maximum Distribution Price (MDP)</label>
        <input
          type="number"
          name="mdp"
          value={product.mdp}
          onChange={handleChange}
          placeholder="Enter MDP"
          required
        />

        <label>Maximum Retail Price (MRP)</label>
        <input
          type="number"
          name="mrp"
          value={product.mrp}
          onChange={handleChange}
          placeholder="Enter MRP"
          required
        />

        <label>Product Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Enter image link"
          required
        />

        <button type="submit" className="btn-submit">
          ➕ Add Product
        </button>
      </form>
    </div>
  );
}



