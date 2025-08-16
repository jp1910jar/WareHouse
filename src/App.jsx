import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./Layout/MainLayout";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Inventory from "./pages/Inventory";
import Addproduct from "./pages/Addproduct";
import Addreport from "./pages/Addreport";
import Addsales from "./pages/Addsales";
import Report from "./pages/Report";
import Sales from "./pages/Sales";
import Adminlogin from "./pages/Adminlogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
           <Route path="/header" element={<Header />} />
            <Route path="/footer" element={<Footer />} />
             <Route path="/inventory" element={<Inventory />} /> 
             <Route path="/addproduct" element={<Addproduct />} />
             <Route path="/addreport" element={<Addreport />} />
             <Route path="/addsales" element={<Addsales />} />
             <Route path="/report" element={<Report />} />
             <Route path="/sales" element={<Sales />} /> 
             <Route path="/adminlogin" element={<Adminlogin />} />
             
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
