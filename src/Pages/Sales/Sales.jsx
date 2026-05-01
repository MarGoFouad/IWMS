import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./Sales.css";

const initialSalesData = [
  {
    id: "ORD-1249",
    customer: "XYZ Industries",
    phone: "01234567890",
    type: "Polishing",
    dim: "12x12",
    material: { name: "Tempered Glass" },
    code: "C002",
    status: "In progress",
    stage: "Polishing",
    orderDate: "2026-04-18",
    dueDate: "2026-04-28",
  },
  {
    id: "ORD-1247",
    customer: "Premium Glass Co",
    phone: "01098765432",
    type: "Engraving",
    dim: "10x10",
    material: { name: "Frosted Glass" },
    code: "C004",
    status: "Delayed",
    stage: "Engraving",
    orderDate: "2026-04-10",
    dueDate: "2026-04-22",
  },
  {
    id: "ORD-1245",
    customer: "ABC Corporation",
    phone: "01122334455",
    type: "Assembly",
    dim: "15x15",
    material: { name: "Clear Glass" },
    code: "C001",
    status: "Completed",
    stage: "Completed",
    orderDate: "2026-04-12",
    dueDate: "2026-04-24",
  },
];

export default function SalesManagement() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("salesOrders");
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      setOrders(initialSalesData);
      localStorage.setItem("salesOrders", JSON.stringify(initialSalesData));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("salesOrders", JSON.stringify(updated));
  };

  const handleSave = () => {
    const updated = orders.map((o) =>
      o.id === selectedOrder.id ? editForm : o
    );

    setOrders(updated);
    localStorage.setItem("salesOrders", JSON.stringify(updated));

    setSelectedOrder(null);
    setEditMode(false);
    setEditForm(null);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sales-management-container">

      {/* Intro */}
      <div className="sales-intro">
        <div>
          <h2>Sales Management</h2>
          <p>Track revenue, orders, and payment analytics</p>
        </div>
      </div>

      {/* Analytics */}
      <div className="analytics-section">

        {/* KPI Cards */}
        <div className="kpi-cards-grid">

          <div className="kpi-card kpi-paid-bg">
            <div className="kpi-header">
              <span>Paid</span>
              <span>$38,450</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill fill-paid" style={{ width: "90%" }} />
            </div>
          </div>

          <div className="kpi-card kpi-pending-bg">
            <div className="kpi-header">
              <span>Pending</span>
              <span>$1,270</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill fill-pending" style={{ width: "3%" }} />
            </div>
          </div>

          <div className="kpi-card kpi-partial-bg">
            <div className="kpi-header">
              <span>Partial</span>
              <span>$890</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill fill-partial" style={{ width: "2%" }} />
            </div>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="quick-stats-card">
          <h3>Quick Stats</h3>
          <ul>
            <li>Orders Today <strong>12</strong></li>
            <li>Revenue Today <strong>$3,490</strong></li>
            <li>Avg Response Time <strong>2.5 hrs</strong></li>
            <li>Customer Satisfaction <strong>4.9/5</strong></li>
            <li>New Customers <strong>34</strong></li>
            <li>Returned Items <strong>1</strong></li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Stage</th>
              <th>Order Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>{order.stage}</td>
                <td>{order.orderDate}</td>
                <td>{order.dueDate}</td>

                <td>
                  <FaEye
                    onClick={() => {
                      setSelectedOrder(order);
                      setEditMode(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  <FaEdit
                    onClick={() => {
                      setSelectedOrder(order);
                      setEditForm(order);
                      setEditMode(true);
                    }}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />

                  <FaTrash
                    onClick={() => handleDelete(order.id)}
                    style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedOrder(null);
            setEditMode(false);
          }}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {!editMode ? (
              <>
                <h2>Order Details</h2>
                <p><b>ID:</b> {selectedOrder.id}</p>
                <p><b>Customer:</b> {selectedOrder.customer}</p>
                <p><b>Phone:</b> {selectedOrder.phone}</p>
                <p><b>Type:</b> {selectedOrder.type}</p>
                <p><b>Dimension:</b> {selectedOrder.dim}</p>
                <p><b>Material:</b> {selectedOrder.material?.name}</p>
              </>
            ) : (
              <>
                <h2>Edit Order</h2>

                <input
                  value={editForm.customer}
                  onChange={(e) =>
                    setEditForm({ ...editForm, customer: e.target.value })
                  }
                />

                <input
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />

                <input
                  value={editForm.type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, type: e.target.value })
                  }
                />

                <input
                  value={editForm.dim}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dim: e.target.value })
                  }
                />

                <input
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                />

                <input
                  value={editForm.stage}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stage: e.target.value })
                  }
                />

                <button onClick={handleSave} className="save-btn">
                  Save Changes
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
