import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";

export default function Step4() {
  const { formData } = useOutletContext();

  const createdRef = useRef(false);

  const getDueDate = (type) => {
    const today = new Date();
    let days = 3;

    if (type === "Tempered Glass") days = 5;
    else if (type === "Laminated Glass") days = 7;
    else if (type === "Frosted Glass") days = 4;

    const due = new Date();
    due.setDate(today.getDate() + days);

    return due.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (createdRef.current) return;

    const existing = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: "ORD-" + Date.now().toString().slice(-5),
      customer: formData.name,
      phone: formData.phone,
      code: "C-" + Date.now().toString().slice(-4),

      status: "In progress",
      stage: "Pending",

      orderDate: new Date().toISOString().split("T")[0],
      dueDate: getDueDate(formData.type),

      type: formData.type,
      dim: formData.dim,
      notes: formData.notes,

      material: formData.material,
      cutoff: formData.cutoff,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existing, newOrder])
    );

    createdRef.current = true;
  }, []);

  return (
    <div className="form">
      <h2>Review Order</h2>

      <div className="reviewBox">
        <h3>Customer Info</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
      </div>

      <div className="reviewBox">
        <h3>Product Details</h3>
        <p><strong>Type:</strong> {formData.type}</p>
        <p><strong>Dimensions:</strong> {formData.dim}</p>
        <p><strong>Notes:</strong> {formData.notes || "—"}</p>
      </div>

      <div className="reviewBox">
        <h3>Material</h3>
        <p><strong>Material:</strong> {formData.material?.name || "Not selected"}</p>
        <p><strong>ID:</strong> {formData.material?.id || "Not selected"}</p>
      </div>

      <div className="reviewBox">
        <h3>Cut Off</h3>
        <p><strong>Name:</strong> {formData.cutoff?.name || "Not selected"}</p>
        <p><strong>ID:</strong> {formData.cutoff?.id || "Not selected"}</p>
      </div>
    </div>
  );
}