import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", orders: 30 },
  { name: "Feb", orders: 50 },
  { name: "Mar", orders: 40 },
  { name: "Apr", orders: 70 },
  { name: "May", orders: 60 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Charts() {
  return (
    <div style={{ width: "100%", height: 300 }}>
        <h3>Production OverView </h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="orders" fill="#4f46e5" />
        <Bar dataKey="Completed" fill="green" />
      </BarChart>
    </div>
  );
}