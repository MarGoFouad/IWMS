import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Production.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSearch,
  faUsers,
  faClock,
  faCube,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

const filter = faFilter;
const search = faSearch;

export default function Production() {
  const navigate = useNavigate();
  const location = useLocation();

  const isOverview =
    location.pathname === "/Production" ||
    location.pathname.includes("overview");

  const isBoard = location.pathname.includes("board");

  return (
    <div className="production-container">

      {/* Header */}
      <div className="header">
        <h2>Production Control Center</h2>
        <p>Admin Dashboard - Complete System Overview</p>
      </div>

      {/* Cards */}
      <div className="cards">

        <div className="card">
         
          <div className="card-text">
            <p>Total Jobs</p>
            <h3>5</h3>
          </div>
           <FontAwesomeIcon icon={faCube} className="Icons" />
        </div>

        <div className="card">
          
          <div className="card-text">
            <p>In Progress</p>
            <h3>1</h3>
          </div>
          <FontAwesomeIcon icon={faClock} className="Icons" />
        </div>

        <div className="card">
         
          <div className="card-text">
            <p>Completed</p>
            <h3>1</h3>
          </div>
           <FontAwesomeIcon icon={faUsers} className="Icons" />
        </div>

        <div className="card">
          <div className="card-text">
            <p>Delayed</p>
            <h3>1</h3>
          </div>     
               <FontAwesomeIcon icon={faCircleExclamation} className="Icons" />

        </div>

      </div>

      {/* Tabs */}
      <div className="top-bar">
        <div className="tabs">

          <button
            className={isOverview ? "active" : ""}
            onClick={() => {
              if (!isOverview) navigate(".");
            }}
          >
            Overview
          </button>

          <button
            className={isBoard ? "active" : ""}
            onClick={() => {
              if (!isBoard) navigate("board");
            }}
          >
            Kanban Board
          </button>

        </div>

        <div className="actions">

          <div className="search-box">
            <FontAwesomeIcon icon={search} className="search-icon" />
            <input type="text" placeholder="Search jobs..." />
          </div>

          <button className="filter">
            <FontAwesomeIcon icon={filter} className="Icon" />
            Filter
          </button>

        </div>
      </div>

      <Outlet />
    </div>
  );
}