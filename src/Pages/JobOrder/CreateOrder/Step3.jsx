import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";

export default function Step3() {
  const { formData, setFormData } = useOutletContext();

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("inventory");
    if (saved) {
      setMaterials(JSON.parse(saved));
    }
  }, []);

  const mappedMaterials = materials.map((item) => ({
    name: item.name,
    id: item.id,
    stock: item.status,
    units: item.quantity,
  }));

  const handleSelect = (item) => {
    setFormData({
      ...formData,
      material: item,
    });
  };

  return (
    <div className="materialsContainer">
      <h2>Select Materials</h2>

      {mappedMaterials.map((item, i) => (
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
            <span className={item.stock === "In Stock" ? "inStock" : "lowStock"}>
              {item.stock}
            </span>
            <p>{item.units} units</p>
          </div>
        </div>
      ))}
    </div>
  );
}