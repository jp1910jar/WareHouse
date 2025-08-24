import React, { useState } from "react";
import "./Report.css";

const Report = () => {
  const [month, setMonth] = useState("");
  const [customer, setCustomer] = useState("");

  // Dummy Sales Data
  const salesData = [
    { month: "January", customer: "John Doe", totalSales: 5000, totalProfit: 1500 },
    { month: "January", customer: "Jane Smith", totalSales: 7000, totalProfit: 2000 },
    { month: "February", customer: "Michael Brown", totalSales: 6000, totalProfit: 1800 },
  ];

  // Dummy Stock Movement Data
  const stockData = [
    { id: 1, product: "Product A", stockIn: 50, purchase: 30, supplier: "Supplier X", stockOut: 20 },
    { id: 2, product: "Product B", stockIn: 40, purchase: 25, supplier: "Supplier Y", stockOut: 15 },
  ];

  // Filtered Data
  const filteredSales = salesData.filter(item => {
    return (
      (month ? item.month === month : true) &&
      (customer ? item.customer === customer : true)
    );
  });

  const exportToCSV = (data, filename) => {
    if (!data.length) return; // prevent error if data is empty

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    data.forEach(row => {
      const values = Object.values(row).map(val => `"${val}"`);
      csvRows.push(values.join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.click();
  };

  // Month List
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="report-container">
      <h1>📊 Reports & Analytics</h1>

      {/* Filters */}
      <div className="filters">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {months.map((m, idx) => (
            <option key={idx} value={m}>{m}</option>
          ))}
        </select>

        <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
          <option value="">All Customers</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Michael Brown">Michael Brown</option>
        </select>
      </div>

      {/* Sales Summary Table */}
      <div className="table-section">
        <h2>💰 Sales Summary</h2>
        <button
          onClick={() => exportToCSV(filteredSales, "sales_summary.csv")}
          className="export-btn"
        >
          Export CSV
        </button>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Customer Name</th>
              <th>Total Sales</th>
              <th>Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((row, idx) => (
              <tr key={idx}>
                <td>{row.month}</td>
                <td>{row.customer}</td>
                <td>₹{row.totalSales.toLocaleString()}</td>
                <td>₹{row.totalProfit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stock Movement Table */}
      <div className="table-section">
        <h2>📦 Stock Movement</h2>
        <button
          onClick={() => exportToCSV(stockData, "stock_movement.csv")}
          className="export-btn"
        >
          Export CSV
        </button>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock In</th>
              <th>Purchase</th>
              <th>Supplier</th>
              <th>Stock Out</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((row) => (
              <tr key={row.id}>
                <td>{row.product}</td>
                <td>{row.stockIn}</td>
                <td>{row.purchase}</td>
                <td>{row.supplier}</td>
                <td>{row.stockOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
