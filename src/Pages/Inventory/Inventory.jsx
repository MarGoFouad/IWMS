import React, { useState, useEffect } from "react";
import "./Inventory.css";
import {
  FaSearch,
  FaEdit,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("inventory");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    minStock: "",
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(orders));
  }, [orders]);

  const getStatus = (qty, min) => {
    if (qty < min) return "Low Stock";
    if (qty <= min * 2) return "Medium";
    return "In Stock";
  };

  const lowStockItems = orders.filter((o) => o.quantity < o.minStock);

  const handleSave = () => {
    const qty = Number(form.quantity);
    const min = Number(form.minStock);

    const newItem = {
      id: editId || "MAT-" + String(Date.now()).slice(-4),
      name: form.name,
      category: form.category,
      quantity: qty,
      minStock: min,
      status: getStatus(qty, min),
      lastRestocked: new Date().toLocaleDateString(),
    };

    if (editId) {
      setOrders(orders.map((i) => (i.id === editId ? newItem : i)));
      setEditId(null);
    } else {
      setOrders([...orders, newItem]);
    }

    setForm({ name: "", category: "", quantity: "", minStock: "" });
    setOpen(false);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      minStock: item.minStock,
    });

    setEditId(item.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((i) => i.id !== id));
    setEditId(null);
  };

  const filtered = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="job-container">
      {lowStockItems.length > 0 && (
        <div className="alert">
          <div className="alert-title">
            <FaExclamationTriangle size={20} /> Low Stock Alert
          </div>

          <div className="alert-desc">
            {lowStockItems.length} materials below minimum stock level
          </div>
        </div>
      )}

      <div className="job-top">
        <div>
          <h3>Inventory Management</h3>
          <p>Track materials and stock levels</p>
        </div>

        <button
          className="create-btn"
          onClick={() => {
            setOpen(true);
            setEditId(null);
          }}
        >
          <FaPlus /> Add Material
        </button>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? "Edit Material" : "Add Material"}</h3>

            <input
              placeholder="Material Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <div className="row">
              <input
                placeholder="Quantity"
                value={form.quantity}
                type="number"
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <input
                placeholder="Min Stock"
                value={form.minStock}
                type="number"
                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button className="cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="primary" onClick={handleSave}>
                {editId ? "Update Material" : "Add Material"}
              </button>

              {editId && (
                <button className="delete" onClick={() => handleDelete(editId)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="job-search">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Material ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Last Restocked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.category}</td>
              <td>{o.quantity}</td>

              <td>
                <span className={`badge ${o.status.replace(" ", "")}`}>
                  {o.status}
                </span>
              </td>

              <td>{o.lastRestocked}</td>

              <td>
                <FaEdit onClick={() => handleEdit(o)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
