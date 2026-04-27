import React from "react";

export default function Recent() {
  const data = [
    {
      text: "Order #1249 moved to Polishing stage",
      user: "John Doe",
      time: "5 min ago",
    },
    {
      text: "Invoice #INV-1245 marked as paid",
      user: "Sarah Smith",
      time: "15 min ago",
    },
    {
      text: "Material 'Tempered Glass 8mm' restocked",
      user: "Mike Johnson",
      time: "30 min ago",
    },
    { text: "Order #1248 completed", user: "David Lee", time: "1 hour ago" },
  ];

  return (
    <div className="activity">
      <h3>Recent Activity</h3>
      {data.map((item, i) => (
        <div className="activity-item" key={i}>
          <div className="dot"></div>
          <div>
            <p style={{ margin: 0, fontSize: "14px" }}>{item.text}</p>
            <small style={{ color: "#94a3b8" }}>
              {item.user} • {item.time}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
