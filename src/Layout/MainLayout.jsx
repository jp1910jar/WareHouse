import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const MainLayout = () => {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/signup"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <div
        style={{
          minHeight: hideLayout ? "100vh" : "calc(100vh - 140px)",
          paddingTop: hideLayout ? "0" : "80px",
        }}
      >
        <Outlet /> {/* This is where pages will render */}
      </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default MainLayout;
