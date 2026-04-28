import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import { RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Accounting from './Pages/Accounting/Accounting';
import Inventory from './Pages/Inventory/Inventory';
import Sales from './Pages/Sales/Sales';
import JobOrder from './Pages/JobOrder/JobOrder';
import Tracking from './Pages/JobOrder/tracking';

import Production from './Pages/Production/Production';
import Suppliers from './Pages/Suppliers/Suppliers';
import Employees from './Pages/Employees/Employees';
import CreateOrder from './Pages/JobOrder/CreateOrder/CreateOrder';
import Step1 from './Pages/JobOrder/CreateOrder/Step1';
import Step2 from './Pages/JobOrder/CreateOrder/Step2';
import Step3 from './Pages/JobOrder/CreateOrder/Step3';
import Step4 from './Pages/JobOrder/CreateOrder/Step4';
import Step5 from './Pages/JobOrder/CreateOrder/finalState/Step5';
import Attendance from './Pages/Attandance/Attandance';


let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "Attendance", element: <Attendance/> },
      { path: "JobOrder/JobOrder", element: <JobOrder /> },
      {path: "JobOrder/create",element: <CreateOrder/> , handle: { title: "create order"} ,
          children: [
            { index: true, element: <Step1 /> },
            { path: "step2", element: <Step2 /> },
            { path: "step3", element: <Step3 /> },
            { path: "step4", element: <Step4 /> },
            { path: "step5", element: <Step5 /> },
          ]
      },

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