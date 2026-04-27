import React from "react";
export default function Request() {
  const data = [
    {
      id: "REQ-1024",
      title: "Equipment Repair",
      user: "Mike Chen",
      date: "Apr 23, 2026",
      status: "Pending",
    },
    {
      id: "REQ-1023",
      title: "Parts Order",
      user: "Sarah Kim",
      date: "Apr 22, 2026",
      status: "Approved",
    },
    {
      id: "REQ-1022",
      title: "Maintenance Request",
      user: "Tom Davis",
      date: "Apr 21, 2026",
      status: "Approved",
    },
    {
      id: "REQ-1021",
      title: "Tool Requisition",
      user: "by Lisa Wong ",
      date: "Apr 20, 2026",
      status: "Rejected",
    },
    {
      id: "REQ-1020",
      title: "Equipment Repair",
      user: "John Doe",
      date: "Apr 19, 2026",
      status: "Approved",
    },
  ];

  return (
    <div className="requests-container">
      <h3>Recent Requests</h3>
      {data.map((item, i) => (
        <div className="requestItem" key={i}>
          <div>
            <div style={{ fontWeight: "600" }}>
              {item.id}{" "}
              <span style={{ fontWeight: "normal", color: "#64748b" }}>
                {item.title}
              </span>
            </div>
            <small style={{ color: "#94a3b8" }}>
              by {item.user} • {item.date}
            </small>
          </div>
          <span className={`status-badge ${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}
