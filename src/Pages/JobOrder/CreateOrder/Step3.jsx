import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";

export default function Step3() {
  const { formData, setFormData } = useOutletContext();

  const [materials, setMaterials] = useState([]);
  const [cutoffs, setCutoffs] = useState([]);

  useEffect(() => {
    const savedMaterials = localStorage.getItem("inventory");
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials));
    }

    const savedCutoffs = localStorage.getItem("cutoffs");
    if (savedCutoffs) {
      setCutoffs(JSON.parse(savedCutoffs));
    }
  }, []);

  const mappedMaterials = materials.map((item) => ({
    name: item.name,
    id: item.id,
    stock: item.status,
    units: item.quantity,
    source: "material",
  }));

  const mappedCutoffs = cutoffs.map((item) => ({
    name: item.name,
    id: item.id,
    stock: item.status,
    units: item.quantity,
    source: "cutoff",
  }));

  const handleSelectMaterial = (item) => {
    setFormData({
      ...formData,
      material: item,
    });
  };

  const handleSelectCutoff = (item) => {
    setFormData({
      ...formData,
      cutoff: item,
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
          onClick={() => handleSelectMaterial(item)}
        >
          <div className="left">
            <h4>{item.name}</h4>
            <p>ID: {item.id}</p>
          </div>

          <div className="right">
            <span
              className={
                item.stock === "In Stock" ? "inStock" : "lowStock"
              }
            >
              {item.stock}
            </span>
            <p>{item.units} units</p>
          </div>
        </div>
      ))}

      {mappedCutoffs.length > 0 && (
        <>
          <h2 style={{ marginTop: "20px" }}>Select Cut Offs</h2>

          {mappedCutoffs.map((item, i) => (
            <div
              key={i}
              className={`materialCard ${
                formData.cutoff?.id === item.id ? "selected" : ""
              }`}
              onClick={() => handleSelectCutoff(item)}
            >
              <div className="left">
                <h4>{item.name}</h4>
                <p>ID: {item.id}</p>
              </div>

              <div className="right">
                <span
                  className={
                    item.stock === "In Stock" ? "inStock" : "lowStock"
                  }
                >
                  {item.stock}
                </span>
                <p>{item.units} units</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}