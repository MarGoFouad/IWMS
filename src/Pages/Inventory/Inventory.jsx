import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { FaSearch, FaEdit, FaPlus, FaExclamationTriangle } from "react-icons/fa";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("material");

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("inventory");
    return saved ? JSON.parse(saved) : [];
  });

  const [cutoffs, setCutoffs] = useState(() => {
    const saved = localStorage.getItem("cutoffs");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    minStock: "",
    dim: "",
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("cutoffs", JSON.stringify(cutoffs));
  }, [cutoffs]);

  const getStatus = (qty, min) => {
    if (qty < min) return "Low Stock";
    if (qty <= min * 2) return "Medium";
    return "In Stock";
  };

  const lowStockItems = orders.filter((o) => o.quantity < o.minStock);

  const handleSave = () => {
    if (mode === "material") {
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
    } else {
      const newCut = {
        id: "CUT-" + String(Date.now()).slice(-3),
        name: form.name,
        dim: form.dim,
        quantity: Number(form.quantity),
        date: new Date().toISOString().split("T")[0],
      };

      setCutoffs([...cutoffs, newCut]);
    }

    setForm({
      name: "",
      category: "",
      quantity: "",
      minStock: "",
      dim: "",
    });

    setOpen(false);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      minStock: item.minStock,
      dim: "",
    });

    setEditId(item.id);
    setMode("material");
    setOpen(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((i) => i.id !== id));
  };

  const filtered = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-container">

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

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="create-btn"
            onClick={() => {
              setMode("material");
              setOpen(true);
              setEditId(null);
            }}
          >
            <FaPlus /> Add Material
          </button>

          <button
            className="create-btn"
            onClick={() => {
              setMode("cutoff");
              setOpen(true);
              setEditId(null);
            }}
          >
            <FaPlus /> Add Cut-off
          </button>
        </div>
      </div>

      {open && (
        <div className="inventory-modal-overlay" onClick={() => setOpen(false)}>
          <div className="inventory-modal-box" onClick={(e) => e.stopPropagation()}>

            <h3>{mode === "material" ? "Add Material" : "Add Cut-off"}</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {mode === "material" && (
              <>
                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <div className="row">
                  <input
                    placeholder="Quantity"
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  />

                  <input
                    placeholder="Min Stock"
                    type="number"
                    value={form.minStock}
                    onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                  />
                </div>
              </>
            )}

            {mode === "cutoff" && (
              <>
                <input
                  placeholder="Dimensions (50x30)"
                  value={form.dim}
                  onChange={(e) => setForm({ ...form, dim: e.target.value })}
                />

                <input
                  placeholder="Quantity"
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </>
            )}

            <div className="modal-actions">
              <button className="cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="primary" onClick={handleSave}>
                Save
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
            <th>ID</th>
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

      <div className="cutoff-container">
        <h3>Cut-off Materials (Reusable Pieces)</h3>

        <div className="cutoff-grid">
          {cutoffs.map((c) => (
            <div className="cut-card" key={c.id}>
              <h4>{c.id}</h4>
              <p>{c.name}</p>
              <p>Dimensions: {c.dim}</p>

              <div className="cut-footer">
                <span>{c.date}</span>
                <span className="pcs">{c.quantity} pcs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}