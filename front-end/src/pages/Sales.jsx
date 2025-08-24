// import React, { useState, useEffect } from "react";
// import "./Sales.css";

// function Sales() {
//   const [sales, setSales] = useState([]);
//   const [formData, setFormData] = useState(initialFormState());
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const productsList = [
//     { name: "Product A", mrp: 500, mdp: 450 },
//     { name: "Product B", mrp: 800, mdp: 750 },
//   ];

//   function initialFormState() {
//     return {
//       customer: "",
//       product: "",
//       qty: "",
//       mrp: "",
//       mdp: "",
//       total: "",
//       profit: "",
//     };
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "product") {
//       const selected = productsList.find((p) => p.name === value);
//       setFormData({
//         ...formData,
//         product: selected?.name || "",
//         mrp: selected?.mrp || "",
//         mdp: selected?.mdp || "",
//         qty: "",
//         total: "",
//         profit: "",
//       });
//     } else if (name === "qty") {
//       const qtyVal = parseInt(value) || 0;
//       const totalVal = qtyVal * (formData.mrp || 0);
//       const profitVal = qtyVal * ((formData.mrp || 0) - (formData.mdp || 0));
//       setFormData({
//         ...formData,
//         qty: qtyVal,
//         total: totalVal,
//         profit: profitVal,
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSales([...sales, formData]);
//     setFormData(initialFormState());
//     setIsModalOpen(false);
//   };

//   // Close modal with ESC key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") setIsModalOpen(false);
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, []);

//   return (
//     <div className="sales-container">
//       <div class=".sales-inner">
//       {/* Floating Add Sale Button */}
//       <button className="add-sale-btn" onClick={() => setIsModalOpen(true)}>
//         + Add Sale
//       </button>

//       {/* Sales Table */}
//       <table className="sales-table">
//         <thead>
//           <tr>
//             <th>Customer</th>
//             <th>Product</th>
//             <th>Qty</th>
//             <th>MRP</th>
//             <th>MDP</th>
//             <th>Total</th>
//             <th>Profit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((s, i) => (
//             <tr key={i}>
//               <td>{s.customer}</td>
//               <td>{s.product}</td>
//               <td>{s.qty}</td>
//               <td>₹{s.mrp}</td>
//               <td>₹{s.mdp}</td>
//               <td>₹{s.total}</td>
//               <td>₹{s.profit}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Add New Sale</h3>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="customer"
//                 placeholder="Customer Name"
//                 value={formData.customer}
//                 onChange={handleChange}
//                 required
//               />
//               <select
//                 name="product"
//                 value={formData.product}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Product</option>
//                 {productsList.map((p, idx) => (
//                   <option key={idx} value={p.name}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 name="qty"
//                 placeholder="Quantity"
//                 value={formData.qty}
//                 onChange={handleChange}
//                 required
//               />
//               <input type="number" name="mrp" placeholder="MRP" value={formData.mrp} readOnly />
//               <input type="number" name="mdp" placeholder="MDP" value={formData.mdp} readOnly />
//               <input type="number" name="total" placeholder="Total" value={formData.total} readOnly />
//               <input type="number" name="profit" placeholder="Profit" value={formData.profit} readOnly />

//               <div className="modal-actions">
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       </div>
//     </div>
//   );
// }

// export default Sales;
import React, { useState } from "react";
import "./Sales.css";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    date: "",
    customer: "",
    product: "",
    qty: "",
    mip: "",
    mdp: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSale = () => {
    if (!form.date || !form.customer || !form.product || !form.qty || !form.mip || !form.mdp) {
      alert("Please fill all fields");
      return;
    }
    setSales([...sales, form]);
    setForm({ date: "", customer: "", product: "", qty: "", mip: "", mdp: "" });
    setShowPopup(false);
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

  const totalMIP = sales.reduce((sum, sale) => sum + (parseFloat(sale.mip) * parseInt(sale.qty)), 0);
  const totalMDP = sales.reduce((sum, sale) => sum + (parseFloat(sale.mdp) * parseInt(sale.qty)), 0);

  return (
    <div className="sales-page">
      <div class="sales-inner">
      <div className="sales-header">
        <h1>Sales Management</h1>
        <button className="add-btn" onClick={() => setShowPopup(true)}>+ Add Sale</button>
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>MIP</th>
            <th>MDP</th>
            <th>Total MIP</th>
            <th>Total MDP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>No sales recorded</td>
            </tr>
          ) : (
            sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.date}</td>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>₹{sale.mip}</td>
                <td>₹{sale.mdp}</td>
                <td>₹{(sale.mip * sale.qty).toFixed(2)}</td>
                <td>₹{(sale.mdp * sale.qty).toFixed(2)}</td>
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
          <p><strong>Total MIP:</strong> ₹{totalMIP.toFixed(2)}</p>
          <p><strong>Total MDP:</strong> ₹{totalMDP.toFixed(2)}</p>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>Add Sale</h2>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            <input type="text" name="customer" placeholder="Customer Name" value={form.customer} onChange={handleChange} />
            <input type="text" name="product" placeholder="Product Name" value={form.product} onChange={handleChange} />
            <input type="number" name="qty" placeholder="Quantity" value={form.qty} onChange={handleChange} />
            <input type="number" name="mip" placeholder="MIP" value={form.mip} onChange={handleChange} />
            <input type="number" name="mdp" placeholder="MDP" value={form.mdp} onChange={handleChange} />
            <div className="popup-actions">
              <button className="save-btn" onClick={handleAddSale}>Save</button>
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}