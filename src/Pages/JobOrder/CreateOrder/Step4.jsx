import React from "react";
import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";

export default function Step4() {
  const { formData } = useOutletContext();

  return (
    <div className="form">
      <h2>Review Order</h2>

      <div className="reviewBox">
        <h3>Customer Info</h3>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
      </div>

      <div className="reviewBox">
        <h3>Product Details</h3>
        <p>
          <strong>Type:</strong> {formData.type}
        </p>
        <p>
          <strong>Dimensions:</strong> {formData.dim}
        </p>
        <p>
          <strong>Notes:</strong> {formData.notes || "—"}
        </p>
      </div>

      <div className="reviewBox">
        <h3>Select Materials</h3>
        <p>
          <strong>Material:</strong> {formData.material?.name || "Not selected"}
        </p>
        <p>
          <strong>ID:</strong> {formData.material?.id || "Not selected"}
        </p>
      </div>
    </div>
  );
}
