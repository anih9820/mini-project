import React from "react";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import "./Sidebar.css";
import { logoImage } from "../../constants/constants";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar" style={{backgroundColor: "DarkGrey"}}>
            <div className="logo-container">
    
          <img
            src={logoImage}
            alt="Company Logo"
            className="logo"
          />
 
      </div>
      <nav>
        <div
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          <FiPackage className="icon" />
          Products
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
