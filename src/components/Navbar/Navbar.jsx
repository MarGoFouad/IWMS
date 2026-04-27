import React from "react";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import {BellDot} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/Attandance/Attandance":
        return "Attendance";
      case "/JobOrder/JobOrder":
        return "Job Orders";
        case "/JobOrder/tracking":
        return "Tracking Orders";
      case "/Inventory":
        return "Inventory";
      case "/Production":
        return "Production";
      case "/Sales":
        return "Sales";
      case "/Employees":
        return "Employees";
      case "/Suppliers":
        return "Suppliers";
      case "/Accounting":
        return "Accounting";
      default:
        return "Page";
    }
  };

  return (
    <header className="tnavbar">
      <div className="ptitle">
        <h3>{getPageTitle()}</h3>
      </div>

      <div className="actions">
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
        />

        <BellDot size={20}/>
      </div>
    </header>
  );
}