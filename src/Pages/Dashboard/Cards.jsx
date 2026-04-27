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
      color: "#e0f2fe",
    },
    {
      title: "In Progress",
      values: 42,
      icon: <FaUsers />,
      status: "Across all stages",
      color: "#fef3c7",
    },
    {
      title: "Completed",
      values: 76,
      icon: <FaCheckCircle />,
      status: "This month",
      color: "#d1fae5",
    },
    {
      title: "Low Stock Alerts",
      values: 8,
      icon: <FaExclamationTriangle />,
      status: "Requires attention",
      color: "#fee2e2",
    },
  ];

  return (
    <div
      className="cards"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
    >
      {cardData.map((item, index) => (
        <div
          className="card"
          key={index}
          style={{ border: "1px solid #f1f5f9" }}
        >
          <div
            className="icon"
            style={{
              backgroundColor: item.color,
              color: `color-mix(in srgb, ${item.color}, black 70%)`,
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"10px",
              flexShrink:0,
            }}
          >
            {item.icon}
          </div>
          <div>
            <h2 style={{ margin: "5px 0" }}>{item.values}</h2>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              {item.title}
            </p>
            <small
              style={{
              color:item.color,
              filter:"brightness(0.7) contrast(1.1)",
              }}
            >
              {item.status}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
