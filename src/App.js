import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import { RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Attandance from './Pages/Attandance/Attandance';
import Accounting from './Pages/Accounting/Accounting';
import Inventory from './Pages/Inventory/Inventory';
import Sales from './Pages/Sales/Sales';
import JobOrder from './Pages/JobOrder/JobOrder';
import Tracking from './Pages/JobOrder/tracking';

import Production from './Pages/Production/Production';
import Suppliers from './Pages/Suppliers/Suppliers';
import Employees from './Pages/Employees/Employees';

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "Attandance", element: <Attandance /> },
      { path: "JobOrder/JobOrder", element: <JobOrder /> },
      { path: "JobOrder/tracking", element: <Tracking /> },
      { path: "Inventory", element: <Inventory/> },
      { path: "Production", element: <Production /> },
      { path: "Sales", element: <Sales /> },
      { path: "Employees", element: <Employees /> },
      { path: "Suppliers", element: <Suppliers /> },
      { path: "Accounting", element: <Accounting /> },
      { path: "*", element: <h1>Not Found</h1>},
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}
export default App;