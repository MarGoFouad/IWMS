import React from 'react'

export default function recent() {

  const data = [
    "Order #1249 moved to polishing",
    "Invoice #INV-1245 paid",
    "Material restocked",
    "Order #1240 completed",
  ];

  return (
    <div className="activity">
      <h3>Recent Activity</h3>

      {data.map((item, i) => (
        <p key={i}>• {item}</p>
      ))}
    </div>
  );
}