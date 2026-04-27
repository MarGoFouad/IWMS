import React from 'react';
import './JobOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export default function Tracking() {
  const stages = [
    {
      name: "Cutting",
      worker: "John Doe",
      time: "Start: 09:00 AM End: 10:30 AM",
      status: "completed",
    },
    {
      name: "Polishing",
      worker: "Sarah Smith",
      time: "Start: 10:45 AM",
      status: "inprogress",
    },
    {
      name: "Engraving",
      status: "pending",
    },
    {
      name: "Assembly",
      status: "pending",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="job-top">
        <div>
          <h3>Order tracking</h3>
          <p>Track and manage all workshop orders</p>
        </div>
      </div>

      <div className="tracking-container">

        {/* Order Info */}
        <div className="order-card">
          <div className="top">
            <div>
              <h4>ORD-1249</h4>
              <p>XYZ Industries</p>
            </div>
            <span className="badge blue">In Production</span>
          </div>

          <div className="info">
            <div>
              <p>Product Type</p>
              <strong>Glass Door</strong>
            </div>
            <div>
              <p>Dimensions</p>
              <strong>200cm x 90cm x 8mm</strong>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-card">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span>1 of 4 stages</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        {/* Stages */}
        <div className="stages-card">
          <h4>Production Stages</h4>

          {stages.map((s, i) => (
            <div key={i} className="stage-item">

              {/* Timeline */}
              <div className="timeline">
                <div className={`circle ${s.status}`}>
                  {s.status === "completed" && "✓"}

                  {s.status === "inprogress" && (
                    <FontAwesomeIcon icon={faClock} />
                  )}

                  {s.status === "pending" && i + 1}
                </div>

                {i !== stages.length - 1 && <div className="line"></div>}
              </div>

              {/* Content */}
              <div className="stage-content">
                <div className="stage-top">
                  <h5>{s.name}</h5>

                  {s.status === "completed" && (
                    <span className="badge green">Completed</span>
                  )}
                  {s.status === "inprogress" && (
                    <span className="badge blue">In Progress</span>
                  )}
                  {s.status === "pending" && (
                    <span className="badge gray">Pending</span>
                  )}
                </div>

                {s.worker && <p>Worker: {s.worker}</p>}
                {s.time && <p>{s.time}</p>}

                {s.status === "inprogress" && (
                  <button className="btn green">Finish Task</button>
                )}

                {s.status === "pending" && (
                  <button className="btn gray">Start Task</button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
}