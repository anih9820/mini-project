import React from "react";
import "./DashboardHeader.css";

const DashboardHeader = ({ title, children }) => {
  return (
    <div className="header">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default DashboardHeader;
