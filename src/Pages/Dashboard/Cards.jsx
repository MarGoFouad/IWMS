import React from "react";
import {
  FaBox,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./Dashboard.css";

export default function Cards() {
  const cardData = [
    {
      title: "Total Orders",
      values: 128,
      icon: <FaBox />,
      status: "+12% from last month",
    },
    {
      title: "In Progress",
      values: 42,
      icon: <FaUsers />,
      status: "Across All Stages",
    },
    {
      title: "Completed",
      values: 76,
      icon: <FaCheckCircle />,
      status: "This Month",
    },
    {
      title: "Low Stock Alerts",
      values: 8,
      icon: <FaExclamationTriangle />,
      status: "Requires Attention",
    },
  ];
  return (
    <div className="cards">
      {cardData.map((item, index) => (
        <div className="card" key={index}>
          <div className="icon">{item.icon}</div>

          <div>
            <h4>{item.title}</h4>
            <p>{item.values}</p>
            <small>{item.status}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
