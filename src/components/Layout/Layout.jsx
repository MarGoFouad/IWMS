import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidbar from '../Sidbar/Sidbar';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Sidbar />

      <div className="container">
        <Navbar />
        
        <main className="body">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}