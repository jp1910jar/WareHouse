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
import Report from "./pages/Report";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import CRM from "./pages/CRM";
import Addaccount from "./pages/AddAccount";
import Lead from "./pages/Lead";
import Deal from "./pages/Deal";
import AddAccount from "./pages/AddAccount";


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
             <Route path="/report" element={<Report />} />
             <Route path="/sales" element={<Sales />} /> 
              <Route path="/purchase" element={<Purchase />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/addaccount" element={<AddAccount />} />
        <Route path="/lead" element={<Lead/>} />
        <Route path="/deal" element={<Deal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
