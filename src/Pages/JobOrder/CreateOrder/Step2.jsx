import { useOutletContext } from "react-router-dom";
import "./CreateOrder.css";
export default function Step2() {
  const { formData, setFormData } = useOutletContext();

  return (
    <div className="form">
      <h2>Product Details</h2>

      <label htmlFor="productType">Product Type</label>
      <input
        type="text"
        placeholder="Enter product type"
        id="productType"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <label htmlFor="dimensions">Dimensions</label>
      <input
        type="text"
        placeholder="Enter dimensions"
        id="dimensions"
        value={formData.dim}
        onChange={(e) => setFormData({ ...formData, dim: e.target.value })}
      />

      <label htmlFor="notes">SpecialNotes</label>
      <textarea
        rows={3}
        placeholder="Any special requirements or notes..."
        id="notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
    </div>
  );
}
