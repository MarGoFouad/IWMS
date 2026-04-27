import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Orders: 45, Completed: 35 },
  { name: "Feb", Orders: 52, Completed: 48 },
  { name: "Mar", Orders: 62, Completed: 55 },
  { name: "Apr", Orders: 72, Completed: 65 },
];

export default function Charts() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ marginBottom: "20px" }}>Production Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart  data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend iconType="rect" align="center" />
          <Bar dataKey="Orders" fill="#3b82f6" barSize={40} />
          <Bar dataKey="Completed" fill="#10b981" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
