import React from 'react'

export default function Request() {

  const data = [
    { title: "Equipment Repair", status: "Pending" },
    { title: "Parts Order", status: "Approved" },
    { title: "Maintenance", status: "Approved" },
    { title: "Tool Request", status: "Rejected" },
  ];

  return (
    <div className="requests">
      <h3>Recent Requests</h3>

      {data.map((item, i) => (
        <div className="requestItem" key={i}>
          <p>{item.title}</p>
          <span className={item.status.toLowerCase()}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

