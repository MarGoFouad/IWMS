import React, { useState, useEffect } from "react";
import "./JobOrder.css";
import {
  FaSearch,
  FaEye,
  FaPlus,
  FaFilter,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function JobOrders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("orders");
    setOrders(saved ? JSON.parse(saved) : []);
  }, []);

  const handleDelete = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const handleSave = () => {
    const updated = orders.map((o) =>
      o.id === selectedOrder.id ? editForm : o,
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));

    setSelectedOrder(null);
    setEditMode(false);
    setEditForm(null);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="job-container">
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

      <div className="job-search">
        <div className="search-box">
          <FaSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID or Customer Name..."
          />
        </div>

        <div className="filter-icon">
          <FaFilter />
        </div>

        <div className="filter-box">
          Results: {search ? filteredOrders.length : orders.length}
        </div>
      </div>

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
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>

                <td>
                  <div className="customer-name">{o.customer}</div>
                  <span className="customer-code">{o.code}</span>
                </td>

                <td>
                  <span className={`status ${o.status?.replace(" ", "")}`}>
                    {o.status}
                  </span>
                </td>

                <td>{o.stage}</td>
                <td>{o.orderDate}</td>
                <td>{o.dueDate || "-"}</td>

                <td>
                  <FaEye
                    className="eye-icon"
                    onClick={() => {
                      setSelectedOrder(o);
                      setEditMode(false);
                    }}
                  />

                  <FaEdit
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedOrder(o);
                      setEditForm(o);
                      setEditMode(true);
                    }}
                  />

                  <FaTrash
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(o.id)}
                  />
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedOrder(null);
            setEditMode(false);
          }}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {/* VIEW */}
            {!editMode && (
              <>
                <h2>Order Details</h2>

                <p>
                  <b>ID:</b> {selectedOrder.id}
                </p>
                <p>
                  <b>Customer:</b> {selectedOrder.customer}
                </p>
                <p>
                  <b>Phone:</b> {selectedOrder.phone}
                </p>
                <p>
                  <b>Type:</b> {selectedOrder.type}
                </p>
                <p>
                  <b>Dim:</b> {selectedOrder.dim}
                </p>
                <p>
                  <b>Material:</b> {selectedOrder.material?.name}
                </p>
              </>
            )}

            {/* EDIT */}
            {editMode && editForm && (
              <>
                <h2>Edit Order</h2>

                <input
                  value={editForm.customer}
                  onChange={(e) =>
                    setEditForm({ ...editForm, customer: e.target.value })
                  }
                />

                <input
                  value={editForm.phone || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />

                <input
                  value={editForm.type || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, type: e.target.value })
                  }
                />

                <input
                  value={editForm.dim || ""}
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

                <button onClick={handleSave}>Save Changes</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
