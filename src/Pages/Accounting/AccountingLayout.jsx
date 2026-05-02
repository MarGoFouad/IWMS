import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Accounting.css";

export default function AccountingLayout() {

  const location = useLocation();
  const navigate = useNavigate();

  const isInvoices = location.pathname === "/Accounting";

  const [stats, setStats] = useState({
    total: 0,
    collected: 0,
    outstanding: 0,
    activeOrders: 0,
  });

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const total = invoices.reduce((sum, i) => sum + (i.amount || 0), 0);
    const collected = invoices.reduce((sum, i) => sum + (i.deposit || 0), 0);
    const outstanding = invoices.reduce((sum, i) => sum + (i.remaining || 0), 0);

    const activeOrders = orders.filter(o => o.status === "In progress").length;

    setStats({ total, collected, outstanding, activeOrders });
  }, [location.pathname]);

  return (
    <div className="accounting">

      <div className="actionsBar">
        <button className="exportBtn">Export Report</button>

        {isInvoices && (
          <button
            className="newBtn"
            onClick={() => navigate("/JobOrder/create")}
          >
            + New Invoice
          </button>
        )}
      </div>

      <div className="topCards">

        <div className="box">
          <h4>TOTAL INVOICED</h4>
          <h2>{stats.total}</h2>
          <p>EGP this month</p>
        </div>

        <div className="box">
          <h4>COLLECTED</h4>
          <h2>{stats.collected}</h2>
          <p>cash received</p>
        </div>

        <div className="box">
          <h4>OUTSTANDING</h4>
          <h2>{stats.outstanding}</h2>
          <p>pending payments</p>
        </div>

        <div className="box">
          <h4>ACTIVE ORDERS</h4>
          <h2>{stats.activeOrders}</h2>
          <p>in progress</p>
        </div>

      </div>

      <div className="tabs">
        <NavLink to="" end>Invoices</NavLink>
        <NavLink to="jobcosting">Job Costing</NavLink>
        <NavLink to="attendance">Attendance Log</NavLink>
        <NavLink to="payroll">Payroll</NavLink>
        <NavLink to="audit">Audit Log</NavLink>
      </div>

      <div className="contentArea">
        <Outlet />
      </div>

    </div>
  );
}