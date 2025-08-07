import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./Layout/MainLayout";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1 style={{ textAlign: "center" }}>Welcome to AverElite</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
           <Route path="/header" element={<Header />} />
            <Route path="/footer" element={<Footer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
