import React, { useState } from "react";
import "./JobOrder.css";
import { FaSearch, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const orders = [
  {
    id: "ORD-1249",
    customer: "XYZ Industries",
    code: "C002",
    status: "In progress",
    stage: "Polishing",
    orderDate: "2026-04-18",
    dueDate: "2026-04-28",
  },
  {
    id: "ORD-1247",
    customer: "Premium Glass Co",
    code: "C004",
    status: "Delayed",
    stage: "Engraving",
    orderDate: "2026-04-10",
    dueDate: "2026-04-22",
  },
  {
    id: "ORD-1245",
    customer: "ABC Corporat",
    code: "C001",
    status: "Completed",
    stage: "Completed",
    orderDate: "2026-04-12",
    dueDate: "2026-04-24",
  },
  {
    id: "ORD-1245",
    customer: "ABC Corporat",
    code: "C001",
    status: "Completed",
    stage: "Completed",
    orderDate: "2026-04-12",
    dueDate: "2026-04-24",
  },
  {
    id: "ORD-1245",
    customer: "ABC Corporat",
    code: "C001",
    status: "Completed",
    stage: "Completed",
    orderDate: "2026-04-12",
    dueDate: "2026-04-24",
  },
  {
    id: "ORD-1249",
    customer: "XYZ Industries",
    code: "C002",
    status: "In progress",
    stage: "Polishing",
    orderDate: "2026-04-18",
    dueDate: "2026-04-24",
  },
  {
    id: "ORD-1247",
    customer: "Premium Glass Co",
    code: "C004",
    status: "Delayed",
    stage: "Engraving",
    orderDate: "2026-04-10",
    dueDate: "2026-04-22",
  },
];

export default function JobOrders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // الفلترة
  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="job-container">

      {/* Header */}
      <div className="job-top">
        <div>
          <h3>Job Orders Management</h3>
          <p>Track and manage all workshop orders</p>
        </div>

        <button
          className="create-btn"
          onClick={() => navigate("/JobOrder/create")}
        >
          <FaPlus /> Create Order
        </button>
      </div>

      {/* Search */}
      <div className="job-search">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search by Order ID or Customer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
<div className="filter-icon">
            <FaFilter />
          </div>
        <div className="filter-box">
          
          Results: {search ? filteredOrders.length : 0}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Stage</th>
              <th>Order Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o, i) => (
              <tr key={i}> 
                <td>{o.id}</td>

                <td>
                  <div className="customer-name">{o.customer}</div>
                  <span className="customer-code">{o.code}</span>
                </td>

                <td>
                  <span className={`status ${o.status.replace(" ", "")}`}>
                    {o.status}
                  </span>
                </td>

                <td>{o.stage}</td>

                <td>{o.orderDate}</td>
                <td>{o.dueDate}</td>

                <td>
                  <FaEye className="eye-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}