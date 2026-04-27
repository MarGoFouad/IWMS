import React from "react";
import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";
export default function Step3() {
  const { formData, setFormData } = useOutletContext();
  const materials = [
    {
      name: "Clear Glass Sheet 6mm",
      id: "MAT-001",
      stock: "In Stock",
      units: 45,
    },
    { name: "Tempered Glass 8mm", id: "MAT-002", stock: "In Stock", units: 32 },
    { name: "Frosted Glass 5mm", id: "MAT-003", stock: "In Stock", units: 18 },
    { name: "Mirror Glass 4mm", id: "MAT-004", stock: "In Stock", units: 8 },
    {
      name: "Colored Glass Blue 6mm",
      id: "MAT-005",
      stock: "Low Stock",
      units: 2,
    },
    {
      name: "Laminated Glass 10mm",
      id: "MAT-006",
      stock: "In Stock",
      units: 15,
    },
  ];

  const handleSelect = (item) => {
    setFormData({
      ...formData,
      material: item,
    });
  };
  return (
    <div className="materialsContainer">
      <h2>Select Materials</h2>

      {materials.map((item, i) => (
        <div
          key={i}
          className={`materialCard ${
            formData.material?.id === item.id ? "selected" : ""
          }`}
          onClick={() => handleSelect(item)}
        >
          <div className="left">
            <h4>{item.name}</h4>
            <p>ID: {item.id}</p>
          </div>

          <div className="right">
            <span
              className={item.stock === "In Stock" ? "inStock" : "lowStock"}
            >
              {item.stock}
            </span>
            <p>{item.units} units</p>
          </div>
        </div>
      ))}
    </div>
  );
}
