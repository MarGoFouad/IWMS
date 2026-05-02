import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { RouterProvider } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";

import AccountingLayout from "./Pages/Accounting/AccountingLayout";
import Invoices from "./Pages/Accounting/Invoices";
import JobCosting from "./Pages/Accounting/JobCosting";
import AttendanceLog from "./Pages/Accounting/AttendanceLog";
import Payroll from "./Pages/Accounting/Payroll";
import AuditLog from "./Pages/Accounting/AuditLog";

import Inventory from "./Pages/Inventory/Inventory";
import Sales from "./Pages/Sales/Sales";
import JobOrder from "./Pages/JobOrder/JobOrder";
import Tracking from "./Pages/JobOrder/tracking";

import Production from "./Pages/Production/Production";
import OverView from "./Pages/Production/OverView";
import Board from "./Pages/Production/Board";

import Suppliers from "./Pages/Suppliers/Suppliers";
import Employees from "./Pages/Employees/Employees";

import CreateOrder from "./Pages/JobOrder/CreateOrder/CreateOrder";
import Step1 from "./Pages/JobOrder/CreateOrder/Step1";
import Step2 from "./Pages/JobOrder/CreateOrder/Step2";
import Step3 from "./Pages/JobOrder/CreateOrder/Step3";
import Step4 from "./Pages/JobOrder/CreateOrder/Step4";
import Step5 from "./Pages/JobOrder/CreateOrder/finalState/Step5";

import Attendance from "./Pages/Attandance/Attandance";

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },

      { path: "Attendance", element: <Attendance /> },
      { path: "JobOrder/JobOrder", element: <JobOrder /> },

      {
        path: "JobOrder/create",
        element: <CreateOrder />,
        children: [
          { index: true, element: <Step1 /> },
          { path: "step2", element: <Step2 /> },
          { path: "step3", element: <Step3 /> },
          { path: "step4", element: <Step4 /> },
          { path: "step5", element: <Step5 /> },
        ],
      },

      {
        path: "JobOrder/tracking/:id",
        element: <Tracking />,
      },

      { path: "Inventory", element: <Inventory /> },

      {
        path: "Production",
        element: <Production />,
        children: [
          { index: true, element: <OverView /> },
          { path: "board", element: <Board /> },
        ],
      },

      { path: "Sales", element: <Sales /> },

      { path: "Employees", element: <Employees /> },
      { path: "Suppliers", element: <Suppliers /> },

      {
        path: "Accounting",
        element: <AccountingLayout />,
        children: [
          { index: true, element: <Invoices /> },
          { path: "jobcosting", element: <JobCosting /> },
          { path: "attendance", element: <AttendanceLog /> },
          { path: "payroll", element: <Payroll /> },
          { path: "audit", element: <AuditLog /> },
        ],
      },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;