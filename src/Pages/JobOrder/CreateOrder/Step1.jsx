import { useOutletContext } from "react-router-dom";

export default function Step1() {
  const { formData, setFormData } = useOutletContext();

  return (
    <div className="form">
      <h2>Customer Information</h2>

      <label htmlFor="customerName">Customer Name</label>
      <input
        type="text"
        id="customerName"
        placeholder="Enter customer name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
  );
}
